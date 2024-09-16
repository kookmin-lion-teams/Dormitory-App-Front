import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import vars from "../vars";
import MediumText from "../components/MediumText";
import BoldText from "../components/BoldText";
import BlueButton from "../components/BlueButton";
import { differenceInWeeks, parseISO } from "date-fns";

const RollCallScreen = () => {
  const navigation = useNavigation();
  const [isWithinTimeRange, setIsWithinTimeRange] = useState(false);
  const [weekNumber, setWeekNumber] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [nextMon, setNextMon] = useState("");
  useEffect(() => {
    const now = new Date();
    // 두 날짜를 ISO 형식으로 설정
    const date1 = parseISO("2024-09-02"); // 9월 2일 월요일
    // const date2 = new Date(); // 오늘 날짜
    const date2 = parseISO("2024-10-04"); // 10월 4일

    // 두 날짜 사이의 주 차이를 계산
    const weeksDifference = differenceInWeeks(date2, date1);
    setWeekNumber(weeksDifference + 1);

    // 현재 요일, 시간, 분 계산
    const dayOfWeek = now.getDay(); // 0: 일요일, 1: 월요일 ... 6: 토요일
    // 다음 월요일까지의 일수를 계산합니다. (월요일은 1이므로, 현재 요일이 월요일인 경우에는 7일을 더하여 다음 주 월요일을 구합니다.)
    const daysUntilNextMonday = (1 - dayOfWeek + 7) % 7;
    // 다음 월요일의 날짜를 계산합니다.
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilNextMonday);

    // 날짜를 YYYY.MM.DD(요일) 형식으로 포맷합니다.
    const year = nextMonday.getFullYear();
    const mmonth = String(nextMonday.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 해주고, 두 자리로 포맷
    const day = String(nextMonday.getDate()).padStart(2, "0"); // 일은 두 자리로 포맷

    // 요일 배열을 정의합니다.
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[nextMonday.getDay()];

    // 최종 포맷 문자열
    const formattedDate = `${year}.${mmonth}.${day}(${weekday})`;
    // 다음 월요일의 날짜를 문자열로 포맷합니다.
    setNextMon(formattedDate);
    setYear(year);
    const month = now.getMonth() + 1; // 월
    setMonth(month);
    const date = now.getDate(); // 일

    const hours = now.getHours(); // 시간
    const minutes = now.getMinutes(); // 분

    // 월요일 23:00 ~ 23:30 사이인지 확인
    if (dayOfWeek === 1 && hours === 23 && minutes >= 0 && minutes <= 30) {
      setIsWithinTimeRange(true);
    } else {
      setIsWithinTimeRange(false);
    }
  }, []);
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {/* header */}
        <BoldText>정릉생활관 {weekNumber}주차 점호</BoldText>

        {/* image */}
        <Image source={require("../../assets/logo-nobg.png")} style={styles.image} />

        {/* info */}
        <View style={[styles.width, styles.flexRow]}>
          <MediumText>점호 날짜</MediumText>
          <MediumText>{nextMon}</MediumText>
        </View>
        <View style={[styles.width, styles.flexRow]}>
          <MediumText>점호 시간</MediumText>
          <MediumText>23:00 ~ 23:30</MediumText>
        </View>
        {/* buton */}
        <View style={[styles.width]}>
          {isWithinTimeRange ? (
            <BlueButton onPress={() => navigation.navigate("RollCall2")}>
              <MediumText style={styles.buttonText}>오늘 점호 참여하기</MediumText>
            </BlueButton>
          ) : (
            <TouchableOpacity disabled={!isWithinTimeRange} style={styles.grayButton}>
              <MediumText style={styles.grayButtonText}>점호 시간이 아닙니다</MediumText>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* 유의사항 */}
      <View style={styles.messageContainer}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/notice.png")} // 로컬 이미지 불러오기
            style={styles.noticeIcon}
          />
          <MediumText style={styles.messageText}>유의 사항</MediumText>
        </View>

        <MediumText style={styles.messageText}>
          생활관 내부에 있을 경우에만 참여할 수 있습니다.
        </MediumText>
        <MediumText style={styles.messageText}>
          점호 일시 이후에는 참여할 수 없습니다.
        </MediumText>
        <MediumText style={styles.messageText}>
          위치 서비스 권한을 허용해야만 참여할 수 있습니다.
        </MediumText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    marginTop: vars.margin_top,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
  },
  width: {
    width: vars.width_90,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: { width: vars.width_90 * 0.4, height: vars.width_90 * 0.4 },
  noticeIcon: { width: 15, height: 15, marginRight: 10 },
  messageContainer: {
    backgroundColor: vars.background_color,
    display: "flex",
    flexDirection: "column",
    width: vars.width_90,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: vars.margin_top,
    borderRadius: vars.button_radius,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  messageText: { color: vars.message_color },
  grayButton: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    borderRadius: vars.button_radius,
    borderWidth: 1,
    borderColor: "#979797",
    borderStyle: "solid",
  },
  grayButtonText: { color: "#575757", textAlign: "center", fontSize: 16 },
});
export default RollCallScreen;
