import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const vars = {
  primary_color: "#01509F",
  background_color: "#f6f7f9",
  message_color: "#b3b3b3",
  margin_top: height * 0.03,
  width_90: width * 0.9,
  w_button_radius: 10,
  button_radius: 6,
};

export default vars;
