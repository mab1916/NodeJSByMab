import React, { useState } from 'react';
import axios from 'axios';

export default function PostApi() {
    const [name, setName] = useState("");
    const [rollno, setRollNo] = useState("");

    function saveStudent() {
        console.log( name, rollno );
        let data = { name, rollno };
        axios.post(`http://localhost:3456/users`, data);
    }

    return (
        <div>
            <h2>Post Api</h2>
            <form>
                <label>
                    Student Name:
                    <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                </label>
                <br />
                <label>
                    Student RollNo:
                    <input type="number" name="rollno" value={rollno} onChange={(e) => { setRollNo(e.target.value) }} />
                </label>
                <br />
                <button type="submit" onClick={saveStudent}>Add</button>
            </form>
        </div>
    )
}