/* eslint-disable no-unused-vars */
import { React, useContext } from "react";
import { UserContext } from "../../backend/Context/userContext";
import { Link, useNavigate } from "react-router-dom";
import Products from "./Products";
function Home() {
  const { isUser } = useContext(UserContext);
  return (
    <div>
      <figure></figure>

      <Products />
    </div>
  );
}

export default Home;
