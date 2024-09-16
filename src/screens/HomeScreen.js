import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import vars from "../vars";
import MediumText from "../components/MediumText";
import BoldText from "../components/BoldText";
import WhiteButton from "../components/WhiteButton";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();

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
            <BoldText style={styles.nameText}>홍길동</BoldText>
            <BoldText style={styles.greetingText}> 님</BoldText>
          </View>
          <BoldText style={styles.greetingText}>안녕하세요!</BoldText>
        </View>
        <View style={styles.width}>
          <BoldText>정릉 생활관</BoldText>
          <BoldText>101호</BoldText>
        </View>
      </View>
      {/* button section */}
      <View style={styles.buttonSection}>
        <View style={styles.buttonContainer}>
          {/* 출입증 */}
          <WhiteButton style={styles.halfButton} onPress={() => navigation.navigate("")}>
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
        <WhiteButton style={styles.fullWidthButton}>
          <MediumText>공지사항</MediumText>
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
