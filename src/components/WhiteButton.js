import React from "react";
import { TouchableOpacity, Platform } from "react-native";
import vars from "../vars";
const WhiteButton = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: "white",
          width: "100%",
          paddingVertical: 15,
          paddingHorizontal: 30,
          display: "flex",
          justifyContent: "center",
          borderRadius: vars.w_button_radius,
          ...Platform.select({
            ios: {
              shadowColor: "rgba(0, 0, 0, 0.2)", // 그림자 색상 및 불투명도
              shadowOffset: { width: 0, height: 0 }, // x, y 축으로의 그림자 오프셋
              shadowOpacity: 1, // 그림자의 불투명도 (rgba에서 a값이 이미 0.2이므로 1로 설정)
              shadowRadius: 10, // 그림자의 반경
            },
            android: {
              elevation: 3, // 비슷한 그림자 효과를 위한 안드로이드의 elevation 설정
            },
          }),
        },
        props.style,
      ]}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default WhiteButton;
