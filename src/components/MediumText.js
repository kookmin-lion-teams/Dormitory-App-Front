import React from "react";
import { Text } from "react-native";

const MediumText = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: "Pretendard-Medium",
      }}
    >
      {props.children}
    </Text>
  );
};

export default MediumText;
