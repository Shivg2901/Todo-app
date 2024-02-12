import React, { useState } from "react";
import axios from "axios";

function Create() {
    const [todo, setTodo] = useState("")
    const handleAdd = () => {
        axios.post("http://localhost:3000/add", { task: todo })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
    return (
        <div>
            <input type="text" className="input" onChange={(e) => { setTodo(e.target.value) }}></input>
            <button className="button" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create