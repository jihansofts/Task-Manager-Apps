import { Alert } from "react-native";
import {
  DeleteTaskRequest,
  UpdateTaskRequest,
  StatusListRequest,
  TotalStatusRequest,
} from "../../API/APIRequest";

export const TaskActions = () => {
  const UpdateStatus = async (id, status) => {
    try {
      let res = await UpdateTaskRequest(id, status);
      if (res === true) {
        await TotalStatusRequest();
        await StatusListRequest("New");
        await StatusListRequest("Completed");
        await StatusListRequest("Progress");
        await StatusListRequest("Canceled");
        Alert.alert("Task updated successfully");
        return true;
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      return false;
    }
  };

  const deleteTask = async (id) => {
    let res = await DeleteTaskRequest(id);
    if (res === true) {
      Alert.alert("Task deleted successfully");
      await TotalStatusRequest();
      await StatusListRequest("New");
      await StatusListRequest("Completed");
      await StatusListRequest("Progress");
      await StatusListRequest("Canceled");
      return true;
    }
    return false;
  };

  return { UpdateStatus, deleteTask };
};
