import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import BoldText from "../components/BoldText";
import BlueButton from "../components/BlueButton";
import vars from "../vars";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [stnum, setStnum] = useState("");
  const navigation = useNavigation();
  const handleLogin = async () => {
    navigation.navigate("Home");
    if (name === "" || stnum === "") {
      Alert.alert("로그인 오류", "사용자 이름과 학번을 입력하세요.");
      return;
    }

    try {
      // 로그인 API 요청 (예: POST 요청)
      const response = await fetch(vars.back + "/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, stnum }),
      });
      const data = await response.json();
      if (response.ok) {
        try {
          await AsyncStorage.setItem(
            "DEPARTMENT",
            data.student_info.DEPARTMENT
          );
          await AsyncStorage.setItem("IN", data.student_info.IN.toString());
          await AsyncStorage.setItem(
            "MINUS",
            data.student_info.MINUS.toString()
          );
          await AsyncStorage.setItem("NAME", data.student_info.NAME);
          await AsyncStorage.setItem("PHONE", data.student_info.PHONE);
          await AsyncStorage.setItem("ROOM", data.student_info.ROOM);
          await AsyncStorage.setItem(
            "SEATNUM",
            data.student_info.SEATNUM.toString()
          );
          await AsyncStorage.setItem("SEX", data.student_info.SEX.toString());
          await AsyncStorage.setItem("SID", data.student_info.SID.toString());
          await AsyncStorage.setItem(
            "SLEEPOVER",
            data.student_info.SLEEPOVER.toString()
          );
          await AsyncStorage.setItem(
            "STNUM",
            data.student_info.STNUM.toString()
          );
        } catch (e) {
          console.error("Error saving student info:", e);
        }
        // HOME 화면으로 이동
        navigation.navigate("Home");
      } else {
        Alert.alert("로그인 실패", data.message || "로그인 정보를 확인하세요.");
      }
    } catch (error) {
      Alert.alert("오류", "로그인 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo-nobg.png")}
        style={styles.image}
      />
      <BoldText style={styles.title}>국민대학교 기숙사</BoldText>
      <TextInput
        style={[styles.input, styles.width]}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.width]}
        placeholder="학번"
        value={stnum}
        onChangeText={setStnum}
      />
      <BlueButton onPress={handleLogin}>
        <BoldText style={styles.buttonText}>로그인</BoldText>
      </BlueButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  image: { width: vars.width_90 * 0.4, height: vars.width_90 * 0.4 },
  width: {
    width: vars.width_90,
  },
});

export default LoginScreen;
