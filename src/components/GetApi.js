import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GetApi() {
    const [students, setStudent] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3456/users')
            .then((res) => {
                setStudent(res.data)
            })
    }, [])

    return (
        <div>
            <h2>Get Api</h2>
            <table style={{ border: '1px solid' }}>
                <tr style={{ fontWeight: 'bold' }}>
                    <td> ID </td>
                    <td> Name </td>
                    <td> RollNo </td>
                </tr>
                {
                    students.map((student) =>
                        <tr>
                            <td> {student.id} </td>
                            <td> {student.name} </td>
                            <td> {student.rollno} </td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}