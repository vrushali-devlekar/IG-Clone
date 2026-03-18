const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully.",
    post,
  });

  res.send(file);
}

async function getPostController(req, res) {
  const userId = req.user.id;
  const posts = await postModel.find({
    user: userId,
  });
  console.log(posts);

  res.status(200).json({
    message: "Posts fetched successfully.",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;
  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const isValidUser = post.user === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully",
    post,
  });
}
async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {

    return res.status(404).json({
      message: "Post not found.",
    });
  }

  try {
    const like = await likeModel.create({
      post: postId,
      user: username,
    });

    return res.status(200).json({
      message: "Post liked successfully.",
      like,
    });
  } catch (err) {
    // Duplicate like (unique index on {post, user})
    if (err?.code === 11000) {
      return res.status(409).json({
        message: "Post already liked.",
      });
    }

    return res.status(500).json({
      message: "Failed to like post.",
    });
  }

}
module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController, likePostController
};
