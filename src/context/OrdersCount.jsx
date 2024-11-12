/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
function OrdersCount({ id }) {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [orderCounts, setOrderCounts] = useState(null);
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  // const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/");
      // }
      const { data } = await axios.post(
        `${baseUrl}/facultypost`,
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
      // if (!cookies.token) {
      //   navigate("/");
      // }
      const { data } = await axios.post(
        `${baseUrl}/userspost`,
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
    const fetchOrderCount = async () => {
      try {
        const result = await axios.get(`${baseUrl}/api/user-orders/${id}`);
        setOrderCounts(result.data.count);
      } catch (error) {
        console.log("Error fetching the Orders Count.", error);
      }
    };
    fetchOrderCount();
    const interval = setInterval(fetchOrderCount, 1000);
    return () => clearInterval(interval);
  }, [id]);
  return (
    <div>
      {" "}
      <p className=" px-1.2 rounded-md">{orderCounts}</p>
    </div>
  );
}

export default OrdersCount;
