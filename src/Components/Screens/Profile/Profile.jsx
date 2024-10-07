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
import HeaderMenu from "../../Menus/HeaderMenu";
import FooterMenu from "../../Menus/FooterMenu";
import { useSelector, useDispatch } from "react-redux";
import {
  ProfileGetRequest,
  ProfileUpdateRequest,
} from "../../../API/APIRequest";
import { removeStoredData } from "../../../Helper/FormHelper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { setProfile } from "../../../Redux/State-Slice/ProfileSlice";
import { logout } from "../../../Redux/State-Slice/LoginSlice";
const Profile = ({ navigation }) => {
  const ProfileData = useSelector((state) => state.profile.ProfileData);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(ProfileData[0]?.firstName);
  const [lastName, setLastName] = useState(ProfileData[0]?.lastName);
  const [photo, setPhoto] = useState(ProfileData[0]?.photo);
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
      const imageUri = result.assets[0].uri;
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const base64ImageData = `data:image/jpeg;base64,${base64Image}`;
      setPhoto(base64ImageData);
      dispatch(setProfile({ photo: base64ImageData }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const updatedFields = {};
    if (firstName !== ProfileData[0]?.firstName) {
      updatedFields.firstName = firstName;
    }
    if (lastName !== ProfileData[0]?.lastName) {
      updatedFields.lastName = lastName;
    }
    if (mobile !== ProfileData[0]?.mobile) {
      updatedFields.mobile = mobile;
    }
    if (password !== ProfileData[0]?.password) {
      updatedFields.password = password;
    }
    if (photo !== ProfileData[0]?.photo) {
      updatedFields.photo = photo;
    }
    try {
      if (Object.keys(updatedFields).length > 0) {
        const response = await ProfileUpdateRequest(updatedFields);
        if (response === true) {
          setLoading(false);
          await ProfileGetRequest();
          Alert.alert("Profile updated successfully");
        }
      } else {
        setLoading(false);
        Alert.alert("No changes", "No fields were updated");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(error, "Profile update failed");
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    removeStoredData("data");
    Alert.alert("Logged Out", "You have been logged out successfully.");
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
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
            {photo ? (
              <Image
                source={{ uri: photo }}
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
              value={mobile}
              onChangeText={(text) => setMobile(text)}
            />
          </View>
          <View className="my-2">
            <Text className="text-[18px] text-green-500 my-2">Password</Text>
            <TextInput
              className="border-2 bg-white border-green-600 rounded-lg p-2 w-[100%] h-[50px]"
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View className="my-2 flex-row  gap-x-4 gap-y-2 justify-center items-center">
            <TouchableOpacity className="bg-green-600 rounded-lg p-2 w-[45%] mt-5 h-[45px] flex justify-center items-center">
              <Text
                className="text-white text-[18px] font-bold "
                onPress={() => (loading ? null : handleSubmit())}>
                Update
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-green-600 rounded-lg p-2 w-[45%] mt-5 h-[45px] flex justify-center items-center">
              <Text
                className="text-red-600 text-[18px] font-bold "
                onPress={() => handleLogout()}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <FooterMenu />
    </SafeAreaView>
  );
};

export default Profile;
