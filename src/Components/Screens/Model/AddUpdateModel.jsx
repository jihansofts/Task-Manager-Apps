import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
const AddUpdateModel = ({
  setModalVisible,
  modalVisible,
  setDescription,
  description,
  title,
  setTitle,
  AddTask,
}) => {
  return (
    <Modal transparent={true} visible={modalVisible} animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-lg w-[90%] p-6">
          <TouchableOpacity
            className="absolute top-2 right-2"
            onPress={() => setModalVisible(false)}>
            <Text className="text-red-500 text-lg">✕</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-center mb-4">
            Add or Update Task
          </Text>
          <TextInput
            className="border border-green-300 rounded-lg p-3 mb-4"
            placeholder="Enter Task"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            className="border border-green-300 rounded-lg p-3 mb-4"
            placeholder="Enter Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline
          />
          <TouchableOpacity
            className="bg-green-500 rounded-lg p-4"
            onPress={() => {
              AddTask();
            }}>
            <Text className="text-white text-center font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default AddUpdateModel;
