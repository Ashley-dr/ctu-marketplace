/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
function InventoryCounts({ id }) {
  const [inventorySellCounts, setInventorySellCounts] = useState(null);
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
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
    const fetchInventorySellCount = async () => {
      try {
        const result = await axios.get(`${baseUrl}/api/user-products/${id}`);
        setInventorySellCounts(result.data.count);
      } catch (error) {
        console.log("Error fetching the Orders Count.", error);
      }
    };
    fetchInventorySellCount();
    const interval = setInterval(fetchInventorySellCount, 1000);
    return () => clearInterval(interval);
  }, [id]);
  return (
    <div>
      <p className=" bg-[#abf0e917] px-1.5 mx-3 rounded-md">
        {inventorySellCounts}
      </p>
    </div>
  );
}

export default InventoryCounts;
