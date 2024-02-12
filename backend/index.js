const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:qkp2e3HD4319AEC3@cluster0.xcouclx.mongodb.net/todo-app")

app.get("/get", (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
})

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    TodoModel.findById(id)
        .then(todo => {
            todo.done = !todo.done;
            return todo.save();
        })
        .then(updatedTodo => res.json(updatedTodo))
        .catch(err => res.json(err));
});

app.post("/add", (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(res => res.json(res))
        .catch(err => res.json(err))
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})
