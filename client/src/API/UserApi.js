import { getdata, updatedata, deletedata, post } from "../utils/FetchApi";
const API_URL = "https://backend-1-nima-server.onrender.com/";

export const Singupuser = async (data) => {
  try {
    console.log(data);
    console.log(API_URL);

    const user = await post(`${API_URL}api/users/`, data);
    console.log(user);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
export const Log_in = async (data) => {
  try {
    console.log(data);
    console.log(API_URL);

    const user = await post(`${API_URL}api/users/Login`, data);
    console.log(user);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
