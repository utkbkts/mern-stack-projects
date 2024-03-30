const PostSchema = require("../models/post.js");

const getPosts = async (req, res) => {
  try {
    const getPosts = await PostSchema.find();

    res.status(200).json(getPosts);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const newPosts = await PostSchema.create(req.body);

    res.status(201).json(newPosts);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePosts = await PostSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatePosts);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletePosts = await PostSchema.findByIdAndDelete(id);

    res.status(200).json(deletePosts);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

module.exports = { deletePost, createPost, getPosts, updatePost };
