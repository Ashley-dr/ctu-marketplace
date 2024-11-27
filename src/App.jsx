/* eslint-disable no-unused-vars */

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import { Box, useColorModeValue } from "@chakra-ui/react";
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
import ChatPage from "./tabs/ChatPage";
import Users from "./pages/Users";
import ContactList from "./tabs/ContactList";
import UsersMessage from "./pages/UsersMessage";
import HelpFooter from "./components/HelpFooter";

function App() {
  const bgColor = useColorModeValue("brand.light", "brand.dark");
  return (
    <Box bg={bgColor}>
      <header className="w-full pb-16">
        <Navigation />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HelpFooter" element={<HelpFooter/>}/>
        <Route path="/Account" element={<Account />} />
        <Route path="/UserAccount/:email" element={<UserAccount />} />
        <Route path="/FacultyAccount/:email" element={<FacultyAccount />} />
        <Route path="/MainAdmDash/*" element={<MainDashboard />} />
        <Route path="/BecomeSeller/:id" element={<BecomeSeller />} />
        <Route path="/Transactions/:id" element={<Transactions />} />
        <Route path="/Inventory/:id" element={<Inventory />} />
        <Route path="/UserInventory/:id" element={<UserInventory />} />
        <Route path="/ChatPage" element={<ChatPage />} />
        <Route path="/Orders/:id" element={<Orders />} />
        <Route path="/AddProducts/:id" element={<AddProducts />} />
        <Route
          path="/FacultyAddProducts/:id"
          element={<FacultyAddProducts />}
        />
        <Route path="/UserMessages/:email" element={<UsersMessage />} />
        <Route path="/ContactPage" element={<ContactList />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/AccountsToBeSeller" element={<AccountsToBeSeller />} />
        <Route path="/ProductId/:id" element={<ProductId />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
}

export default App;
