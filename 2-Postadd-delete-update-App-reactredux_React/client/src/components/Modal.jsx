import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostsActions } from "../redux/actions/post";
import { updatePostsActions } from "../redux/actions/post";

const Modal = ({ setModal, selectedPost }) => {
  const [postData, setpostData] = useState({
    title: selectedPost ? selectedPost.title : "",
    description: selectedPost ? selectedPost.description : "",
    image: selectedPost ? selectedPost.image : "",
  });
  const dispatch = useDispatch();

  const onChangepost = (e) => {
    setpostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleShare = () => {
    if (selectedPost) {
      dispatch(updatePostsActions(selectedPost._id, postData));
    } else {
      dispatch(createPostsActions(postData));
    }
    setpostData({ title: "", description: "", image: "" });
    setModal(false);
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className=" bg-white w-[400px] z-50 relative p-8 rounded-lg">
        <button
          onClick={() => setModal(false)}
          className="flex  items-center justify-end w-full cursor-pointer hover:text-black/80"
        >
          Close
        </button>
        <div>
          <h1>{selectedPost ? "Update Post" : "Share Post"}</h1>
          <div className="flex flex-col items-center justify-center gap-2">
            <input
              placeholder="Title"
              type="text"
              name="title"
              className="w-full py-2 px-4 outline-none border-b border-b-black"
              value={postData.title}
              onChange={onChangepost}
            />
            <input
              placeholder="Description"
              type="text"
              name="description"
              className="w-full py-2 px-4 outline-none border-b border-b-black"
              value={postData.description}
              onChange={onChangepost}
            />
            <input
              placeholder="Image url"
              type="url"
              name="image"
              className="w-full py-2 px-4 outline-none border-b border-b-black"
              value={postData.image}
              onChange={onChangepost}
            />
            <button onClick={handleShare} className="btn btn-primary w-full">
              {selectedPost ? "Update" : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
