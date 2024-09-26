import { View, Text } from "react-native";
import React from "react";
import ProgressList from "./ProgressList";
import FooterMenu from "../../Menus/FooterMenu";
import HeaderMenu from "../../Menus/HeaderMenu";
export default function Progress() {
  return (
    <View className="flex-1 justify-between bg-slate-100">
      <HeaderMenu />
      <Text>Progress</Text>
      <ProgressList />
      <FooterMenu />
    </View>
  );
}
