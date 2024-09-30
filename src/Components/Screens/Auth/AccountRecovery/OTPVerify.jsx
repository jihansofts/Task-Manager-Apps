import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { PasswordRecoveryRequest } from "../../../../API/APIRequest";
import { getEmail } from "../../../../Helper/FormHelper";
import { OtpInput } from "react-native-otp-entry"; // Assuming this is the correct OTP input library you're using

const OTPVerify = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOTPSubmit = async () => {
    try {
      const email = await getEmail("email");
      let result = await PasswordRecoveryRequest(email, otp);
      console.log(result, "result");
      if (result === true) {
        navigation.navigate("ResetPassword");
      } else if (result === false) {
        Alert.alert("Error", "Invalid OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View className="flex-1 justify-center bg-green-100 w-full px-4 md:px-8">
      <Text className="text-2xl md:text-3xl text-green-600 font-bold mb-4 text-center">
        OTP Verification
      </Text>
      <OtpInput
        value={otp}
        setValue={setOtp}
        numberOfDigits={6}
        onTextChange={(text) => setOtp(text)}
        containerStyle={{
          justifyContent: "space-between",
          width: "100%",
          marginVertical: 20,
        }}
        inputContainerStyle={{
          borderWidth: 2,
          borderColor: "#6b7280", // Gray border color
          borderRadius: 10,
          padding: 10,
          marginHorizontal: 5, // Space between inputs
        }}
        inputStyle={{
          fontSize: 22,
          color: "#111827", // Dark text color
          textAlign: "center",
        }}
        focusInputStyle={{
          borderColor: "#10b981", // Green border on focus
        }}
      />

      {/* OTP Submit Button with NativeWind */}
      <TouchableOpacity
        className="bg-green-600 rounded-lg p-3 w-full md:w-[45%] mt-5 h-[50px]  flex justify-center items-center self-center"
        onPress={handleOTPSubmit}>
        <Text className="text-white text-[18px] font-bold ">
          {loading ? "Loading..." : "Verify OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPVerify;
