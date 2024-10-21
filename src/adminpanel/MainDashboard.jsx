/* eslint-disable no-unused-vars */
import React from "react";
import SideNavigation from "./SideNavigation";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SellerApproval from "./SellerApproval";
import AdminDashboard from "./AdminDashboard";
import AccountsToBeSeller from "./AccountsToBeSeller";
import SellerFacultyApproval from "./SellerFacultyApproval";
function MainDashboard() {
  return (
    <div>
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
      </Routes>
    </div>
  );
}

export default MainDashboard;
