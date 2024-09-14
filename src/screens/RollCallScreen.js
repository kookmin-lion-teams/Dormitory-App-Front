import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import vars from "../vars";
import MediumText from "../components/MediumText";
import BlueButton from "../components/BlueButton";
const RollCallScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <MediumText>정릉생활관 3주차 점호</MediumText>
        <Image
          source={require("../../assets/logo-nobg.png")} // 로컬 이미지 불러오기
          style={styles.image}
        />

        <View style={[styles.width, styles.flexRow]}>
          <MediumText>점호 날짜</MediumText>
          <MediumText>2020.20.20(수)</MediumText>
        </View>
        <View style={[styles.width, styles.flexRow]}>
          <MediumText>점호 시간</MediumText>
          <MediumText>23:00 ~ 23:30</MediumText>
        </View>
        <View style={[styles.width]}>
          <BlueButton onPress={() => navigation.navigate("RollCall2")}>
            <MediumText style={styles.buttonText}>오늘 점호 참여하기</MediumText>
          </BlueButton>
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
});
export default RollCallScreen;
