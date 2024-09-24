import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import InputBox from "../Forms/InputBox";
import ButtonCustom from "../Forms/ButtonCustom";
const Regstration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleSumit = async () => {
    setLoading(true);
    const data = {
      firstName,
      lastName,
      email,
      mobile,
      password,
    };
    console.log(data);
    setLoading(false);
  };
  return (
    <View className="flex-1 justify-center  bg-green-100 w-[100%] px-8">
      <Text className="text-3xl text-green-600 font-bold">Regstration</Text>
      <InputBox
        value={firstName}
        setValue={setFirstName}
        inputTitle="First Name"
        autoCorrect={false}
      />
      <InputBox
        value={lastName}
        setValue={setLastName}
        inputTitle="Last Name"
        autoCorrect={false}
      />
      <InputBox
        value={email}
        setValue={setEmail}
        inputTitle="Email"
        keyboardType="email-address"
        autoComplete="email"
        autoCorrect={false}
      />
      <InputBox
        value={mobile}
        setValue={setMobile}
        inputTitle="Mobile"
        autoComplete="tel"
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
        buttonName="Regstration"
      />
      <Text className="text-green-600"> 
        Already have an account <Text className="text-red-600">Login</Text>
      </Text>
    </View>
  );
};

export default Regstration;
