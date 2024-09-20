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

const RollCallDetail = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 외박 신청 버튼 */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("SleepoverDetail")} // 외박 신청 페이지로 이동
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
          <TouchableOpacity key={index} style={styles.listItem}>
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
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  statusText: {
    fontSize: 14,
  },
  pending: {
    color: "#FF9500", // 대기 중 색상
  },
  accepted: {
    color: "#4CD964", // 수락됨 색상
  },
  tabButton: {
    paddingVertical: 10,
  },
  activeTab: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000", // 활성화된 탭 색상
  },
  inactiveTab: {
    fontSize: 14,
    color: "#B0B0B0", // 비활성화된 탭 색상
  },
});

export default RollCallDetail;
