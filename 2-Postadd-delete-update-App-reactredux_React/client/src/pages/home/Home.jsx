import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePostsActions, getPostsActions } from "../../redux/actions/post";
import Modal from "../../components/Modal";

const Home = () => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const deletePost = (id) => {
    dispatch(deletePostsActions(id));
  };
  useEffect(() => {
    dispatch(getPostsActions());
  }, []);
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 p-2 w-full gap-2">
        {posts?.map((item) => (
          <div
            key={item._id}
            className="w-full p-2 h-[300px] border-black/80 border"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl text-black font-semibold">
                  {item.title}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <span
                  onClick={() => openModal(item)}
                  className="btn btn-primary"
                >
                  Update
                </span>
                <span
                  onClick={() => deletePost(item._id)}
                  className="btn btn-danger"
                >
                  Delete
                </span>
              </div>
            </div>
            <div>
              <img
                className="w-full h-[180px] mt-2 object-cover"
                src={item.image}
                alt="image"
              />
              <div className="flex items-start flex-col gap-2">
                <span className="text-zinc-400">{item.description}</span>
                <span className="text-zinc-400 font-semibold">
                  {new Date(item.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <Modal setModal={setModalOpen} selectedPost={selectedPost} />
      )}
    </div>
  );
};

export default Home;
