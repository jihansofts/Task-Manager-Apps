import axios from "axios";
import { setData, setToken, logout } from "../Redux/State-Slice/LoginSlice";
import { setTotalCount } from "../Redux/State-Slice/TotalCountSlice";
import {
  setNewTasks,
  setCompled,
  setProgress,
  setCanceled,
} from "../Redux/State-Slice/TaskSlice";
import { setProfile } from "../Redux/State-Slice/ProfileSlice";
import { setStoredData, removeStoredData } from "../Helper/FormHelper";
import { getAuthHeaders } from "../Utility/AuthUtility";
import Store from "../Redux/Store/Store";
let BaseURL = "https://task-management-backend-ep6l.onrender.com/api/v1";
export const LoginRequest = async (email, password) => {
  try {
    const { data } = await axios.post(`${BaseURL}/Logins`, {
      email,
      password,
    });
    if (data.status === "success") {
      await setStoredData("data", data);
      Store.dispatch(setData(data));
      Store.dispatch(setToken(data.token));
      return true;
    } else if (data.status === "fail") {
      Store.dispatch(setData());
      Store.dispatch(setToken(""));
      return false;
    }
  } catch (error) {
    console.log("Login error:", error);
    return false;
  }
};

export const TotalStatusRequest = async () => {
  try {
    const headers = await getAuthHeaders();
    let URL = `${BaseURL}/TaskStausCount`;
    const { data } = await axios.get(URL, headers);
    if (data.status === "success") {
      Store.dispatch(setTotalCount(data["data"]));
      return true;
    }
  } catch (error) {
    console.log("TotalStatusRequest error:", error);
    return false;
  }
};

export const StatusListRequest = async (status) => {
  try {
    const headers = await getAuthHeaders();
    let URL = `${BaseURL}/ListTaskByStatus/${status}`;
    const { data } = await axios.get(URL, headers);
    if (data.status === "Success") {
      if (status === "New") {
        Store.dispatch(setNewTasks(data["data"]));
      } else if (status === "Completed") {
        Store.dispatch(setCompled(data["data"]));
      } else if (status === "Progress") {
        Store.dispatch(setProgress(data["data"]));
      } else if (status === "Canceled") {
        Store.dispatch(setCanceled(data["data"]));
      }

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("StatusListRequest error:", error);
    return false;
  }
};

export const AddTaskRequest = async (title, description) => {
  try {
    const headers = await getAuthHeaders();
    let URL = `${BaseURL}/CreateTask`;
    const { data } = await axios.post(
      URL,
      { title: title, description: description, status: "New" },
      headers
    );
    if (data.status === "Success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("AddTaskRequest error:", error);
    return false;
  }
};

export const UpdateTaskRequest = async (id, status) => {
  try {
    const headers = await getAuthHeaders();
    let URL = `${BaseURL}/UpdateTask/${id}/${status}`;
    const { data } = await axios.put(URL, {}, headers);
    if (data.status === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("UpdateTaskRequest error:", error);
    return false;
  }
};

export const DeleteTaskRequest = async (id) => {
  try {
    const headers = await getAuthHeaders();
    let URL = `${BaseURL}/DeleteTask/${id}`;
    const { data } = await axios.delete(URL, headers);
    if (data.status === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("DeleteTaskRequest error:", error);
    return false;
  }
};

export const ProfileGetRequest = async () => {
  try {
    const headers = await getAuthHeaders();
    let URL = `${BaseURL}/UserProfileDetails`;
    const { data } = await axios.get(URL, headers);
    if (data.status === "success") {
      Store.dispatch(setProfile(data["data"]));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ProfileGetRequest error:", error);
    return false;
  }
};

export const ProfileUpdateRequest = async (updatedFields) => {
  try {
    const headers = await getAuthHeaders();
    let URL = `${BaseURL}/UpdateProfiles`;
    const { data } = await axios.put(URL, updatedFields, headers);
    if (data.status === "success") {
      Store.dispatch(setData(data["data"]));
      if (data.token) {
        Store.dispatch(setToken(data.token));
      }
      if (updatedFields.password) {
        await removeStoredData("data");
        Store.dispatch(logout());
        return true;
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ProfileUpdateRequest error:", error);
    return false;
  }
};

// export const ProfileUpdateRequest = async (updatedFields) => {
//   try {
//     const headers = await getAuthHeaders();
//     let URL = `${BaseURL}/UpdateProfiles`;
//     console.log(updatedFields, "updatedFields");
//     const { data } = await axios.put(URL, updatedFields, headers);
//     if (data.status === "success") {
//       await setStoredData("data", data);
//       Store.dispatch(setData(data));
//       Store.dispatch(setToken(data.token));
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.log("ProfileUpdateRequest error:", error);
//     return false;
//   }
// };
