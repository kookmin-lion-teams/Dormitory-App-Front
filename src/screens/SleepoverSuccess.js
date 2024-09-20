import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import vars from "../vars";
import MediumText from "../components/MediumText";
import BoldText from "../components/BoldText";
import BlueButton from "../components/BlueButton";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 임포트

const SleepoverSuccess = ({ route }) => {
  const navigation = useNavigation();
  const { startDate, endDate, reason } = route.params;

  // POST 요청 함수
  const submitSleepoverRequest = async () => {
    try {
      const studentNumber = await AsyncStorage.getItem("STNUM"); // 저장된 학생 번호 불러오기

      // 외박 신청 API 요청 (POST)
      const response = await fetch(vars.back + "/student/sleepover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sstnum: studentNumber, // 학생 번호
          reason: reason, // 외박 사유
          startdate: startDate, // 시작 날짜
          enddate: endDate, // 종료 날짜
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const currentSleepCount = await AsyncStorage.getItem("SLEEPCOUNT");
        const newSleepCount = parseInt(currentSleepCount, 10) + 1;
        Alert.alert("외박 신청 완료", "외박 신청이 성공적으로 완료되었습니다.");
        navigation.navigate("Home"); // 신청이 완료되면 홈으로 이동
      } else {
        Alert.alert(
          "신청 실패",
          data.error || "외박 신청 중 문제가 발생했습니다."
        );
      }
    } catch (error) {
      Alert.alert("오류", "외박 신청 중 문제가 발생했습니다.");
    }
  };

  // 화면이 로드되면 POST 요청을 보냄
  useEffect(() => {
    submitSleepoverRequest();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={{ marginTop: 130, gap: 90 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/check.png")}
            style={styles.noticeIcon}
          />
        </View>
        <View style={styles.textContainer}>
          <BoldText style={{ marginBottom: vars.margin_top, fontSize: 24 }}>
            외박 신청이 완료되었어요
          </BoldText>
          <MediumText>담당자가 확인 후 외박 신청이 확정됩니다.</MediumText>
          <MediumText>확정되면 알림을 통해 알려드릴게요.</MediumText>
        </View>
      </View>

      <View style={[styles.width, { gap: 18, marginBottom: vars.margin_top }]}>
        <TouchableOpacity style={styles.grayButton}>
          <MediumText style={styles.grayButtonText}>신청 내역 보기</MediumText>
        </TouchableOpacity>
        <BlueButton
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MediumText style={styles.buttonText}>홈으로 가기</MediumText>
        </BlueButton>
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
  width: {
    width: vars.width_90,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 18 },
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
  grayButtonText: { color: "#575757", textAlign: "center", fontSize: 18 },
});

export default SleepoverSuccess;
