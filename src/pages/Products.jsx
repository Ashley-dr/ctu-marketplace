/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
function Products() {
  const [search, setSearch] = useState("");
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
  const categoriesButton = [
    { value: "Fashion", label: "Fashion" },
    { value: "Furnitures", label: "Furnitures" },
    { value: "Health & Beauty", label: "Health & Beauty" },
    { value: "Books & Media", label: "Books & Media" },
    { value: "Art & Collectibles", label: "Art & Collectibles" },
    {
      value: "Mobiles CellPhone & Gadgets",
      label: "Mobiles CellPhone & Gadgets",
    },
    { value: "Laptops & Computers", label: "Laptops & Computers" },
    { value: "Camera & Photo", label: "Camera & Photo" },
    { value: "Electronic Parts", label: "Electronic Parts" },
    { value: "Crafts & DIY", label: "Crafts & DIY" },
    { value: "Pet Supplies", label: "Pet Supplies" },
    { value: "Jewelry & Accessories", label: "Jewelry & Accessories" },
    { value: "Clothings", label: "Clothings" },
    { value: "Men's Apparel", label: "Men's Apparel" },
    { value: "Men's Shoes", label: "Men's Shoes" },
    { value: "Women's Apparel", label: "Women's Apparel" },
    { value: "Women's Shoes", label: "Women's Shoes" },
    { value: "School Uniforms", label: "School Uniforms" },
    { value: "Lanyards", label: "Lanyards" },
    { value: "School Supplies", label: "School Supplies" },
    { value: "Foods", label: "Foods" },
  ];
  return (
    <div className="rounded-md  pb-4 max-w-full max-h-full justify-items-center grid ">
      <div className="bg-gray-300 justify-items-center grid max-w-full w-full mb-5 pr-5">
        <form>
          <figure className="flex">
            <input
              className="pl-5 w-96 mt-5 mb-5 pt-2 pb-2 rounded-md bg-gray-200 border-2 border-black"
              placeholder=" Search items here 🔍 "
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </figure>
        </form>
      </div>
      <div className=" md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {productsData
          .filter((item) => {
            if (search.toLowerCase() === "") {
              return item;
            }

            // Check if categories contain the search term
            const categoryMatch =
              Array.isArray(item.categories) &&
              item.categories.some((category) =>
                category.toLowerCase().includes(search.toLowerCase())
              );

            // Check if prodName contains the search term
            const nameMatch =
              item.prodName &&
              item.prodName.toLowerCase().includes(search.toLowerCase());

            // Return true if either categories or prodName match the search term
            return categoryMatch || nameMatch;
          })
          .map((item) => {
            return (
              <div
                key={item._id}
                className=" rounded-2xl p-1 mx-6 w-96 mb-5 bg-slate-400"
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
                    Stocks:
                    <p className="text-white  text-base  ">{item.stocks}</p>
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
