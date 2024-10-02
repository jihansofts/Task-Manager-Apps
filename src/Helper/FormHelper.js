import AsyncStorage from "@react-native-async-storage/async-storage";
import Store from "../Redux/Store/Store";
import { setProfile } from "../Redux/State-Slice/ProfileSlice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (value) => {
  return emailRegex.test(value);
};

export const getStoredData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};

export const setStoredData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    Store.dispatch(setProfile(value));
  } catch (error) {
    console.log(error);
  }
};
export const setEmail = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
};
export const getEmail = async (key) => {
  try {
    const jsonValue = JSON.parse(await AsyncStorage.getItem(key));
    return jsonValue;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const setOTP = async (value, key) => {
  try {
    let OtpValue = await AsyncStorage.setItem(key, value);
    return OtpValue;
  } catch (error) {
    console.log(error);
  }
};
export const getOTP = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue;
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
