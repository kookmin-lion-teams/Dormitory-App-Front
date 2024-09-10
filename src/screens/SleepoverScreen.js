import { View, Text, Button } from "react-native";

const SleepoverScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};
export default SleepoverScreen;
