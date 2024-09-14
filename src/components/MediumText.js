import React from "react";
import { Text } from "react-native";

const MediumText = (props) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "Pretendard-Medium",
        },
        props.style, // 외부 스타일 덮어씌우기
      ]}
    >
      {props.children}
    </Text>
  );
};

export default MediumText;
