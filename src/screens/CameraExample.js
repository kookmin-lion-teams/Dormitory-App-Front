import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

export default function CameraExample({ onPhotoTaken }) {
  const [permission, requestPermission] = useCameraPermissions();
  // const [photo, setPhoto] = useState(null);
  // const cameraRef = useRef(null);
  const [camera, setCamera] = useState(null);

  if (!permission) {
    // 권한 받는 중~
    return <View />;
  }

  if (!permission.granted) {
    // 권한 거절당했을때
    return (
      <View style={styles.container}>
        <Text style={styles.message}>카메라 권한 허용 부탁</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      onPhotoTaken(photo.uri); // 사진 URI를 onPhotoTaken 콜백에 전달
    }
  };
  // const captureHandler = async () => {
  //   if (cameraRef.current) {
  //     try {
  //       const photoData = await cameraRef.current.takePictureAsync({
  //         base64: true,
  //         exif: true,
  //       });
  //       setPhoto(photoData);
  //     } catch (error) {
  //       console.error("사진 촬영 실패:", error);
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>버튼</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {/* {photo && (
        <Image
          source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
          style={styles.preview}
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  preview: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
  },
});
