/* eslint-disable no-unused-vars */
import { React, useContext } from "react";
import { UserContext } from "../../backend/Context/userContext";
import { Link, useNavigate } from "react-router-dom";
import Products from "./Products";
import WelcomePage from "../components/WelcomePage";
import Users from "./Users";
function Home() {
  const { isUser } = useContext(UserContext);
  return (
    <div className="">
      <figure></figure>
      <WelcomePage />
      <Products />
      <Users />
    </div>
  );
}

export default Home;
