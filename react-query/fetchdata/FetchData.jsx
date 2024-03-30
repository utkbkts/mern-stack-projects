import axios from "axios";

export const addData = async (data) => {
  try {
    const newData = await axios.post("/api/contact", data);
    if (newData.data.success === true) {
      console.log(newData.data.message);
    } else {
      console.log(newData.data.message);
    }
    return newData;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getData = async () => {
  try {
    const newData = await axios.get(`/api/contact`);
    return newData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeData = async (_id) => {
  try {
    await axios.delete(`/api/contact/${_id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateData = async (_id, data) => {
  try {
    await axios.put(`/api/contact/${_id}`, data);
  } catch (error) {
    throw new Error(error.message);
  }
};
