const express = require("express");
const morgan = require("morgan");
const connect = require("../connect");
const { json, urlencoded } = require("body-parser");
const app = express();
const Todo = require("./todo");
const uri = "mongodb://localhost:27017/intro-mongodb-testing";

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", async (req, res) => {
  res.status(200).json("Welcome to my app");
});

app.get("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const noteToBeRead = await Todo.findById(todoId).lean().exec();
  res.status(200).json(noteToBeRead);
});

app.get("/todos", async (req, res) => {
  const allTodos = await Todo.find({}).lean().exec();
  res.status(200).json(allTodos);
});

app.post("/todos", async (req, res) => {
  const todoToCreate = req.body; //.todo;
  const savedTodo = await Todo.create(todoToCreate);
  res.status(201).json(savedTodo);
});

connect(uri)
  .then(() =>
    app.listen(4000, () => {
      console.log("server on http://localhost:4000");
    })
  )
  .catch((e) => console.error(e));
