import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import InputBox from "../../Forms/InputBox";
import ButtonCustom from "../../Forms/ButtonCustom";
import axios from "axios";
const { width } = Dimensions.get("window");

const Registration = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await axios.post(
        "https://task-management-backend-ep6l.onrender.com/api/v1/Registrations",
        {
          firstName,
          lastName,
          email,
          mobile,
          password,
          photo:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgEAYAAAAj6qa3AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfnAgwKJDbERpyrAAAEdUlEQVRo3u2YfUxbVRjG3/eWgRmZkEiLxMFIIGoyNhdnoM6Nja8hDbOOSefURJJ2AxRDYDCnshA2TXB8lLGSdUhDMsLHEMQEV2QtIHMZInFxpiEbZoJAGDA2gYXOUdrXP+RWQ0Juu972btHn73Oe+z6/e8+57zkIblbOFUlv8/lNmygKXsQzKhXIqR+kcXFgxmTUhobaB66lbyhjZITa4Sw+MBqplJllgmpqKvOnDClHTCZ31Yd8G36gD6/UD/n4iO7M68yfqtXQCk9BfXo6hIKJmhjGYaMUiAOR1QotEAZqrdbvVMBmysrNLcJBhWL/4uIjB4ANzoTMLS3EdnRgDRaDOiaGN7IWqsID3d1+GjHZ6pOS+ALh+BvhMto8f3QhraKC9+Cs1uD71BgbO7915gHTXVbGW92uGrBrHLNAiv2HDvEefIWoAvSUmJmZExz4c0vDxo2CA7Bvbs6u8YfVV9AFVpHI1mT7hXRKpeAAYInaQBcf7/bgK4T+8BJcTUgQHkAPHoOhkBBPA4BkTIM9GzYIDyATAqGRyOMAPoSnUe/6c10HcJ2yoHBszOMAdlAxWUdHBQdA3tCOGoPB4wAMcA8zL14UHsByy2rv3Nyt5edYnxVpbVt0OlftRK4a9BsWfjtvmJ6WrvN9XTEhkQDCTxAVGek2ACowgkajqXxuSqEoqatz1Y63/zbbq2MVtcOtri7eg1+ja3DYaDRnTK+7+2ZeHl+2vAFge/MnF8W/U6BMhpegDI0azUMvDXZeGdyEqspKc/jtoLsfy2TVXwCkZ1gsfNXN+2lwpdiWle3c7A3MGCZBw7+Ow8HUAW+NjLCbG7vGT8smaxWKwUF31/m//qty+xJglU1+1Eb+/kyfzyVLc3Aw5VASRqxfby9EjR1kGh/3/toiBxgd/fzkH7OK/XNzjx2AvHcCE85N+vpaDlhb1sqVSpAxnfRDSgp+D23Qtn07e5pb1WB586MdsBf2Xr6MRvoIDre2mr/0OvLEdzpddfWt9D1XzeZHDkD2lsCE5malEreRFbtOnABvMEF8UBBvZI9CAhZMTOBp6iVVQYH6s9vjqfm1tYIBsN/9Wef/NGdptdAFpXQwLY23wFwKoyI43tiIW32G6JhSqd42rlYo7t93O4BCAughL685iSRs5syFC/A23APx7t0eC75SMRAB+Z2dfq9NdwcMJycXIUAMLi05Ot3pRmhOKhmYGSwvFzw4qx4wQUli4iyIU+/klpY6O93hLyD7k4D61veio3GBybHF9PYKnXs1MVewhKmNjS3/cerdffqeHs7xjpgSISJgqu1kcbHQAblku2lbY2v4u04i5HzBnANyX5X82qqXSm3Pwyu2hb4+oQM6Kmpk/JmoyMhTU5ND+0IGBlYbx/kFWM/CBN2Qy4UO5KxQZX2BvuWumxMAVtPLdHDnTqEDOa3rOEyFu3a5DACaoASl/7Ssj4uohY7DG9x1cwKgAYiGYbFY6EDOClUQDokSicsAmGfgBkXU1Xnszs9VsXV2wASe474y+wtUZ9n+9lrctQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xMlQxMDozNjo1NCswMDowMPQK/iQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDItMTJUMTA6MzY6NTQrMDA6MDCFV0aYAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAyLTEyVDEwOjM2OjU0KzAwOjAw0kJnRwAAAABJRU5ErkJggg==",
        }
      );
      setLoading(false);
      if (data.data.status === "success") {
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobile("");
        setPassword("");
        navigation.navigate("Login");
        Alert.alert("Registration successful");
      } else {
        setLoading(false);
        Alert.alert("Account already exists");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert("Registration failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <ScrollView className="flex-grow-1 p-10">
        <View className="flex: w-[100%]">
          <Text
            className={`${
              width > 768 ? "text-3xl" : "text-2xl"
            } text-green-600 font-bold text-center`}>
            Registration
          </Text>
          <InputBox
            value={firstName}
            setValue={setFirstName}
            inputTitle="First Name"
          />
          <InputBox
            value={lastName}
            setValue={setLastName}
            inputTitle="Last Name"
          />
          <InputBox
            value={email}
            setValue={setEmail}
            inputTitle="Email"
            keyboardType="email-address"
          />
          <InputBox value={mobile} setValue={setMobile} inputTitle="Mobile" />
          <InputBox
            value={password}
            setValue={setPassword}
            inputTitle="Password"
            secureTextEntry={true}
          />
          <ButtonCustom
            handleSumit={handleSubmit}
            loading={loading}
            buttonName="Register"
          />
        </View>
        <Text className="text-green-600">
          Already have an account{" "}
          <Text
            onPress={() => navigation.navigate("Login")}
            className="text-red-600">
            Login
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;
