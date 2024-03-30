import axios from "axios";

export const getPostsActions = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:5000/getPosts");
    dispatch({ type: "GET_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPostsActions = (postData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/createPost",
      postData
    );
    dispatch({ type: "CREATE_POST", payload: data });
    console.log("Create Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const updatePostsActions = (id, postData) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `http://localhost:5000/updatePost/${id}`,
      postData
    );
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePostsActions = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/deletePost/${id}`);
    dispatch({ type: "DELETE_POST", payload: id });
    console.log("Delete Successfully");
  } catch (error) {
    console.log(error);
  }
};
