import { getStoredData } from "../Helper/FormHelper";

const getAuthToken = async () => {
  try {
    const data = await getStoredData("data");
    if (data) {
      return data.token;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAuthHeaders = async () => {
  const token = await getAuthToken();
  return {
    headers: {
      token: `${token}`,
    },
  };
};
