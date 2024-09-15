import React from "react";
import { Text } from "react-native";

const BoldText = (props) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "Pretendard-Bold",
          fontSize: 18,
        },
        props.style, // 외부 스타일 덮어씌우기
      ]}
    >
      {props.children}
    </Text>
  );
};

export default BoldText;
