import { View, Text, TextInput } from "react-native";
import React from "react";

const InputBox = ({
  inputTitle,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  onChangeText,
  setValue,
  value,
}) => {
  return (
    <View className="my-2">
      <Text className="text-[18px] text-green-500 my-2">{inputTitle}</Text>
      <TextInput
        className="border-2 bg-white border-green-600 rounded-lg p-2 w-[100%] h-[50px] "
        placeholder={inputTitle}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        onChangeText={(text) => setValue(text)}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    </View>
  );
};

export default InputBox;
