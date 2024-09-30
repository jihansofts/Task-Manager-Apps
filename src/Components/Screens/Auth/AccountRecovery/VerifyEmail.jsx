import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../../Forms/InputBox";
import { EmailValidationRequest } from "../../../../API/APIRequest";
const VerifyEmail = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleVerifyEmail = async () => {
    try {
      const data = await EmailValidationRequest(email);
      if (data === true) {
        navigation.navigate("OTPVerify");
      } else {
        Alert.alert("Error", "Invalid Email");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.log(error);
    }
  };
  return (
    <View className="flex-1 justify-center  bg-green-100 w-[100%] px-8">
      <Text className="text-3xl text-green-600 font-bold">Verify Email</Text>
      <InputBox
        value={email}
        setValue={setEmail}
        inputTitle="Email"
        keyboardType="email-address"
        autoComplete={"email"}
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={() => handleVerifyEmail()}
        className="bg-green-600 rounded-lg p-3 w-full md:w-[45%] mt-5 h-[50px]  flex justify-center items-center self-center">
        <Text className="text-white text-[18px] font-bold ">
          {loading ? "Loading..." : "Verify Email"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyEmail;
