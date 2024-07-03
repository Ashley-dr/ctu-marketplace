/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SellerApproval() {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/users/${id}`)
      .then((result) => {
        setUserData(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log("Error to fetch");
      });
  }, [id]);

  const userOnchange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const userSubmit = (e) => {
    e.preventDefault();
    const data = {
      isUser: userData.isUser,
      isSeller: userData.isSeller,
    };
    axios
      .put(`http://localhost:4000/api/usersSellerUpdate/${id}`, data)
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
          {userData ? (
            <div>
              <p>{userData.email}</p>
              <p>{userData.username}</p>
              <p>{userData.fullname}</p>
              <p>{userData.address}</p>
              <p>{userData.gender}</p>
              <p>{userData.department}</p>
              <p>{userData.facebook}</p>
              <p>{userData.course}</p>
              <p>{userData.phoneNumber}</p>

              <p>{userData.shopDescription}</p>
              <p>{userData.gcashNumber}</p>
            </div>
          ) : (
            <></>
          )}

          <form onSubmit={userSubmit}>
            <select
              type="text"
              value={userData.isSeller}
              name="isSeller"
              onChange={userOnchange}
            >
              <option value={false}>false</option>
              <option value={true}>true</option>
            </select>
            <input
              type="text"
              value={(userData.isUser = "Student")}
              name="isUser"
              onChange={userOnchange}
              hidden
            />

            <button type="submit">save</button>
          </form>
        </article>
      </figure>
    </div>
  );
}

export default SellerApproval;
