import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import vars from "../vars";
import BlueButton from "../components/BlueButton";
import MediumText from "../components/MediumText";

const SleepoverCheck = ({ navigation, route }) => {
  const { reason, startDate, endDate } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {" "}
        외박 신청 전{"\n"} 마지막으로 확인해주세요
      </Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>외박 일자</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Sleepover", { startDate, endDate, reason })
            }
          >
            <Text style={styles.changeText}>변경하기</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.nightsText}>총 9박</Text>
        <Text style={styles.dateText}>
          {startDate && endDate ? `${startDate} ~ ${endDate}` : startDate}
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>외박 사유</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SleepoverReason", {
                reason,
                startDate,
                endDate,
              })
            }
          >
            <Text style={styles.changeText}>변경하기</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.reasonText}>{reason}</Text>
      </View>

      <View style={styles.noticeContainer}>
        <Image
          source={require("../../assets/notice.png")} // 로컬 이미지 불러오기
          style={styles.noticeIcon}
        />
        <MediumText style={styles.noticeText}>
          {" "}
          외박 신청이 완료되면, {"\n"} 이번 학기에 남은 외박 가능 횟수는
          2회입니다.
        </MediumText>
      </View>

      <BlueButton
        style={styles.width}
        onPress={() =>
          navigation.navigate("SleepoverSuccess", {
            startDate,
            endDate,
            reason,
          })
        }
      >
        <MediumText style={styles.buttonText}>신청하기</MediumText>
      </BlueButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 27,
    marginBottom: 32,
  },
  section: {
    marginLeft: 5,
    marginBottom: 20,
    paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: "#E0E0E0",
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
  changeText: {
    fontSize: 12,
    color: "#B3B3B3",
    textDecorationLine: "underline",
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
  noticeContainer: {
    backgroundColor: "#F6F7F9",
    padding: 15,
    borderRadius: 5,
    marginBottom: 214,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  noticeText: {
    fontSize: 12,
    color: "#333",
    marginLeft: 8,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  selectedDates: {
    marginTop: 10,
    padding: 10,
  },
  width: {
    width: vars.width_90,
    marginBottom: 16,
  },
});

export default SleepoverCheck;
