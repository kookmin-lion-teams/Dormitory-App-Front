import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
// 아래는 스크린들
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SleepoverScreen from "./src/screens/SleepoverScreen";
import RollCallScreen from "./src/screens/RollCallScreen";
import SleepoverReason from "./src/screens/SleepoverReason";
import SleepoverCheck from "./src/screens/SleepoverCheck";
import SleepoverSuccess from "./src/screens/SleepoverSuccess";
import SleepoverDetail from "./src/screens/SleepoverDetail";
import Detail from "./src/screens/Detail";
import RollCall2 from "./src/screens/RollCall2";
import RollCall3 from "./src/screens/RollCall3";
import RollCall4 from "./src/screens/RollCall4";
import RollCallDetail from "./src/screens/RollCallDetail";

const Stack = createNativeStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    // 로드가 길어져서 가려놓음 사용할거만 주석해제
    // Pretendard: require("./assets/fonts/PretendardVariable.ttf"),
    // "Pretendard-Light": require("./assets/fonts/Pretendard-Light.otf"),
    // "Pretendard-Black": require("./assets/fonts/Pretendard-Black.otf"),
    "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.otf"),
    // "Pretendard-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.otf"),
    // "Pretendard-Thin": require("./assets/fonts/Pretendard-Thin.otf"),
    // "Pretendard-ExtraLight": require("./assets/fonts/Pretendard-ExtraLight.otf"),
    // "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.otf"),
    // "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.otf"),
  });
};

 function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // 폰트가 로드되기 전에는 아무것도 렌더링하지 않음
    return null;
  }
  // sleepover : 외박 / roll call : 점호
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "white" }, // 헤더 배경색
          contentStyle: { backgroundColor: "white" }, // 전체 화면 배경색
        }}
      ><Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "", headerShown: false }}
    />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "", headerShown: false }}
        />
        
        <Stack.Screen
          name="Sleepover"
          component={SleepoverScreen}
          options={{ title: "외박일 선택" }}
        />
        <Stack.Screen
          name="SleepoverReason"
          component={SleepoverReason}
          options={{ title: "외박 사유", headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="SleepoverCheck"
          component={SleepoverCheck}
          options={{ title: "신청 정보 확인", headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="SleepoverSuccess"
          component={SleepoverSuccess}
          options={{ title: "", headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="SleepoverDetail"
          component={SleepoverDetail}
          options={{ title: "외박 신청 상세", headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: "신청 내역", headerBackTitleVisible: false }}
        />

        <Stack.Screen
          name="RollCall"
          component={RollCallScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="RollCall2"
          component={RollCall2}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="RollCall3"
          component={RollCall3}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="RollCall4"
          component={RollCall4}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="RollCallDetail"
          component={RollCallDetail}
          options={{ title: "신청 내역", headerBackTitleVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default require('./.storybook').default;
// export default App;