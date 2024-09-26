import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View className="flex-row justify-between bg-green-600 py-4 px-5">
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="items-center">
        <FontAwesome5Icon
          name="home"
          size={24}
          color={route.name === "Home" ? "#7B1FA2" : "white"}
        />
        <Text
          className={`mt-1 text-sm ${
            route.name === "Home" ? "text-[#7B1FA2]" : "text-white"
          }`}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Completed Menu */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Completd")}
        className="items-center">
        <FontAwesome5Icon
          name="check-circle"
          size={24}
          color={route.name === "Completd" ? "#7B1FA2" : "white"}
        />
        <Text
          className={`mt-1 text-sm ${
            route.name === "Completd" ? "text-[#7B1FA2]" : "text-white"
          }`}>
          Completed
        </Text>
      </TouchableOpacity>

      {/* Progress Menu */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Progress")}
        className="items-center">
        <FontAwesome5Icon
          name="tasks"
          size={24}
          color={route.name === "Progress" ? "#7B1FA2" : "white"}
        />
        <Text
          className={`mt-1 text-sm ${
            route.name === "Progress" ? "text-[#7B1FA2]" : "text-white"
          }`}>
          Progress
        </Text>
      </TouchableOpacity>

      {/* Cancelled Menu */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Cancelled")}
        className="items-center">
        <FontAwesome5Icon
          name="times-circle"
          size={24}
          color={route.name === "Cancelled" ? "#7B1FA2" : "white"}
        />
        <Text
          className={`mt-1 text-sm ${
            route.name === "Cancelled" ? "text-[#7B1FA2]" : "text-white"
          }`}>
          Cancelled
        </Text>
      </TouchableOpacity>

      {/* Profile Menu */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        className="items-center">
        <FontAwesome5Icon
          name="user"
          size={24}
          color={route.name === "Profile" ? "#7B1FA2" : "white"}
        />
        <Text
          className={`mt-1 text-sm ${
            route.name === "Profile" ? "text-[#7B1FA2]" : "text-white"
          }`}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterMenu;
