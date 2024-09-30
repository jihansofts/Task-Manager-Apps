import { View, Text, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import InputBox from "../../../Forms/InputBox";
import ButtonCustom from "../../../Forms/ButtonCustom";
import { getEmail, getOTP } from "../../../../Helper/FormHelper";
import { PasswordResetRequest } from "../../../../API/APIRequest";
const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await getEmail("email");
      setEmail(storedEmail); // Set email to the state
    };

    fetchEmail(); // Call the async function
  }, []);
  const HandleSumit = async () => {
    try {
      setLoading(true);
      const OTP = await getOTP("OTP");
      const data = await PasswordResetRequest(email, OTP, password);
      setLoading(false);
      if (data === true) {
        navigation.navigate("Login");
        Alert.alert("Reset Password Successful");
      } else {
        Alert.alert("Login Failed");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <View className="flex-1 justify-center  bg-green-100 w-[100%] px-8">
      <Text className="text-3xl text-green-600 font-bold">Reset Password</Text>
      <InputBox
        value={email}
        editable={false}
        inputTitle="Email"
        keyboardType="email-address"
        autoComplete="email"
        autoCorrect={false}
      />
      <InputBox
        value={password}
        setValue={setPassword}
        inputTitle="New Password"
        secureTextEntry={true}
        autoComplete="password"
        autoCorrect={false}
      />
      <ButtonCustom
        handleSumit={HandleSumit}
        loading={loading}
        buttonName="Change"
      />
    </View>
  );
};

export default ResetPassword;
