const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
    },
    social: {
      twitter: {
        type: String,
        unique: true,
        sparse: true,
      },
      linkedin: {
        type: String,
        unique: true,
        sparse: true,
      },
    },
  },
  { timestamps: true }
);

// authorSchema.add({
//   author
// })

module.exports = mongoose.model("author", authorSchema);
