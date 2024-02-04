import React from 'react'
import Axios from 'axios'
import '../static/InsertEmp.css'
import Navbar from './Navbar'

function InsertEmp() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const surname = event.target.surname.value;
        const position = event.target.position.value;
        const salary = event.target.salary.value;
        Axios.post("http://localhost:3001/api/insert", {
            name: name,
            surname: surname,
            position: position,
            salary: salary
        }).then(() => {
            alert("success");
            window.location.href = '/';
        })
    }

  return (
    <>
    <div>
        <h1 style={{margin: 10}}>Insert information of new employee</h1>
        <div className='form-box'>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" placeholder='Name' name="name" />
                <label>Surname</label>
                <input type="text" placeholder='Surname' name="surname" />
                <label>Position</label>
                <input type="text" placeholder='Position' name="position" />
                <label>Salary</label>
                <input type="text" placeholder='Salary' name="salary" />
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default InsertEmp