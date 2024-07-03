/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Inventory() {
  const [myProducts, setMyProducts] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/inventory/${id}`)
      .then((result) => {
        setMyProducts(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log("Error to fetch your products", err);
      });
  }, [id]);
  return (
    <div>
      <ul>
        {myProducts.map((item) => (
          <li key={item._id}>
            <p>{item.sellerName}</p>
            <p>{item.prodName}</p>
            {item.image && item.image.length > 0 && (
              <div className="flex ">
                {item.image.slice(0, 1).map((image, index) => (
                  <a key={index} target="_blank" href={image}>
                    <img
                      className=" h-64 w-64 mx-2"
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                    />
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
