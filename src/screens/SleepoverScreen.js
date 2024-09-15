import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import BlueButton from "../components/BlueButton";
import MediumText from "../components/MediumText";
import vars from "../vars";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["kr"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "kr";

const SleepoverScreen = ({ navigation, route }) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDayPress = (day) => {
    if (!startDate || (startDate && endDate)) {
      // 시작 날짜를 선택하거나 두 번째 클릭 시 범위 재설정
      setStartDate(day.dateString);
      setEndDate(null);
      setSelectedDates({
        [day.dateString]: {
          startingDay: true,
          color: "#01509F",
          textColor: "white",
        },
      });
    } else if (startDate && !endDate) {
      // 종료 날짜를 선택한 경우
      const newMarkedDates = createMarkedDates(startDate, day.dateString);
      setEndDate(day.dateString);
      setSelectedDates(newMarkedDates);
    }
  };

  const createMarkedDates = (start, end) => {
    let markedDates = {};
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      markedDates[dateStr] = {
        color: "#A1DAF8",
        textColor: "white",
        ...(dateStr === start ? { startingDay: true } : {}),
        ...(dateStr === end ? { endingDay: true } : {}),
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return markedDates;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text> 외박하고자 하는</Text>
        <Text>날짜를 알려주세요</Text>
      </View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDates}
        markingType={"period"}
        theme={{
          selectedDayBackgroundColor: "blue",
          todayTextColor: "red",
          arrowColor: "blue",
        }}
      />

      <View style={styles.messageContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/notice.png")} // 로컬 이미지 불러오기
            style={styles.noticeIcon}
          />
          <MediumText style={styles.messageText}>
            이번 학기 신청 가능한 외박 횟수가 3회 남았어요.
          </MediumText>
        </View>
      </View>

      <View style={styles.selectedDates}>
        <Text style={styles.rangeText}>외박 일자</Text>
        <View>
          <Text style={styles.dateText}>
            {startDate && !endDate
              ? `선택된 날짜: ${startDate}`
              : startDate && endDate
              ? ` ${startDate} - ${endDate}`
              : "날짜를 선택하세요"}
          </Text>
          <Text> 총 9박</Text>
        </View>
      </View>
      <BlueButton onPress={() => navigation.navigate("SleepoverReason")}>
        <MediumText style={styles.buttonText}>다 음</MediumText>
      </BlueButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  selectedDates: {
    marginTop: 10,
    padding: 10,
  },
  rangeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  messageContainer: {
    backgroundColor: vars.background_color,
    display: "flex",
    flexDirection: "row",
    width: vars.width_90,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: vars.margin_top,
  },
});
export default SleepoverScreen;
