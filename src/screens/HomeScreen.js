import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import vars from "../vars";
import MediumText from "../components/MediumText";
import BoldText from "../components/BoldText";
import WhiteButton from "../components/WhiteButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [room, setRoom] = useState();
  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem("NAME");
      setName(name);
      const room = await AsyncStorage.getItem("ROOM");
      setRoom(room);
    })();
  }, []);

  const handleLogout = async () => {
    try {
      // 사용자 정보 삭제
      await AsyncStorage.clear(); // 모든 AsyncStorage 데이터를 삭제
      Alert.alert("로그아웃", "성공적으로 로그아웃되었습니다.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("로그아웃 중 오류 발생: ", error);
      Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {/* background logo section */}
      <Image
        source={require("../../assets/logo.png")}
        style={{
          position: "absolute",
          zIndex: -5,
          width: width * 0.8,
          height: width * 0.8,
          top: 150,
          left: 140,
        }}
      />

      {/* profile section */}
      <View style={styles.profileSection}>
        <View style={styles.width}>
          <View style={styles.nameContainer}>
            <BoldText style={styles.nameText}>{name}</BoldText>
            <BoldText style={styles.greetingText}> 님</BoldText>
          </View>
          <BoldText style={styles.greetingText}>안녕하세요!</BoldText>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.changeText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.width}>
          <BoldText>정릉 생활관</BoldText>
          <BoldText>{room}호</BoldText>
        </View>
      </View>
      {/* button section */}
      <View style={styles.buttonSection}>
        <View style={styles.buttonContainer}>
          {/* 출입증 */}

          <WhiteButton
            style={styles.halfButton}
            onPress={() => navigation.navigate("")}

            // onPress={() => navigation.navigate("Sleepover")}
          >
            <BoldText>출입증</BoldText>
          </WhiteButton>
          {/* 점호, 외박 */}
          <View style={styles.doubleButtonContainer}>
            <WhiteButton
              style={styles.halfHeightButton}
              onPress={() => navigation.navigate("RollCall")}
            >
              <BoldText>점호</BoldText>
            </WhiteButton>
            <WhiteButton
              style={styles.halfHeightButton}
              onPress={() => navigation.navigate("Sleepover")}
            >
              <BoldText>외박신청</BoldText>
            </WhiteButton>
          </View>
        </View>
        <WhiteButton
          style={styles.fullWidthButton}
          onPress={() => navigation.navigate("Detail")}
        >
          <MediumText>신청내역 확인하기</MediumText>
        </WhiteButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: width,
    minHeight: "100%",
    maxWidth: width,
  },
  changeText: {
    fontSize: 15,
    color: "#B3B3B3",
    textDecorationLine: "underline",
    marginTop: 15,
  },
  profileSection: {
    zIndex: -10,

    width: "100%",
    flex: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: vars.margin_top * 2.5,
    backgroundColor: "white",
  },
  width: {
    width: vars.width_90,
  },
  nameContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
  },
  nameText: {
    color: vars.primary_color,
    fontSize: 25,
  },
  greetingText: {
    fontSize: 21,
  },
  buttonSection: {
    width: "100%",
    flex: 6,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: vars.background_color,
    borderColor: "#DADADA",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingTop: 20,
    paddingBottom: vars.margin_top,
  },
  buttonContainer: {
    height: "84%",
    flexDirection: "row",
    justifyContent: "space-between",
    width: vars.width_90,
  },
  halfButton: {
    width: "48%",
    height: "98%",
  },
  doubleButtonContainer: {
    width: "48%",
    height: "98%",
    justifyContent: "space-between",
  },
  halfHeightButton: {
    width: "100%",
    height: "48%",
  },
  fullWidthButton: {
    width: "90%",
    height: "14%",
  },
});

export default HomeScreen;
