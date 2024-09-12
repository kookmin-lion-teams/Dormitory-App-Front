import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import vars from "../vars";
import MediumText from "../components/MediumText";
import BlueButton from "../components/BlueButton";
import CameraExample from "../components/CameraExample";
const RollCall3 = () => {
  const [imgs, setImgs] = useState(["책상", "침대", "바닥", "배수구"]);
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.width, { marginTop: vars.margin_top }]}>
        <MediumText>깨끗하게 청소된 구역을</MediumText>
        <MediumText>가이드에 맞춰 촬영해주세요</MediumText>
      </View>
      {/* 유의사항 */}
      <View style={styles.messageContainer}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/notice.png")} // 로컬 이미지 불러오기
            style={styles.noticeIcon}
          />
          <MediumText style={styles.messageText}>
            청소 상태가 불량할 경우, 담당자가 직접 재점검합니다.
          </MediumText>
        </View>
      </View>
      <View style={styles.width}>
        <MediumText>1. 공통 구역</MediumText>
        <View>
          <MediumText>책상</MediumText>
          <MediumText>책상 윗면 전체가 보이도록 촬영하세요</MediumText>
          <CameraExample></CameraExample>
        </View>
        <View>
          <MediumText>침대</MediumText>
          <MediumText>침대와 침구류 전체가 보이도록 촬영하세요</MediumText>
        </View>
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
  messageContainer: {
    backgroundColor: vars.background_color,
    display: "flex",
    flexDirection: "column",
    width: vars.width_90,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: vars.margin_top,
  },
  noticeIcon: { width: 15, height: 15, marginRight: 10 },

  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  messageText: { color: vars.message_color },
});

export default RollCall3;
