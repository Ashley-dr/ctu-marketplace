/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";

import Signup from "./pages/Signup";
import Navigation from "./components/Navigation";
import { UserContextProvider } from "../backend/Context/userContext";
import Account from "./pages/Account";
import BecomeSeller from "./pages/BecomeSeller";
import AdminDashboard from "./pages/AdminDashboard";
import SellerApproval from "./pages/SellerApproval";
import AccountsToBeSeller from "./pages/AccountsToBeSeller";
import SellerFacultyApproval from "./pages/SellerFacultyApproval";
import AddProducts from "./pages/AddProducts";
import FacultyAddProducts from "./pages/FacultyAddProducts";
import ProductId from "./pages/ProductId";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <header className="w-full">
          <Navigation />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Signup" element={<Signup />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/AdminDash" element={<AdminDashboard />} />
          <Route path="/BecomeSeller/:id" element={<BecomeSeller />} />
          <Route path="/SellerApproval/:id" element={<SellerApproval />} />
          <Route
            path="/SellerFacultyApproval/:id"
            element={<SellerFacultyApproval />}
          />
          <Route path="/Transactions/:id" element={<Transactions />} />
          <Route path="/Inventory/:id" element={<Inventory />} />
          <Route path="/Orders/:id" element={<Orders />} />
          <Route path="/AddProducts/:id" element={<AddProducts />} />
          <Route
            path="/FacultyAddProducts/:id"
            element={<FacultyAddProducts />}
          />
          <Route path="/AccountsToBeSeller" element={<AccountsToBeSeller />} />
          <Route path="/ProductId/:id" element={<ProductId />} />
        </Routes>
        <footer></footer>
      </Router>
    </UserContextProvider>
  );
}

export default App;
