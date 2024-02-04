import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../static/Employees.css";

function Employees(props) {
  const { getEmp } = props;

  const handleDelete = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    const id = event.target.value;

    Axios.delete(`http://localhost:3001/api/delete/${id}`).then((result) => {
      console.log(result.status);
      window.location.reload();
    });
  };

  return (
    <>
      {getEmp.map((user, index) => {
        return (
          <div key={index}>
            <h1 style={{ margin: "10px" }}>My information</h1>
            <div className="employees">
              <div className="employee">
                <p>{user.name}</p>
                <p>{user.surname}</p>
                <p>{user.position}</p>
                <p>{user.salary}</p>
                <div
                  style={{
                    justifyContent: "flex-end",
                    marginTop: "5px",
                    display: "flex",
                  }}
                >
                  <Link to={`/update/${user.id}`}>
                    <button style={{ margin: "5px" }}>Update</button>
                  </Link>
                  <button
                    style={{ margin: "5px" }}
                    onClick={handleDelete}
                    value={user.id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Employees;
