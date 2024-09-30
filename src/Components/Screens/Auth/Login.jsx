import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../Forms/InputBox";
import ButtonCustom from "../../Forms/ButtonCustom";
import { LoginRequest } from "../../../API/APIRequest";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleSumit = async () => {
    try {
      setLoading(true);
      const data = await LoginRequest(email, password);
      setLoading(false);
      if (data === true) {
        navigation.navigate("Home");
        Alert.alert("Login Successful");
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
      <Text className="text-3xl text-green-600 font-bold">Login</Text>
      <InputBox
        value={email}
        setValue={setEmail}
        inputTitle="Email"
        keyboardType="email-address"
        autoComplete="email"
        autoCorrect={false}
      />

      <InputBox
        value={password}
        setValue={setPassword}
        inputTitle="Password"
        secureTextEntry={true}
        autoComplete="password"
        autoCorrect={false}
      />
      <ButtonCustom
        handleSumit={HandleSumit}
        loading={loading}
        buttonName="Login"
      />
      <View className="mt-2">
        <Text className="text-green-600">
          Don't have an account?
          <Text
            onPress={() => navigation.navigate("Regstration")}
            className="text-red-600">
            Regstration{" "}
          </Text>
        </Text>
        <Text
          onPress={() => navigation.navigate("VerifyEmail")}
          className="text-green-700">
          Forget Password?
        </Text>
      </View>
    </View>
  );
};

export default Login;
