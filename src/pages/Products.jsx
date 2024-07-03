/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function Products() {
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((result) => {
        setProductsData(result.data);
      })
      .catch((err) => {
        console.log("Error fetching products data", err);
      });
  }, []);
  return (
    <div className="mx-2 px-5 rounded-md pt-3 pb-4 max-w-full max-h-full ">
      <div className=" md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {productsData
          .map((item) => {
            return (
              <div
                key={item._id}
                className=" rounded-2xl p-1 w-96 mb-5 bg-slate-400"
              >
                <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl  max-w-sm ">
                  {item.image.slice(0, 1).map((image, index) => (
                    <a key={index} target="_blank" href={image}>
                      <img
                        className=" h-72 w-full object-cover rounded-md"
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                      />
                      <div className="absolute inset-0 opacity-40 rounded-md"></div>
                      <div className="absolute inset-0 mt-60  bg-gradient-to-t from-gray-900 via-gray-900/60">
                        <h2 className="z-10 text-2xl px-4  font-orbitron text-white">
                          <p>₱.{item.price}</p>
                        </h2>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-4 mb-4 grid grid-cols-2 px-1 font-quicksand text-white">
                  <label className="bg-gray-800 pt-1 pb-1 text-gray-300 text-sm pl-1 mr-2 rounded-sm">
                    Product:
                    <p className="text-white  text-base  ">{item.prodName}</p>
                  </label>
                  <label className="bg-gray-800 pt-1 pb-1 text-gray-300 text-sm pl-1  rounded-sm">
                    Seller:
                    <p className="text-white  text-base  ">{item.sellerName}</p>
                  </label>
                  <label className="bg-gray-800 mt-2 pt-1 pb-1 text-gray-300 text-sm pl-1 mr-2 rounded-sm">
                    Categories:
                    <p className="text-white  text-base  ">{item.categories}</p>
                  </label>

                  <Link
                    to={`/ProductId/${item._id}`}
                    className="bg-gray-900 mt-2 pt-1 pb-1 text-white text-center text-sm  rounded-sm hover:bg-gray-950"
                  >
                    <button className="mt-3 ">See More</button>
                  </Link>
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
}

export default Products;
