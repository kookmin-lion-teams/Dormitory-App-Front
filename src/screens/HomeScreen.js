import { StyleSheet, Text, View, Button } from "react-native";
import vars from "../vars";
const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ position: "relative" }}>
      {/* 배경 */}
      <View
        style={[
          {
            height: "30%",
            backgroundColor: vars.primary_color,
          },
          styles.background,
        ]}
      ></View>
      <View
        style={[
          {
            height: "70%",
            backgroundColor: vars.background_color,
          },
          styles.background,
        ]}
      ></View>
      {/* 컨텐츠 */}
      <View style={styles.mainContainer}>
        {/* 프로필 */}
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text>홍길동 </Text>
            <Text>20240101</Text>
          </View>
          <Text>무슨 대학 무슨 과</Text>
          <Text>정릉 생활관 101호</Text>
        </View>
        {/* 버튼 */}
        <View style={styles.buttonContainer}>
          <Button
            title="외박 신청"
            onPress={() => navigation.navigate("Sleepover", { name: "Jane" })}
          />
          <Button title="점호" onPress={() => navigation.navigate("RollCall")} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backgroud: { position: "absolute", top: 0, zIndex: -10 },
  profileContainer: {
    margin: "50% 0% 10%",
    padding: "1.25rem 1rem",
    width: "90%",
    height: "35%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonContainer: { display: "flex", flexDirection: "row", width: "90%" },
});
export default HomeScreen;
