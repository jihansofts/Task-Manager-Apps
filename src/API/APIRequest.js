import axios from "axios";
import { BaseURL } from "../Helper/Config";
import { getAuthHeaders } from "../Utility/AuthUtility";
import { getStoredData } from "../Helper/FormHelper";
const Autheaders = { token: getAuthHeaders() };

export const RegstrationRequest = async (
  firstName,
  lastName,
  email,
  password,
  mobile,
  photo
) => {
  try {
    const result = await axios.post(BaseURL + "/Registrations", {
      firstName,
      lastName,
      email,
      password,
      mobile,
      photo,
    });
    if (result.status === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
