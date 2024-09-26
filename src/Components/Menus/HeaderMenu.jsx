import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getStoredData } from "../../Helper/FormHelper";
import { setData } from "../../Redux/State-Slice/LoginSlice";
import Store from "../../Redux/Store/Store";
import { useNavigation } from "@react-navigation/native";
const HeaderMenu = () => {
  const data = useSelector((state) => state.login.data);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchLocalStorageData = async () => {
      const storedData = await getStoredData("data");
      if (storedData) {
        Store.dispatch(setData(storedData));
        return storedData;
      }
    };
    fetchLocalStorageData();
  }, []);

  return (
    <View className="h-[80px] flex-row items-center px-5 justify-between bg-green-600">
      <StatusBar barStyle="auto" />
      {data?.data?.[0]?.photo ? (
        <View className="flex justify-center items-center h-[60px] w-[60px] rounded-full border-2 border-green-100">
          <Image
            className="h-[50px] w-[50px] rounded-full"
            source={{ uri: data?.data?.[0]?.photo }}
            resizeMode="cover"
          />
        </View>
      ) : (
        <Text>No Image Available</Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text className="text-white text-[18px] font-bold">
          {data?.data?.[0]?.firstName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMenu;
