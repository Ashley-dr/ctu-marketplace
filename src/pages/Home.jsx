/* eslint-disable no-unused-vars */
import { React, useContext } from "react";
import { UserContext } from "../../backend/Context/userContext";
import { Link, useNavigate } from "react-router-dom";
import Products from "./Products";
import WelcomePage from "../components/WelcomePage";
import Users from "./Users";
import Keyoffering from "../components/Keyoffering";
function Home() {
  const { isUser } = useContext(UserContext);
  return (
    <div className="grid justify-items-center">
      <figure></figure>
      <WelcomePage />
      <Products />
      <br />
      <Users />
      <Keyoffering />
    </div>
  );
}

export default Home;
