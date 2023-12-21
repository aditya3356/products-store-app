import React from "react";
import { Text, View } from "react-native";

const Button = ({ text, primary }) => {
  return (
    <View
      className={
        (primary ? "bg-[#2A4BA0]" : "bg-white border-[#2A4BA0] border") +
        " flex flex-row justify-center items-center rounded-3xl h-14"
      }
    >
      <Text
        className={primary ? "text-white" : "text-[#2A4BA0]"}
        style={{ fontFamily: "Manrope_600SemiBold" }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Button;
