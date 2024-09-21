import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator, // ActivityIndicator 추가
} from "react-native";
import vars from "../vars";
import MediumText from "../components/MediumText";
import BoldText from "../components/BoldText";
import BlueButton from "../components/BlueButton";
import CameraExample from "./CameraExample";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RollCall3 = () => {
  const navigation = useNavigation(); // navigation 정의

  const [imgs, setImgs] = useState([null, null, null, null]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [level, setLevel] = useState(0);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const clickHandler = (where) => {
    setSelectedArea(where);
    setIsCameraOpen(true); // 카메라를 열도록 설정
  };

  const onPhotoTaken = (photoUri) => {
    setIsCameraOpen(false);
    const newImgs = [...imgs];

    if (selectedArea === "책상") {
      newImgs[0] = photoUri; // photoUri 문자열로 저장
    } else if (selectedArea === "침대") {
      newImgs[1] = photoUri; // photoUri 문자열로 저장
    } else if (selectedArea === "바닥") {
      newImgs[2] = photoUri; // photoUri 문자열로 저장
    } else if (selectedArea === "배수구") {
      newImgs[3] = photoUri; // photoUri 문자열로 저장
    }
    setImgs(newImgs);
  };

  const uploadPhoto = async () => {
    setLoading(true); // 로딩 상태를 true로 설정하여 스피너 표시
    console.log("api요청 시작");

    const student_number = await AsyncStorage.getItem("STNUM");
    const room_number = await AsyncStorage.getItem("ROOM");
    const seat_number = await AsyncStorage.getItem("SEATNUM");

    const formData = new FormData();
    formData.append("student_number", student_number);
    formData.append("room_number", room_number);
    formData.append("seat_number", seat_number);
    imgs.forEach((img, index) => {
      formData.append("photos", {
        uri: imgs[index], // 이미지 URI (file:// 형식)
        type: "image/jpeg", // MIME 타입
        name: `photo${index}.jpg`, // 파일 이름
      });
    });

    try {
      const response = await fetch(vars.back + "/student/upload_clean_photos", {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (response.ok) {
        navigation.navigate("RollCall4");
      } else {
        Alert.alert("Error", "사진 업로드에 실패했습니다.");
      }
    } catch (e) {
      console.log("err" + e);
    } finally {
      setLoading(false); // 로딩 완료 후 스피너 숨기기
    }
  };

  const submitHandler = () => {
    if (level === 0 && imgs[0] && imgs[1]) {
      setLevel(1);
    } else if (level === 1 && imgs[2] && imgs[3]) {
      uploadPhoto();
    } else if (
      (level === 0 && (!imgs[0] || !imgs[1])) ||
      (level === 1 && (!imgs[2] || !imgs[3]))
    ) {
      Alert.alert("", "사진을 모두 찍어야 합니다.");
    }
  };

  return isCameraOpen ? (
    <CameraExample onPhotoTaken={onPhotoTaken} /> // 사진을 찍은 후 콜백
  ) : (
    <View style={styles.outerContainer}>
      {/* 화면 터치를 막기 위한 투명한 Overlay */}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <View style={[styles.width, { marginTop: vars.margin_top }]}>
        <BoldText>깨끗하게 청소된 구역을</BoldText>
        <BoldText>가이드에 맞춰 촬영해주세요</BoldText>
      </View>
      {/* camera section */}
      {level == 0 ? (
        <View style={styles.width}>
          <BoldText style={styles.smallText}>1. 공통 구역</BoldText>
          <View>
            <BoldText style={styles.smallText}>책상</BoldText>
            <MediumText>책상 윗면 전체가 보이도록 촬영하세요</MediumText>
            {imgs[0] ? (
              <View style={styles.cameraContainer}>
                <Image source={{ uri: imgs[0] }} style={styles.cameraImage} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.cameraContainer}
                onPress={() => clickHandler("책상")}
                disabled={loading} // 로딩 중일 때 터치 비활성화
              >
                <Image
                  source={require("../../assets/camera.png")}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <BoldText style={styles.smallText}>침대</BoldText>
            <MediumText>침대와 침구류 전체가 보이도록 촬영하세요</MediumText>
            {imgs[1] ? (
              <View style={styles.cameraContainer}>
                <Image source={{ uri: imgs[1] }} style={styles.cameraImage} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.cameraContainer}
                onPress={() => clickHandler("침대")}
                disabled={loading} // 로딩 중일 때 터치 비활성화
              >
                <Image
                  source={require("../../assets/camera.png")}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.width}>
          <BoldText style={styles.smallText}>2. 담당 구역 (샤워장)</BoldText>
          <View>
            <BoldText style={styles.smallText}>바닥</BoldText>
            <MediumText>샤워장 바닥 전체가 보이도록 촬영하세요</MediumText>
            {imgs[2] ? (
              <View style={styles.cameraContainer}>
                <Image source={{ uri: imgs[2] }} style={styles.cameraImage} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.cameraContainer}
                onPress={() => clickHandler("바닥")}
                disabled={loading} // 로딩 중일 때 터치 비활성화
              >
                <Image
                  source={require("../../assets/camera.png")}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <BoldText style={styles.smallText}>배수구</BoldText>
            <MediumText>배수구의 상태가 보이도록 촬영하세요</MediumText>
            {imgs[3] ? (
              <View style={styles.cameraContainer}>
                <Image source={{ uri: imgs[3] }} style={styles.cameraImage} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.cameraContainer}
                onPress={() => clickHandler("배수구")}
                disabled={loading} // 로딩 중일 때 터치 비활성화
              >
                <Image
                  source={require("../../assets/camera.png")}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* button section */}
      <View style={[styles.width, { marginBottom: vars.margin_top }]}>
        <BlueButton onPress={submitHandler} disabled={loading}>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // 스피너를 위에 표시
  },
  width: {
    width: vars.width_90,
  },
  smallText: { fontSize: 16 },
  cameraContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: vars.background_color,
    borderRadius: vars.button_radius,
    display: "flex",
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
