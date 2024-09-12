import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import vars from "../vars";
import MediumText from "../components/MediumText";
import BlueButton from "../components/BlueButton";

const RollCall3 = () => {
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
          <MediumText style={styles.messageText}>유의 사항</MediumText>
        </View>
      </View>
      <View style={styles.width}></View>
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
  animeContainer: {},
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  messageText: { color: vars.message_color },
});

export default RollCall3;
