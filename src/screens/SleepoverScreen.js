import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import BlueButton from "../components/BlueButton";
import MediumText from "../components/MediumText";
import vars from "../vars";
import { useFocusEffect } from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [sleepCount, setSleepCount] = useState(0);
  const { reason } = route.params || {};

  const today = new Date().toISOString().split("T")[0]; // 현재 날짜를 YYYY-MM-DD 형식으로 가져옴

  useFocusEffect(
    React.useCallback(() => {
      const fetchSleepCount = async () => {
        try {
          const count = await AsyncStorage.getItem("SLEEPCOUNT");
          if (count !== null) {
            setSleepCount(parseInt(count, 10));
          } else {
            setSleepCount(0);
          }
        } catch (error) {
          console.error("남은 외박 횟수를 불러오는데 실패했습니다.", error);
        }
      };

      fetchSleepCount();
      markSundays();
    }, [])
  );

  const handleDayPress = (day) => {
    if (!startDate || (startDate && endDate)) {
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

    markSundays(markedDates);
    return markedDates;
  };

  const markSundays = (markedDates = {}) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let month = 0; month < 12; month++) {
      let date = new Date(currentYear, month, 1);

      while (date.getMonth() === month) {
        if (date.getDay() === 0) {
          const dateStr = date.toISOString().split("T")[0];
          markedDates[dateStr] = {
            ...markedDates[dateStr],
            textColor: "#C41E3A",
          };
        }
        date.setDate(date.getDate() + 1);
      }
    }

    setSelectedDates((prevDates) => ({ ...prevDates, ...markedDates }));
  };

  // 날짜 차이를 계산하는 함수 추가
  const getDaysBetweenDates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate - startDate;
    const dayDiff = timeDiff / (1000 * 3600 * 24); // 하루의 밀리초로 나누어 날짜 차이를 계산
    return dayDiff + 1; // 같은 날짜도 포함해야 하므로 +1
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>외박하고자 하는 날짜를 알려주세요</Text>
      </View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDates}
        markingType={"period"}
        minDate={today} // 현재 날짜 이후로만 선택 가능하게 설정
        theme={{
          selectedDayBackgroundColor: "black",
          arrowColor: "black",
          textSectionTitleSundayColor: "#C41E3A",
        }}
      />

      <View style={styles.messageContainer}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image
            source={require("../../assets/notice.png")}
            style={styles.noticeIcon}
          />
          <MediumText style={styles.messageText}>
            {sleepCount >= 3
              ? "이번 학기 외박 신청 횟수를 초과했습니다."
              : `이번 학기 신청 가능한 외박 횟수가 ${
                  3 - sleepCount
                }회 남았어요.`}
          </MediumText>
        </View>
      </View>

      <View style={styles.selectedDates}>
        <Text style={styles.rangeText}>외박 일자</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <Text style={styles.dateText}>
            {startDate && !endDate
              ? `선택된 날짜: ${startDate}`
              : startDate && endDate
              ? ` ${startDate} - ${endDate}`
              : "날짜를 선택하세요"}
          </Text>
          <Text style={styles.dateText}>
            {startDate && endDate
              ? `총 ${getDaysBetweenDates(startDate, endDate)}박`
              : "총 0박"}
          </Text>
        </View>
      </View>
      {sleepCount < 3 ? (
        <BlueButton
          style={styles.width}
          onPress={() => {
            if (!startDate || !endDate) {
              Alert.alert("날짜 선택", "외박 일자를 선택하지 않았어요.");
            } else {
              navigation.navigate("SleepoverReason", {
                startDate,
                endDate,
                reason,
                sleepCount,
              });
            }
          }}
        >
          <MediumText style={styles.buttonText}>다 음</MediumText>
        </BlueButton>
      ) : (
        <MediumText style={styles.messageText}>
          외박 신청이 불가능합니다. 외박 횟수를 초과했습니다.
        </MediumText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 27,
    marginBottom: 30,
    margin: 10,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  selectedDates: {
    marginTop: 10,
    padding: 10,
  },
  rangeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: "#575757",
  },
  messageContainer: {
    backgroundColor: vars.background_color,
    flexDirection: "row",
    width: vars.width_90,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 11,
    marginTop: 27,
    borderRadius: 5,
  },
  messageText: {
    paddingLeft: 10,
    color: "#575757",
  },
  width: {
    width: vars.width_90,
    marginBottom: 16,
  },
});

export default SleepoverScreen;
