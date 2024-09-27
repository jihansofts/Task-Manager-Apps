import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ProfileGetRequest } from "../../API/APIRequest";
import { useNavigation } from "@react-navigation/native";
const HeaderMenu = () => {
  const data = useSelector((state) => state.profile.ProfileData);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      await ProfileGetRequest();
    })();
  }, []);

  return (
    <View className="h-[80px] flex-row items-center px-5 justify-between bg-green-600">
      <StatusBar barStyle="auto" />
      {data?.[0]?.photo ? (
        <View className="flex justify-center items-center h-[60px] w-[60px] rounded-full border-2 border-green-100">
          <Image
            className="h-[50px] w-[50px] rounded-full"
            source={{ uri: data?.[0]?.photo }}
            resizeMode="cover"
          />
        </View>
      ) : (
        <Text>No Image Available</Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text className="text-white text-[18px] font-bold">
          {data?.[0]?.firstName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMenu;
