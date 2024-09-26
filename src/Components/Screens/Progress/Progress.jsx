import { View, Text } from "react-native";
import FooterMenu from "../../Menus/FooterMenu";
import HeaderMenu from "../../Menus/HeaderMenu";
import ProgressList from "./ProgressList";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { StatusListRequest } from "../../../API/APIRequest";
import { TaskActions } from "../../TaskHok/TaskActions";
export default function Progress() {
  const { UpdateStatus, deleteTask } = TaskActions();
  const TotalStatus = useSelector((state) => state.totalCount.Total);
  const Task = useSelector((state) => state.task.Progress);
  useEffect(() => {
    (async () => {
      await StatusListRequest("Progress");
    })();
  }, []);
  const sortedStatus = TotalStatus.filter((item) => item._id === "Progress");
  return (
    <View className="flex-1 bg-green-100 w-[100%]">
      <HeaderMenu />
      <View className="flex-1 justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <Text className="text-xl sm:text-2xl md:text-3xl my-4 text-green-600 font-bold">
          Completed Task
        </Text>
        <View className="flex-row flex-wrap justify-center items-center gap-6">
          {sortedStatus?.map((item, index) => (
            <View
              key={index}
              className="flex-col justify-center items-center bg-slate-50 px-2 py-2 rounded-md shadow-lg w-60 sm:w-24 md:w-28 lg:w-32">
              <Text className="text-[18px] sm:text-sm md:text-base text-green-600 font-bold">
                {item._id}
              </Text>
              <Text className="text-[16px] sm:text-sm md:text-base text-green-600 font-bold">
                {item.sum}
              </Text>
            </View>
          ))}
        </View>
        <ProgressList
          data={Task}
          updateStatus={UpdateStatus}
          deleteTask={deleteTask}
        />
      </View>
      <FooterMenu />
    </View>
  );
}
