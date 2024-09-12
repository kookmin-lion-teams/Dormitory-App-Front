import React from "react";
import { TouchableOpacity } from "react-native";
import vars from "../vars";
import MediumText from "./MediumText";
const BlueButton = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        ...props.style,
        backgroundColor: vars.primary_color,
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 30,
        display: "flex",
        justifyContent: "center",
        borderRadius: vars.button_radius,
      }}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default BlueButton;
