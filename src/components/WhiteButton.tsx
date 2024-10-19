import React from "react";
import { TouchableOpacity, Platform, TouchableOpacityProps, Text } from "react-native"; // Text 추가
import vars from "../vars";

interface WhiteButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const WhiteButton: React.FC<WhiteButtonProps> = (props) => {
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
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 10,
            },
            android: {
              elevation: 3,
            },
          }),
        },
        props.style,
      ]}
    >
      {/* props.children을 Text로 감싸기 */}
      <Text style={{ textAlign: 'center' }}> 
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default WhiteButton;
