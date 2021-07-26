const Post = require("./post");

const postByTitle = async (title) => {
  const post = await Post.findOne({ title }).exec();
  return post;
};

const postsForAuthor = async (authorId) => {
  const post = await Post.findOne({ author: authorId }).exec();
  return post;
};

const fullPostById = async (id) => {
  const post = await Post.findById(id).exec();
  return post;
};

const allPostsSlim = (fieldsToSelect) => {};

const postByContentLength = async (maxContentLength, minContentLength) => {
  const posts = await Post.find({
    contentLength: { $gt: minContentLength },
    contentLength: { $lt: maxContentLength },
  }).exec();
  return posts;
};

const addSimilarPosts = (postId, similarPosts) => {};

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts,
};
