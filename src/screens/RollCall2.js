import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import vars from "../vars";
import MediumText from "../components/MediumText";
import BoldText from "../components/BoldText";
import BlueButton from "../components/BlueButton";
import { isPointInTriangle } from "../funcs/isIn";

const RollCall2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [isIn, setIsIn] = useState(false);
  const navigation = useNavigation(); // navigation 정의

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setMsg("위치를 확인하는 중 입니다.");
      let isIn = false;
      try {
        // 위치 확인 권한 확인
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          navigation.goBack();
          return;
        }

        // 위치 확인
        let loc = await Location.getCurrentPositionAsync({});
        // const { lat, lng } = { lat: loc.coords.latitude, lng: loc.coords.longitude };
        const { lat, lng } = { lat: 37.611525, lng: 127.005409 };

        try {
          // 위치가 기숙사 안인지 확인
          isIn = await isPointInTriangle(lat, lng);
        } catch (e) {
          setMsg("위치 비교 중 문제가 발생했습니다.");
        }
      } catch (e) {
        setMsg("위치 확인 중 문제가 발생했습니다.");
      } finally {
        setIsLoading(false);
        setIsIn(isIn);
        if (isIn) {
          setMsg("홍길동 님의 위치가 확인되었습니다.");
        } else {
          setMsg("기숙사 안에서 점호를 진행해주세요");
        }
      }
    })();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.width, { marginTop: vars.margin_top }]}>
        <BoldText>{msg}</BoldText>
        {/* <MediumText>{isIn ? "맞다!" : "아니다!"}</MediumText> */}
      </View>
      <View style={styles.animeContainer}>
        {isLoading ? (
          <Image
            source={require("../../assets/loading.gif")} // 로컬 이미지 불러오기
            style={styles.loading}
          />
        ) : (
          <></>
        )}
      </View>
      {!isLoading && (
        <View style={styles.width}>
          <BlueButton style={{ marginBottom: vars.margin_top }}>
            <MediumText
              style={styles.buttonText}
              onPress={() => {
                navigation.navigate("RollCall3");
              }}
            >
              다음
            </MediumText>
          </BlueButton>
        </View>
      )}
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
  animeContainer: { display: "flex", flexDirection: "row", alignItems: "center" },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  loading: { width: 300, aspectRatio: 1 },
});

export default RollCall2;
