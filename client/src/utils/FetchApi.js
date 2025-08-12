import axios from "axios";
export const getdata = async (url, token = null) => {
  try {
    const response = await axios.get(
      url,
      token && {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.response.data.msg);
  }
};
export const post = async (url, data, token = null) => {
  try {
    console.log(data);

    const response = await axios.post(
      url,
      data,
      token && {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.response.data.msg);
  }
};
export const deletedata = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.response.data.msg);
  }
};
export const updatedata = async (url, data) => {
  try {
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.response.data.msg);
  }
};
