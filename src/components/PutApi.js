import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PutApi() {
    const [students, setStudent] = useState([]);
    const [name, setName] = useState("");
    const [rollno, setRollNo] = useState("");
    const [studentID, setStudentID] = useState(null);

    useEffect(() => {
        getStudentList();
    }, [])

    function getStudentList() {
        axios.get('http://localhost:3456/users')
            .then((res) => {
                setStudent(res.data)
                setName(res[0])
                setRollNo(res[0])
                setStudentID(res[0])
            });
    }

    function deleteStudent(id) {
        axios.delete(`http://localhost:3456/users/${id}`)
            .then(() => {
                getStudentList();
            });
    }

    function updateStudent(id) {
        let list = students[id - 1];
        console.log(list);
        setName(list.name)
        setRollNo(list.rollno)
        setStudentID(list.id)
    }

    function saveStudentUpdate() {
        // console.log( name, rollno, studentID );
        // axios.delete(`http://localhost:3456/users/${id}`)
        let data = { name, rollno };
        console.log(data);
        axios.put(`http://localhost:3456/users/${studentID}`, data)
            .then(() => {
                getStudentList();
            });
    }

    return (
        <div>
            <h2>Put Api</h2>
            <table style={{ border: '1px solid' }}>
                <tr style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    <td> ID </td>
                    <td> Name </td>
                    <td> RollNo </td>
                    <td colSpan={2}> Actions </td>
                </tr>
                {
                    students.map((student, index) =>
                        <tr key={index}>
                            <td> {student.id} </td>
                            <td> {student.name} </td>
                            <td> {student.rollno} </td>
                            <td>
                                <button type='submit' onClick={() => deleteStudent(student.id)}>
                                    Delete
                                </button>
                                <button type='submit' onClick={() => updateStudent(student.id)}>
                                    Update
                                </button>
                            </td>
                        </tr>
                    )
                }
            </table>
            <form>
                <label>
                    Student Name:
                    <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                </label>
                <br />
                <label>
                    Student RollNo:
                    <input type="text" name="rollno" value={rollno} onChange={(e) => { setRollNo(e.target.value) }} />
                </label>
                <br />
                <button type="submit" onClick={saveStudentUpdate}>Update</button>
            </form>
        </div>
    )
}