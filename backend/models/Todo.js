import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  isDone: Boolean,
});

export const Todo = model("Todo", schema);
