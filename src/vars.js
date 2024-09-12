import { Dimensions } from "react-native";

// 화면 높이 가져오기
const { height, width } = Dimensions.get("window");
const vars = {
  primary_color: "#01509F",
  background_color: "#f6f7f9",
  margin_top: height * 0.05,
  width_90: width * 0.9,
  button_radius: 6,
  message_color: "#575757",
};
export default vars;
