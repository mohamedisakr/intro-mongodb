const Post = require("./post");

const postByTitle = (title) => {
  const post = Post.findOne({ title }).exec();
  return post;
};

const postsForAuthor = (authorId) => {
  const posts = Post.find({ author: authorId }).exec();
  return posts;
};

const fullPostById = (id) => {
  const post = Post.findById(id).populate("author").exec(); //.exec();
  return post;
};

const allPostsSlim = async (fieldsToSelect) => {
  const posts = await Post.find({}).select(fieldsToSelect).exec();
  return posts;
};

const postByContentLength = (maxContentLength, minContentLength) => {
  const posts = Post.find({
    contentLength: { $gt: minContentLength, $lt: maxContentLength },
  }).exec();
  return posts;
};

const addSimilarPosts = async (postId, similarPosts) => {
  const postToUpdate = await Post.findByIdAndUpdate(
    postId,
    { $push: { similarPosts: { $each: similarPosts } } },
    { new: true }
  ).exec();
  return postToUpdate;
};

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts,
};
