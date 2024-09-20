import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
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
    console.log("api요청 시작");

    const student_number = await AsyncStorage.getItem("STNUM");
    const room_number = await AsyncStorage.getItem("ROOM");
    const seat_number = await AsyncStorage.getItem("SEATNUM");

    // FormData 객체 생성
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
      const responseText = await response.text(); // 응답을 텍스트로 확인
      console.log(responseText); // 서버에서 반환한 실제 내용을 로그로 확인
      console.log(formData);
      if (response.ok) {
        const data = JSON.parse(responseText); // 정상일 경우 JSON 파싱
        console.log(data);
        Alert.alert("Success", "Photos uploaded successfully");
      } else {
        Alert.alert("Error", responseText); // 에러일 경우 메시지 알림
      }
    } catch (e) {
      console.log("err" + e);
    }
  };

  const submitHandler = () => {
    // navigation.navigate("RollCall4");
    if (level == 0 && imgs[0] && imgs[1]) {
      setLevel(1);
    } else if (level == 1 && imgs[2] && imgs[3]) {
      uploadPhoto();
      // api 요청으로 사진을 보낸 후
      //다음 페이지 RollCall4 로 이동
      // 여기는 api가 나오면 구현할 예정!
    } else if (
      (level === 0 && (!imgs[0] || !imgs[1])) ||
      (level === 1 && (!imgs[2] || !imgs[3]))
    ) {
      //사진을 찍지 않고 버튼을 눌렀을때
      Alert.alert("", "사진을 모두 찍어야 합니다.");
    }
  };
  return isCameraOpen ? (
    <CameraExample onPhotoTaken={onPhotoTaken} /> // 사진을 찍은 후 콜백
  ) : (
    <View style={styles.outerContainer}>
      {/* header section */}
      <View style={[styles.width, { marginTop: vars.margin_top }]}>
        <BoldText>깨끗하게 청소된 구역을</BoldText>
        <BoldText>가이드에 맞춰 촬영해주세요</BoldText>
      </View>
      {/* notice section */}
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
