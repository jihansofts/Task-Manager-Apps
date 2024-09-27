import AsyncStorage from "@react-native-async-storage/async-storage";
import { setData } from "../Redux/State-Slice/LoginSlice";
import Store from "../Redux/Store/Store";

export const getStoredData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // console.log(jsonValue, "jsonValue");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};

export const setStoredData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    Store.dispatch(setData(value));
  } catch (error) {
    console.log(error);
  }
};

export const removeStoredData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
