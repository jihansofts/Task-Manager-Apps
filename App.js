import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Regstration from "./src/Components/Auth/Regstration";
export default function App() {
  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar style="auto" />
      <Regstration />
    </View>
  );
}
