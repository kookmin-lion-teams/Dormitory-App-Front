import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";

import HomeScreen from "./src/screens/HomeScreen";
import SleepoverScreen from "./src/screens/SleepoverScreen";
import RollCallScreen from "./src/screens/RollCallScreen";

const Stack = createNativeStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    // 로드가 길어져서 가려놓음 사용할거만 주석해제
    // Pretendard: require("./assets/fonts/PretendardVariable.ttf"),
    // "Pretendard-Light": require("./assets/fonts/Pretendard-Light.otf"),
    // "Pretendard-Black": require("./assets/fonts/Pretendard-Black.otf"),
    // "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.otf"),
    // "Pretendard-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.otf"),
    // "Pretendard-Thin": require("./assets/fonts/Pretendard-Thin.otf"),
    // "Pretendard-ExtraLight": require("./assets/fonts/Pretendard-ExtraLight.otf"),
    // "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.otf"),
    // "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.otf"),
  });
};

export default function App() {
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
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen name="Sleepover" component={SleepoverScreen} />
        <Stack.Screen name="RollCall" component={RollCallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
