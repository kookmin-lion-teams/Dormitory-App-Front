import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import vars from "../vars";
import MediumText from "../components/MediumText";
const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ position: "relative" }}>
      {/* 배경 */}
      <View
        style={[
          {
            height: "30%",
            backgroundColor: vars.primary_color,
          },
          styles.background,
        ]}
      ></View>
      <View
        style={[
          {
            height: "70%",
            backgroundColor: vars.background_color,
          },
          styles.background,
        ]}
      ></View>
      {/* 컨텐츠 */}
      <View style={styles.mainContainer}>
        {/* 프로필 */}
        <View style={[styles.profileContainer, styles.boxShadow]}>
          <View style={{ flexDirection: "row" }}>
            <Text>홍길동 </Text>
            <Text>20240101</Text>
          </View>
          <Text>무슨 대학 무슨 과</Text>
          <Text>정릉 생활관 101호</Text>
        </View>
        {/* 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.boxShadow]}
            onPress={() => navigation.navigate("Sleepover", { name: "Jane" })}
          >
            <MediumText style={styles.buttonText}>외박 신청</MediumText>
          </TouchableOpacity>
          <Pressable
            style={[styles.button, styles.boxShadow]}
            onPress={() => navigation.navigate("RollCall")}
          >
            <MediumText style={styles.buttonText}>점호</MediumText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backgroud: { position: "absolute", top: 0, zIndex: -10 },
  profileContainer: {
    marginTop: height * 0.25,
    marginBottom: 20,
    padding: 20,
    width: "90%",
    height: "35%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  button: {
    width: "50%",
    aspectRatio: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
  boxShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.2)", // 그림자 색상 및 불투명도
        shadowOffset: { width: 0, height: 0 }, // x, y 축으로의 그림자 오프셋
        shadowOpacity: 1, // 그림자의 불투명도 (rgba에서 a값이 이미 0.2이므로 1로 설정)
        shadowRadius: 10, // 그림자의 반경
      },
      android: {
        elevation: 3, // 비슷한 그림자 효과를 위한 안드로이드의 elevation 설정
      },
    }),
  },
});

export default HomeScreen;
