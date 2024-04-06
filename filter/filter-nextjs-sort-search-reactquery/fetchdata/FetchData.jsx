import axios from "axios";

export const AddData = async (data) => {
  try {
    const newData = await axios.post("/api/contacts", data);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

export const GetData = async () => {
  try {
    const newData = await axios.get(`/api/contacts`);
    return newData.data;
  } catch (error) {
    console.log(error);
  }
};

export const RemoveData = async (id) => {
  try {
    const newData = await axios.delete(`/api/contacts/${id}`);
    return newData;
  } catch (error) {
    console.log(error);
  }
};
export const UpdateData = async (id, data) => {
  try {
    const newData = await axios.put(`/api/contacts/${id}`, data);
    return newData;
  } catch (error) {
    console.log(error);
  }
};
