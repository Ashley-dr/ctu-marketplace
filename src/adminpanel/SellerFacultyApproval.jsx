/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SellerFacultyApproval() {
  const [facultyData, setFacultyData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/faculty/${id}`)
      .then((result) => {
        setFacultyData(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log("Error to fetch");
      });
  }, [id]);

  const FacultyOnchange = (e) => {
    setFacultyData({ ...facultyData, [e.target.name]: e.target.value });
  };

  const FacultySubmit = (e) => {
    e.preventDefault();
    const data = {
      isFaculty: facultyData.isFaculty,
      isSeller: facultyData.isSeller,
    };
    axios
      .put(`http://localhost:4000/api/facultySellerUpdate/${id}`, data)
      .then((result) => {
        navigate("/AdminDash");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <figure>
        <article>
          {facultyData && (
            <div>
              <p>{facultyData.email}</p>
              <p>{facultyData.username}</p>
              <p>{facultyData.fullname}</p>
              <p>{facultyData.address}</p>
              <p>{facultyData.gender}</p>

              <p>{facultyData.facebook}</p>

              <p>{facultyData.phoneNumber}</p>

              <p>{facultyData.shopDescription}</p>
              <p>{facultyData.gcashNumber}</p>
            </div>
          )}

          <form onSubmit={FacultySubmit}>
            <select
              type="text"
              value={facultyData.isSeller}
              name="isSeller"
              onChange={FacultyOnchange}
            >
              <option value={false}>false</option>
              <option value={true}>true</option>
            </select>
            <input
              type="text"
              value={(facultyData.isFaculty = "Faculty")}
              name="isFaculty"
              onChange={FacultyOnchange}
            />
            <button type="submit">save</button>
          </form>
        </article>
      </figure>
    </div>
  );
}

export default SellerFacultyApproval;
