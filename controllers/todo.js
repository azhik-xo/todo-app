const moment = require("moment");
const Todo = require("../models/todo");

// controllers
const homeController = async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    res.locals.moment = moment;
    res.render("index", { title: "List ToDo", todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addTodoFormController = (req, res, next) => {
  try {
    res.render("add-todo", { title: "Add ToDo" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTodoFormController = async (req, res, next) => {
  try {
    const {id} = req.query;
    const updateTodo = await Todo.findById(id);
    res.render("update-todo", { title: "Update ToDo" , updateTodo});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTodoFormController = (req, res, next) => {
  try {
    const {id} = req.query;
    res.render("delete-todo", { title: "Delete ToDo", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addTodoController = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({ title, description });
    await newTodo.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTodoController = async (req,res,next) => {
  try {
    const {id} = req.params;
    const {title, description} = req.body;
    const updateTodo = await Todo.findById(id); 

    if(!updateTodo){
      return res.status(404).json({message:"todo not found"});
    }

    updateTodo.title = title;
    updateTodo.description = description;
    await updateTodo.save();

    res.redirect("/");
  } catch (err) {
    res.status(500).json({message:err.message});
  }
};

const confirmDeleteTodo = async (req,res,next) =>{
  try {
    const {id, confirm} = req.query;

    if(confirm === "yes"){
      await Todo.findByIdAndDelete(id);
    }

    res.redirect('/');
  } catch (err) {
    res.status(500).json({message:err.message});
  }
}

module.exports = {
  homeController,
  addTodoFormController,
  updateTodoFormController,
  deleteTodoFormController,
  addTodoController,
  updateTodoController,
  confirmDeleteTodo
};
