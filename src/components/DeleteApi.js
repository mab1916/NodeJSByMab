import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DeleteApi() {
    const [students, setStudent] = useState([]);

    useEffect(() => {
        getStudentList();
    }, [])

    function getStudentList() {
        axios.get('http://localhost:3456/users')
            .then((res) => {
                setStudent(res.data)
            });
    }

    function deleteUser(id) {
        axios.delete(`http://localhost:3456/users/${id}`)
            .then(() => {
                getStudentList();
            });
    }

    return (
        <div>
            <h2>Delete Api</h2>
            <table style={{ border: '1px solid' }}>
                <tr style={{ fontWeight: 'bold' }}>
                    <td> ID </td>
                    <td> Name </td>
                    <td> RollNo </td>
                    <td> Actions </td>
                </tr>
                {
                    students.map((student) =>
                        <tr>
                            <td> {student.id} </td>
                            <td> {student.name} </td>
                            <td> {student.rollno} </td>
                            <td>
                                <button type='submit' onClick={() => deleteUser(student.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}