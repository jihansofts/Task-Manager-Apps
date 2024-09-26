import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import ButtonCustom from "../../Forms/ButtonCustom";
import HeaderMenu from "../../Menus/HeaderMenu";
import FooterMenu from "../../Menus/FooterMenu";
import { useSelector, useDispatch } from "react-redux";
import {
  ProfileGetRequest,
  ProfileUpdateRequest,
} from "../../../API/APIRequest";
import { removeStoredData } from "../../../Helper/FormHelper";
import * as ImagePicker from "expo-image-picker";
import { setProfileData } from "../../../Redux/State-Slice/ProfileSlice";
const Profile = () => {
  const ProfileData = useSelector((state) => state.profile.ProfileData);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(ProfileData[0]?.firstName);
  const [lastName, setLastName] = useState(ProfileData[0]?.lastName);
  const [mobile, setMobile] = useState(ProfileData[0]?.mobile);
  const [password, setPassword] = useState(ProfileData[0]?.password);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(setProfileData({ photo: result.uri }));
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await ProfileUpdateRequest({
        firstName,
        lastName,
        email,
        mobile,
        password,
        photo: ProfileData[0]?.photo,
      });
      if (response === true) {
        setLoading(false);
        await ProfileGetRequest();
        Alert.alert("Success", "Profile updated successfully");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Profile update failed");
    }
  };
  const handleLogout = () => {
    dispatch(removeStoredData());
    Alert.alert("Logged Out", "You have been logged out successfully.");
  };

  useEffect(() => {
    (async () => {
      await ProfileGetRequest();
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <HeaderMenu />
      <ScrollView className="flex-grow-1 p-10">
        <View className="flex w-[100%] mb-12">
          <Text className="text-2xl text-green-600 font-bold text-center">
            Update Profile
          </Text>
          <View className="my-4 items-center">
            {ProfileData[0]?.photo ? (
              <Image
                source={{ uri: ProfileData[0]?.photo }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            ) : (
              <Image
                source={{ uri: ProfileData[0]?.photo }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            )}
            <TouchableOpacity onPress={handleImageSelect}>
              <Text className="text-green-500 mt-2">Change Profile Photo</Text>
            </TouchableOpacity>
          </View>
          <View className="my-2">
            <Text className="text-[18px] text-green-500 my-2">First Name</Text>
            <TextInput
              className="border-2 bg-white border-green-600 rounded-lg p-2 w-[100%] h-[50px]"
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>
          <View className="my-2">
            <Text className="text-[18px] text-green-500 my-2">Last Name</Text>
            <TextInput
              className="border-2 bg-white border-green-600 rounded-lg p-2 w-[100%] h-[50px]"
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <View className="my-2">
            <Text className="text-[18px] text-green-500 my-2">Email</Text>
            <TextInput
              className="border-2 bg-white border-green-600 rounded-lg p-2 w-[100%] h-[50px]"
              placeholder="Email"
              value={ProfileData[0]?.email}
              editable={false}
            />
          </View>
          <View className="my-2">
            <Text className="text-[18px] text-green-500 my-2">Mobile</Text>
            <TextInput
              className="border-2 bg-white border-green-600 rounded-lg p-2 w-[100%] h-[50px]"
              placeholder="Mobile"
              value={ProfileData[0]?.mobile}
              onChangeText={(text) => setMobile(text)}
            />
          </View>
          <View className="my-2">
            <Text className="text-[18px] text-green-500 my-2">Password</Text>
            <TextInput
              className="border-2 bg-white border-green-600 rounded-lg p-2 w-[100%] h-[50px]"
              placeholder="New Password"
              value={ProfileData[0]?.password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View className="my-2 flex-row gap-2 gap-x-4 justify-center">
            <ButtonCustom
              handleSumit={handleSubmit}
              loading={loading}
              buttonName="Update"
            />

            <ButtonCustom
              // handleSumit={handleLogout}
              loading={false}
              buttonName="Logout"
              buttonStyle="mt-4 bg-red-500"
            />
          </View>
        </View>
      </ScrollView>
      <FooterMenu />
    </SafeAreaView>
  );
};

export default Profile;
