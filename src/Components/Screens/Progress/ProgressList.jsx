import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import UpdateStatusModel from "../Model/UpdateStatusModel";
const ProgressList = ({ data, updateStatus, deleteTask }) => {
  const [modal, setModal] = useState(false);
  const newData = data.filter((item) => item.status === "Progress");
  return (
    <View className="flex-1 gap-2">
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingBottom: 20,
            gap: 10,
          }}>
          {newData.length > 0 ? (
            <View className=" flex-row flex-wrap justify-between gap-1">
              {newData.map((item, index) => (
                <View
                  key={index}
                  className="bg-white rounded-lg shadow-md w-[48%] sm:w-[48%] md:w-[30%] lg:w-[23%] h-[120px] p-3">
                  <Text className="font-bold text-base">{item.title}</Text>
                  <Text className="text-gray-500 text-xs">
                    {item.description}
                  </Text>
                  <Text className="text-orange-500 text-xs mt-1">
                    {moment(item.date).format("DD-MM-YYYY")}
                  </Text>
                  <View className="flex-row justify-between items-center mt-2">
                    <View className="bg[#CB0C9F] p-1 md:w-[40px] md:h-[20px] sm:w-[30px] sm:h-[16px] rounded flex justify-center items-center">
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

export default ProgressList;
