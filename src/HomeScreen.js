import { StyleSheet, Text, View, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <Button
        title="Go to profile"
        onPress={() => navigation.navigate("Profile", { name: "Jane" })}
      />
      <Button title="Go to Location" onPress={() => navigation.navigate("Location")} />
    </>
  );
};

export default HomeScreen;
