/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useContext } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function Account() {
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const [facultyData, setFacultyData] = useState([]);

  const navigate = useNavigate();

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });
  useEffect(() => {
    const verifyCookie = async () => {

      if (!cookies.token) {
        navigate("/");
      }
      
      const { data } = await axios.post(
        "http://localhost:4000/facultypost",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setisFaculty(user);

      return status;
    };
    verifyCookie();
  }, [cookies, navigate, removeCookies]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/");
      }
      const { data } = await axios.post(
        "http://localhost:4000/userspost",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setisUser(user);

      return status;
    };
    verifyCookie();
  }, [cookies, navigate, removeCookies]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/faculty")
      .then((result) => {
        setFacultyData(result.data);
      })
      .catch((err) => {
        console.log("Error to fetch Users: ", err);
      });
  }, []);

  return (
    <div>
      {isFaculty ? (
        <>
          <p>{isFaculty.email}</p>
          <p>{isFaculty.username}</p>
          <p>{isFaculty.fullname}</p>
          <p>{isFaculty.facebook}</p>
          <p>{isFaculty.createdAt}</p>
          {/* <img src={isFaculty.image} />
          <img src={isFaculty.validId} />
          <img src={isFaculty.shopImage} /> */}
        </>
      ) : (
        <></>
      )}
      {isUsers ? (
        <>
          {/* <p>{isUsers.id}</p> */}
          <p>{isUsers.email}</p>
          <p>{isUsers.username}</p>
          <p>{isUsers.fullname}</p>
          <p>{isUsers.facebook}</p>
          <p>{isUsers.department}</p>
          <p>{isUsers.createdAt}</p>
          <p>{isUsers.phoneNumber}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Account;
