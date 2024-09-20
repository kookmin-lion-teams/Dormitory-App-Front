import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SleepoverDetail = ({ route }) => {
  const { startDate, endDate, reason } = route.params;

  // 날짜 차이 계산 함수
  const getDaysBetweenDates = (startDateParam, endDateParam) => {
    const startDateObj = new Date(startDateParam);
    const endDateObj = new Date(endDateParam);
    const timeDiff = endDateObj - startDateObj;
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return dayDiff + 1; // 시작과 종료 날짜를 포함하기 위해 +1
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>외박 일자</Text>
        </View>
        <Text style={styles.nightsText}>
          {startDate && endDate
            ? `총 ${getDaysBetweenDates(startDate, endDate)}박`
            : "총 0박"}
        </Text>
        <Text style={styles.dateText}>
          {startDate && endDate ? `${startDate} ~ ${endDate}` : startDate}
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>외박 사유</Text>
        </View>
        <Text style={styles.reasonText}>{reason}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
    // justifyContent: "space-between",
  },
  section: {
    marginLeft: 5,
    marginBottom: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: "#575757",
    marginBottom: 5,
  },
  nightsText: {
    fontSize: 16,
    color: "#575757",
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 16,
    color: "#575757",
  },
});

export default SleepoverDetail;
