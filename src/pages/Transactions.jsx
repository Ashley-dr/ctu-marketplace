/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
function Transactions() {
  const [myTransactions, setTransactions] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/transactions/${id}`)
      .then((result) => {
        setTransactions(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log("Error to fetch transaction items.", err);
      });
  }, [id]);
  return (
    <div className="mx-2 px-4 rounded-md pt-3 pb-4 max-w-full max-h-full bg-slate-700">
      <div className=" md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
        {myTransactions.map((item) => (
          <div className="mx-2 mb-4  bg-slate-600" key={item._id}>
            <div className="">
              <p>
                <label>Buyer Name: </label>
                {item.buyerName}
              </p>
              <p>
                <label>Buyer Email: </label>
                {item.buyerEmail}
              </p>
              <p>
                <label>Message: </label>
                {item.message}
              </p>
              <p>
                <label>Item Price: </label>
                {item.price}
              </p>
              <p>
                <label>Quantity of: </label>
                {item.quantity}
              </p>
              <p>
                <label>Total: </label>
                {item.total}
              </p>
            </div>
            <img className="w-96" src={item.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
