import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Login from "../Screens/Auth/Login";
import Regstration from "../Screens/Auth/Regstration";
import { getStoredData } from "../../Helper/FormHelper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home/Home";
import Completd from "../Screens/Completd/Completd";
import Progress from "../Screens/Progress/Progress";
import Canceletd from "../Screens/Canceletd/Canceletd";
import Profile from "../Screens/Profile/Profile";
import { setToken } from "../../Redux/State-Slice/LoginSlice";
import { useSelector } from "react-redux";
import Store from "../../Redux/Store/Store";
const ScreenMenu = () => {
  const Stack = createNativeStackNavigator();
  const { token } = useSelector((state) => state.login);
  useEffect(() => {
    const fetchLocalStorageData = async () => {
      const storedData = await getStoredData("data");
      if (storedData) {
        Store.dispatch(setToken(storedData.token));
        return storedData.token;
      }
    };
    fetchLocalStorageData();
  });

  return (
    <Stack.Navigator initialRouteName={token ? "Home" : "Login"}>
      {token ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Completd"
            component={Completd}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Progress"
            component={Progress}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Canceletd"
            component={Canceletd}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Regstration"
            component={Regstration}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
