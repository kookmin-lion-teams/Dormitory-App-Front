import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import HomeScreen from "./src/screens/HomeScreen";
import SleepoverScreen from "./src/screens/SleepoverScreen";
import RollCallScreen from "./src/screens/RollCallScreen";
const Stack = createNativeStackNavigator();
// sleepover : 외박 / roll call : 점호
export default function App() {
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
