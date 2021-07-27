const mongoose = require("mongoose");
const Project = require("./project");
const cdnUrl = "https://cdn.adminapp.com";

const orgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subscription: {
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "trialing", "overdue", "canceled"],
    },
    last4: {
      type: Number,
      min: 4,
      max: 4,
    },
  },
});

// add a post remove hook to the org schema that removes all projects associated with the org
orgSchema.post("remove", async function (doc, next) {
  if (doc) {
    const projectsToBeDeleted = await Project.deleteMany({
      org: doc._id,
    });

    console.log("Child delete result: ", projectsToBeDeleted);
  }
  next();
});

module.exports = mongoose.model("org", orgSchema);
