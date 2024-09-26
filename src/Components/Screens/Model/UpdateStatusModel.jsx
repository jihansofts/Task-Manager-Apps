import { View, Text, Modal, Pressable, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
const { width } = Dimensions.get("window");

const UpdateStatusModel = ({ setModal, modal, updateStatus, data }) => {
  const [selectedValue, setSelectedValue] = useState(data.status);
  useEffect(() => {
    setSelectedValue(data.status);
  }, [data.status]);

  const handleSave = async () => {
    const status = selectedValue;
    const result = await updateStatus(data._id, status);
    if (result) {
      setModal(false);
    }
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}>
        <View className="flex-1 justify-center items-center bg-black/10">
          <View className="bg-white rounded-lg w-[80%] p-6 items-center">
            <Text className="text-lg font-bold mb-4">Status Update</Text>
            <View className="w-[75%] bg-[#F48E16] rounded-lg p-2 mb-4">
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                style={{ height: 40 }}>
                <Picker.Item label="New" value="New" />
                <Picker.Item label="Completed" value="Completed" />
                <Picker.Item label="Progress" value="Progress" />
                <Picker.Item label="Canceled" value="Canceled" />
              </Picker>
            </View>
            <View className="flex-row justify-between w-[80%] gap-2">
              {/* Save Button */}
              <Pressable
                onPress={handleSave}
                className="bg-green-500 rounded-lg p-2">
                <Text className="text-white font-bold">Save</Text>
              </Pressable>

              {/* Close Button */}
              <Pressable
                onPress={() => setModal(false)}
                className="bg-orange-500 rounded-lg p-2">
                <Text className="text-white font-bold">Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UpdateStatusModel;
