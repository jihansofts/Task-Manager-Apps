import { Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ buttonName, handleSumit, loading }) => {
  return (
    <TouchableOpacity
      onPress={handleSumit}
      className="bg-green-600 rounded-lg p-2 w-[50%] mt-5 h-[50px] flex justify-center items-center ">
      <Text className="text-white text-[18px] font-bold">
        {loading ? "Loading..." : buttonName}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
