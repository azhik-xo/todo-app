const mongoose = require("mongoose");

// todo schema
const todoData = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
      minlength: 3,
      trim: true,
    },
    description: { type: String, required:true},
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoData);


module.exports=Todo;