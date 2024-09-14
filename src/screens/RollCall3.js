import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import vars from "../vars";
import MediumText from "../components/MediumText";
import BoldText from "../components/BoldText";
import BlueButton from "../components/BlueButton";
import CameraExample from "./CameraExample";

const RollCall3 = () => {
  const [imgs, setImgs] = useState([null, null, null, null]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [level, setLevel] = useState(0);

  const areas = ["책상", "침대", "바닥", "배수구"];

  const clickHandler = (where) => {
    setSelectedArea(where);
    setIsCameraOpen(true);
  };

  const onPhotoTaken = (photoUri) => {
    setIsCameraOpen(false);
    const index = areas.indexOf(selectedArea);
    if (index !== -1) {
      setImgs((prevImgs) => {
        const newImgs = [...prevImgs];
        newImgs[index] = photoUri;
        return newImgs;
      });
    }
  };

  const submitHandler = () => {
    if (level === 0 && imgs[0] && imgs[1]) {
      setLevel(1);
    } else if (level === 1 && imgs[2] && imgs[3]) {
      // API 요청 및 RollCall4로 이동 로직 추가 예정
    } else if (
      (level === 0 && (!imgs[0] || imgs[1])) ||
      (level === 1 && (!imgs[2] || imgs[3]))
    ) {
      //사진을 찍지 않고 버튼을 눌렀을때
    }
  };

  const renderCameraSection = (area, index, description) => (
    <View key={index}>
      <BoldText style={styles.smallText}>{area}</BoldText>
      <MediumText>{description}</MediumText>
      {imgs[index] ? (
        <View style={styles.cameraContainer}>
          <Image source={{ uri: imgs[index] }} style={styles.cameraImage} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.cameraContainer}
          onPress={() => clickHandler(area)}
        >
          <Image source={require("../../assets/camera.png")} style={styles.cameraIcon} />
        </TouchableOpacity>
      )}
    </View>
  );

  return isCameraOpen ? (
    <CameraExample onPhotoTaken={onPhotoTaken} />
  ) : (
    <View style={styles.outerContainer}>
      {/* header section */}
      <View style={[styles.width, { marginTop: vars.margin_top }]}>
        <BoldText>깨끗하게 청소된 구역을</BoldText>
        <BoldText>가이드에 맞춰 촬영해주세요</BoldText>
      </View>
      {/* notice section */}
      <View style={styles.messageContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={require("../../assets/notice.png")} style={styles.noticeIcon} />
          <MediumText style={styles.messageText}>
            청소 상태가 불량할 경우, 담당자가 직접 재점검합니다.
          </MediumText>
        </View>
      </View>
      {/* camera section */}
      <View style={styles.width}>
        {level === 0 ? (
          <>
            <BoldText style={styles.smallText}>1. 공통 구역</BoldText>
            {renderCameraSection("책상", 0, "책상 윗면 전체가 보이도록 촬영하세요")}
            {renderCameraSection("침대", 1, "침대와 침구류 전체가 보이도록 촬영하세요")}
          </>
        ) : (
          <>
            <BoldText style={styles.smallText}>2. 담당 구역 (샤워장)</BoldText>
            {renderCameraSection("바닥", 2, "샤워장 바닥 전체가 보이도록 촬영하세요")}
            {renderCameraSection("배수구", 3, "배수구의 상태가 보이도록 촬영하세요")}
          </>
        )}
      </View>
      {/* button section */}
      <View style={[styles.width, { marginBottom: vars.margin_top }]}>
        <BlueButton onPress={submitHandler}>
          <MediumText style={styles.buttonText}>다음</MediumText>
        </BlueButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  width: {
    width: vars.width_90,
  },
  messageContainer: {
    backgroundColor: vars.background_color,
    flexDirection: "column",
    width: vars.width_90,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: vars.button_radius,
  },
  noticeIcon: { width: 15, height: 15, marginRight: 10 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  messageText: { color: vars.message_color },
  smallText: { fontSize: 16 },
  cameraContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: vars.background_color,
    borderRadius: vars.button_radius,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    width: 50,
    height: 50,
  },
  cameraImage: { width: "100%", height: "100%" },
});

export default RollCall3;
