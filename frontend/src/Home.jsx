import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3000/get')
            .then(res => setTodos(res.data))
            .catch(err => console.log(err))
    };

    const handleEdit = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo._id === id) {
                return { ...todo, done: !todo.done };
            }
            return todo;
        });
        setTodos(updatedTodos);
        axios.put('http://localhost:3000/update/' + id)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };

    const handleAdd = () => {
        axios.post("http://localhost:3000/add", { task: task })
            .then(res => {
                console.log(res);
                fetchTodos();
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/delete/' + id)
            .then((res) => {
                console.log(res);
                fetchTodos();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <h2>Todo List</h2>
            <div>
                <input type="text" className="input" onChange={(e) => { setTask(e.target.value) }} />
                <button className="button" onClick={handleAdd}>Add</button>
            </div>
            {todos.length === 0 ?
                <div><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    <div className="task" key={todo._id}>
                        <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                            <input type="checkbox" className="icon" />
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div><span><button className="icon" onClick={() => handleDelete(todo._id)}>Delete</button></span></div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
