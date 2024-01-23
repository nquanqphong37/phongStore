const mongoose = require("../../common/database")();

const blogSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    brief: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema, "blogs");
module.exports = BlogModel;
