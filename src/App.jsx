/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";

import Navigation from "./components/Navigation";
import { UserContextProvider } from "../backend/Context/userContext";
import Account from "./tabs/Account";
import BecomeSeller from "./tabs/BecomeSeller";
import AdminDashboard from "./adminpanel/AdminDashboard";
import SellerApproval from "./adminpanel/SellerApproval";
import AccountsToBeSeller from "./adminpanel/AccountsToBeSeller";
import SellerFacultyApproval from "./adminpanel/SellerFacultyApproval";
import AddProducts from "./tabs/AddProducts";
import FacultyAddProducts from "./tabs/FacultyAddProducts";
import ProductId from "./pages/ProductId";
import Orders from "./tabs/Orders";
import Inventory from "./tabs/Inventory";
import Transactions from "./tabs/Transactions";
import Footer from "./components/Footer";
import MainDashboard from "./adminpanel/MainDashboard";
import UserAccount from "./tabs/UserAccount";
import UserInventory from "./tabs/UserInventory";

import FacultyAccount from "./tabs/FacultyAccount";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <header className="w-full">
          <Navigation />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Account" element={<Account />} />
          <Route path="/UserAccount/:email" element={<UserAccount />} />
          <Route path="/FacultyAccount/:email" element={<FacultyAccount />} />
          <Route path="/MainAdmDash/*" element={<MainDashboard />} />
          <Route path="/BecomeSeller/:id" element={<BecomeSeller />} />
          {/* <Route path="/SellerApproval/:id" element={<SellerApproval />} /> */}
          {/* <Route
            path="/SellerFacultyApproval/:id"
            element={<SellerFacultyApproval />}
          /> */}
          <Route path="/Transactions/:id" element={<Transactions />} />
          <Route path="/Inventory/:id" element={<Inventory />} />
          <Route path="/UserInventory/:id" element={<UserInventory />} />

          <Route path="/Orders/:id" element={<Orders />} />
          <Route path="/AddProducts/:id" element={<AddProducts />} />
          <Route
            path="/FacultyAddProducts/:id"
            element={<FacultyAddProducts />}
          />
          <Route path="/AccountsToBeSeller" element={<AccountsToBeSeller />} />
          <Route path="/ProductId/:id" element={<ProductId />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </Router>
    </UserContextProvider>
  );
}

export default App;
