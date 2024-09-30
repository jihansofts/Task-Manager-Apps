import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import { useDispatch } from "react-redux";
import UpdateStatusModel from "../Model/UpdateStatusModel";
const { width } = Dimensions.get("window");
const NewList = ({ data, updateStatus, deleteTask }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const newData = data.filter((item) => item.status === "New");

  //   const deleteTask = async (id) => {
  //     try {
  //       const res = await DeleteTaskRequest(id);
  //       if (res) {
  //         const filteredData = data.filter((item) => item.id !== id);
  //         dispatch(setNewAll(filteredData));
  //         console.log("Task deleted successfully");
  //       } else {
  //         console.error("Error deleting task");
  //       }
  //     } catch (error) {
  //       console.error("Error occurred while deleting task: ", error);
  //     }
  //   };

  return (
    <View className="flex-1">
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingBottom: 20,
            gap: 10,
          }}>
          {newData.length > 0 ? (
            <View className="flex-row flex-wrap justify-between">
              {newData.map((item, index) => (
                <View
                  key={index}
                  className="bg-white rounded-lg shadow-md w-[48%] h-[120px] p-[10px] mb-4">
                  <Text className="font-bold text-base">{item.title}</Text>
                  <Text className="text-gray-500 text-xs">
                    {item.description}
                  </Text>
                  <Text className="text-orange-500 text-xs mt-1">
                    {moment(item.date).format("DD-MM-YYYY")}
                  </Text>
                  <View className="flex-row justify-between items-center mt-2">
                    <View className="bg-[#CB0C9F] w-[30px] h-[20px] rounded flex justify-center items-center">
                      <Text className="text-white font-bold text-[8px]">
                        {item.status}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setModal(true)}
                      className="bg-orange-500 w-[30px] h-[20px] rounded flex justify-center items-center">
                      <FontAwesome5 name="edit" size={10} color="#ffffff" />
                    </TouchableOpacity>
                    <UpdateStatusModel
                      setModal={setModal}
                      modal={modal}
                      updateStatus={updateStatus}
                      data={item}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert("Delete", "Are you sure?", [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          { text: "OK", onPress: () => deleteTask(item._id) },
                        ])
                      }
                      className="bg-red-500 w-[20px] h-[20px] rounded flex justify-center items-center">
                      <FontAwesome5 name="trash" size={10} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-center mt-[50%] text-green-600">
              Loading.....
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default NewList;
