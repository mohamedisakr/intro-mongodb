const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 1200,
    },
    contentLength: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    similarPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  { timestamps: true }
);

// postSchema.add({
//   similarPosts: [postSchema],
// });

module.exports = mongoose.model("post", postSchema);
