import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import vars from "../vars"; // 서버 URL이 포함된 변수

const RollCallDetail = () => {
  const [checklistData, setChecklistData] = useState([]); // 점호 내역 저장
  const [stnum, setStnum] = useState(""); // 학번

  // 점호 내역 불러오기
  useEffect(() => {
    fetchChecklistData();
  }, []);

  const fetchChecklistData = async () => {
    try {
      // AsyncStorage에서 학번(STNUM) 가져오기
      const stnum = await AsyncStorage.getItem("STNUM");
      if (!stnum) {
        console.error("학번 정보가 없습니다.");
        return;
      }

      // 서버에서 점호 내역 가져오기
      const response = await fetch(vars.back + "/student/checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stnum: stnum }), // 서버로 학번 전달
      });

      const data = await response.json();

      if (response.ok) {
        // 서버에서 데이터를 성공적으로 받아왔을 경우 처리
        const checklist = data.checklist.map((item) => ({
          date: item.date, // 받아온 DATE 값
          sep: item.sep, // 받아온 SEP 값
          day: item.day, // 요일 정보
        }));

        // 받은 데이터를 state에 저장
        setChecklistData(checklist);
      } else {
        console.error("서버로부터 데이터를 가져오지 못했습니다:", data.error);
      }
    } catch (error) {
      console.error("점호 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.listContainer}>
        {checklistData.map((item, index) => (
          <TouchableOpacity key={index} style={styles.listItem}>
            {/* DATE 및 요일 표시 */}
            <Text style={styles.dateText}>
              {item.date} ({item.day})
            </Text>
            {/* SEP 값에 따른 참여/미참여 상태 표시 */}
            <Text
              style={[
                styles.statusText,
                item.sep === 1 ? styles.accepted : styles.pending,
              ]}
            >
              {item.sep === 1 ? "참여" : "미참여"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    justifyContent: "space-around",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  countText: {
    fontSize: 16,
    color: "#007AFF",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  statusText: {
    fontSize: 16,
  },
  pending: {
    color: "#575757",
  },
  accepted: {
    color: "#01509F",
  },
  tabButton: {
    paddingVertical: 10,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000", // 활성화된 탭 색상
  },
  inactiveTab: {
    fontSize: 16,
    color: "#B0B0B0", // 비활성화된 탭 색상
  },
});

export default RollCallDetail;
