import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import vars from "../vars";
import MediumText from "../components/MediumText";
import BoldText from "../components/BoldText";
import BlueButton from "../components/BlueButton";

const RollCall4 = () => {
  const navigation = useNavigation(); // navigation 정의

  return (
    <View style={styles.outerContainer}>
      <View style={{ marginTop: 130, gap: 90 }}>
        {/* icon section*/}
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../assets/check.png")} // 로컬 이미지 불러오기
            style={styles.noticeIcon}
          />
        </View>
        {/* text section */}
        <View style={styles.textContainer}>
          <BoldText style={{ marginBottom: vars.margin_top }}>
            점호가 완료되었어요
          </BoldText>
          <MediumText>n주차 점호에 정상적으로 참여했습니다.</MediumText>
          <MediumText>내역에 이상이 있을 경우 담당자에게 문의해주세요.</MediumText>
        </View>
      </View>

      {/* button section */}
      <View style={[styles.width, { gap: 10, marginBottom: vars.margin_top }]}>
        <TouchableOpacity style={styles.grayButton}>
          <MediumText style={styles.grayButtonText}>점호 내역 보기</MediumText>
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
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
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

export default RollCall4;
