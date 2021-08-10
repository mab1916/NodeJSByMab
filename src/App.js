import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetApi from './components/GetApi';
import PostApi from './components/PostApi';
import DeleteApi from './components/DeleteApi';
import PutApi from './components/PutApi';

// export default function App() {
//   return (
//     <div>
//       <GetApi />
//       <hr />
//       <PostApi />
//       <hr />
//       <DeleteApi />
//       <hr />
//       <PutApi />
//     </div>
//   );
// }


export default function App() {
  const [flag, setFlag] = useState(true);
  const [students, setStudent] = useState([]);
  const [name, setName] = useState("");
  const [rollno, setRollNo] = useState("");
  const [studentID, setStudentID] = useState(null);
  const [errormsg, setErrorMsg] = useState("");

  // Displaying Data from JSON Data Array By Get Method

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

  // Deleting Data from JSON Data Array By Delete Method

  function deleteStudent(id) {
    axios.delete(`http://localhost:3456/users/${id}`)
      .then(() => {
        getStudentList();
      });
  }


  // Updating Data in JSON Data Array By Put Method

  function updateStudent(id) {
    let list = students[id - 1];
    console.log(list);
    setName(list.name)
    setRollNo(list.rollno)
    setStudentID(list.id)
    setFlag(false);
  }

  function saveStudentUpdate() {
    let data = { name, rollno };
    console.log(data);
    setErrorMsg("");
    if (name !== '' && rollno !== '') {
      axios.put(`http://localhost:3456/users/${studentID}`, data)
        .then(() => {
          getStudentList();
        });
      setFlag(true);
    } else {
      setErrorMsg("Please Fill Both Fields...");
      setFlag(true);
    }
  }

  // Inserting Data in JSON Data Array By Post Method

  function saveStudent() {
    console.log(name, rollno);
    setErrorMsg("");
    if (name !== '' && rollno !== '') {
      let data = { name, rollno };
      axios.post(`http://localhost:3456/users`, data);
      // setFlag(true);
    } else {
      setErrorMsg("Please Fill Both Fields...");
      // setFlag(true);
    }
  }

  return (
    <div>
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
        {
          flag ?
            <button onClick={saveStudent}>Add</button>
            :
            <button onClick={saveStudentUpdate}>Update</button>
        }
        <span style={{ color: 'red', fontSize: 12 }}>{errormsg}</span>
      </form>
      <hr />
      <h2>JSON Api Server Data Table</h2>
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
    </div>
  )
}
