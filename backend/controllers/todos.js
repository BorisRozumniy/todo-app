import { Todo } from "../models/Todo.js";

export const create = async (req, res) => {
  try {
    const { title, isDone } = req.body;
    const existing = await Todo.findOne({ title });
    if (existing) {
      const message = `Task ${title} already exists`;
      console.log(message);
      return res.status(400).json({ message });
    }
    const newTodo = new Todo({ title, isDone });
    await newTodo.save();
    const message = `Task ${title} created successfully`;

    res.status(201).json({ todo: newTodo, message });
    console.log(message);
  } catch (error) {
    console.log(`error: `, error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

export const read = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

export const update = async (req, res) => {
  try {
    const { title } = req.body;
    // const existing = await Todo.findOne({ title });
    // if (existing) {
    //   const message = `Task ${title} already exists`;
    //   console.log(message);
    //   return res.status(400).json({ message });
    // }
    await Todo.findByIdAndUpdate(req.params.id, req.body);
    const message = `Task ${title} changed successfully`;
    console.log(message);
    res.json({
      editedTodo: req.body,
      message,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

export const remove = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    const message = `Task ${req.body.title} removed successfully`;
    console.log(message);
    res.json({
      deletedTodo,
      message,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};
