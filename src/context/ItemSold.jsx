/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
function ItemSold({ id }) {
  const [inventoryItemSoldCount, setInventoryItemSoldCount] = useState(null);
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const navigate = useNavigate();
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
    const fetchInventorySoldCount = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/api/item-sold/${id}`
        );
        setInventoryItemSoldCount(result.data.count);
      } catch (error) {
        console.log("Error fetching the Orders Count.", error);
      }
    };
    fetchInventorySoldCount();
    const interval = setInterval(fetchInventorySoldCount, 1000);
    return () => clearInterval(interval);
  }, [id]);
  return (
    <div>
      <p className=" bg-[#abf0e917] px-1.5 mx-3 rounded-md">
        {inventoryItemSoldCount}
      </p>
    </div>
  );
}

export default ItemSold;
