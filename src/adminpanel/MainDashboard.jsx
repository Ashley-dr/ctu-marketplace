/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SideNavigation from "./SideNavigation";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import SellerApproval from "./SellerApproval";
import AdminDashboard from "./AdminDashboard";
import AccountsToBeSeller from "./AccountsToBeSeller";
import SellerFacultyApproval from "./SellerFacultyApproval";
import Transactions from "./Transactions";
import axios from "axios";
import { useCookies } from "react-cookie";
function MainDashboard() {
  const [isUsers, setisUser] = useState("");
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);
  const navigate = useNavigate();
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
  }, [baseUrl, cookies, navigate, removeCookies]);
  return (
    <div>
      {isUsers.isAdmin === true ? (
        <>
          <figure className="">
            <SideNavigation />
          </figure>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/SellerApproval/:id" element={<SellerApproval />} />
            <Route path="/AccountToBeSeller" element={<AccountsToBeSeller />} />
            <Route
              path="/SellerFacultyApproval/:id"
              element={<SellerFacultyApproval />}
            />
            <Route path="/Transactions" element={<Transactions />} />
          </Routes>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MainDashboard;
