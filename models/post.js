const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      max: 300,
    },
    img: {
      type: String,
    },
    likes: Array,
    default: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', PostSchema);
