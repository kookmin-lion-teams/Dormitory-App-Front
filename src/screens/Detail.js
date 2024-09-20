import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import vars from "../vars";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Detail = ({ navigation }) => {
  const [sleepoverCount, setSleepoverCount] = useState(0); // 외박 신청 횟수
  const [sleepoverData, setSleepoverData] = useState([]); // 외박 신청 내역

  // 외박 신청 내역 불러오기
  useEffect(() => {
    fetchSleepoverData();
  }, []);

  // 서버에서 데이터를 가져와서 AsyncStorage에 저장하는 함수
  const fetchSleepoverData = async () => {
    try {
      const stnum = await AsyncStorage.getItem("STNUM"); // 학번 가져오기
      if (!stnum) {
        console.error("학번 정보가 없습니다.");
        return;
      }

      const sleepCount = await AsyncStorage.getItem("SLEEPCOUNT");
      setSleepoverCount(sleepCount ? parseInt(sleepCount) : 0); // SLEEPCOUNT 설정

      // 서버에서 외박 신청 내역 가져오기
      const response = await fetch(vars.back + "/student/sleepover_list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sstnum: stnum }), // 서버로 학번 전달
      });

      const data = await response.json();

      if (response.ok) {
        // 받아온 데이터를 설정
        const sleepoverDetails = data.sleepover_list.map((item) => ({
          adate: item.ADATE,
          check: item.CHECK,
          reason: item.REASON || "사유 없음", // 기본값 설정
          startDate: item.STARTDATE || "날짜 없음", // 기본값 설정
          endDate: item.ENDDATE || "날짜 없음", // 기본값 설정
        }));

        await AsyncStorage.setItem(
          "SLEEPOVER_LIST",
          JSON.stringify(sleepoverDetails)
        );

        // 받아온 데이터를 sleepoverData에 설정
        setSleepoverData(sleepoverDetails);
      } else {
        console.error("서버로부터 데이터를 가져오지 못했습니다:", data.error);
      }
    } catch (error) {
      console.error("외박 신청 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 외박 신청 버튼 */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Detail")} // 외박 신청 페이지로 이동
        >
          <Text style={styles.activeTab}>외박 신청</Text>
        </TouchableOpacity>

        {/* 점호 버튼 */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("RollCallDetail")} // 점호 페이지로 이동
        >
          <Text style={styles.inactiveTab}>점호</Text>
        </TouchableOpacity>
      </View>

      {/* 외박 신청 횟수 */}
      <View style={styles.header}>
        <Text style={styles.headerText}>외박 신청 횟수</Text>
        <Text style={styles.countText}>{sleepoverCount}회</Text>
      </View>

      {/* 외박 신청 내역 리스트 (map으로 렌더링) */}
      <View style={styles.listContainer}>
        {sleepoverData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() =>
              navigation.navigate("SleepoverDetail", {
                adate: item.adate,
                startDate: item.startDate,
                endDate: item.endDate,
                reason: item.reason,
              })
            }
          >
            <Text style={styles.dateText}>{item.adate}</Text>
            <Text
              style={[
                styles.statusText,
                item.check === 1 ? styles.accepted : styles.pending,
              ]}
            >
              {item.check === 1 ? "수락됨" : "대기 중"}
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
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
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
    color: "#575757", // 대기 중 색상
  },
  accepted: {
    color: "#01509F", // 수락됨 색상
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

export default Detail;
