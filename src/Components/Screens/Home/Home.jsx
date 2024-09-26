import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import FooterMenu from "../../Menus/FooterMenu";
import HeaderMenu from "../../Menus/HeaderMenu";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  TotalStatusRequest,
  StatusListRequest,
  AddTaskRequest,
} from "../../../API/APIRequest";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import NewList from "./NewList";
import AddUpdateModel from "../../Screens/Model/AddUpdateModel";
import { TaskActions } from "../../TaskHok/TaskActions";
const { width } = Dimensions.get("window");

const Home = () => {
  const { UpdateStatus, deleteTask } = TaskActions();
  const TotalStatus = useSelector((state) => state.totalCount.Total);
  const Task = useSelector((state) => state.task.newAll);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const AddTask = async () => {
    let res = await AddTaskRequest(title, description);
    if (res === true) {
      Alert.alert("Task Added Successfully");
      setModalVisible(false);
      setTitle("");
      setDescription("");
      await TotalStatusRequest();
      await StatusListRequest("New");
    }
  };

  useEffect(() => {
    (async () => {
      await TotalStatusRequest();
      await StatusListRequest("New");
    })();
  }, []);

  const order = ["New", "Completed", "Progress", "Canceled"];
  const sortedStatus = [...TotalStatus].sort((a, b) => {
    return order.indexOf(a._id) - order.indexOf(b._id);
  });

  return (
    <View className="flex-1 bg-green-100 w-[100%]">
      <HeaderMenu />
      <View className="flex-1 justify-between px-4 sm:px-6 md:px-8 lg:px-12 relative">
        <Text className="text-xl sm:text-2xl md:text-3xl my-4 text-green-600 font-bold">
          Dashboard New Task
        </Text>
        <View className="flex-row flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {sortedStatus?.map((item, index) => (
            <View
              key={index}
              className="flex-col justify-center items-center bg-slate-50 px-2 py-2 rounded-md shadow-lg w-40 sm:w-24 md:w-28 lg:w-32">
              <Text className="text-[16px] sm:text-sm md:text-base text-green-600 font-bold">
                {item._id}
              </Text>
              <Text className="text-[14px] sm:text-sm md:text-base text-green-600 font-bold">
                {item.sum}
              </Text>
            </View>
          ))}
        </View>
        <NewList
          data={Task}
          updateStatus={UpdateStatus}
          deleteTask={deleteTask}
        />
        <Pressable
          className="bg-green-600 rounded-full w-[50px] h-[50px] flex justify-center items-center absolute bottom-5 right-5"
          onPress={() => setModalVisible(true)}>
          <FontAwesome5Icon name="plus" size={20} color="#ffffff" />
        </Pressable>
      </View>
      <AddUpdateModel
        AddTask={AddTask}
        setTitle={setTitle}
        title={title}
        description={description}
        setDescription={setDescription}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <FooterMenu />
    </View>
  );
};

export default Home;
