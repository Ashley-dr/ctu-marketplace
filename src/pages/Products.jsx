/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
function Products() {
  const [search, setSearch] = useState("");
  const [productsData, setProductsData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("top");
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
  const [checkedItems, setCheckedItems] = useState([false, false]);
  return (
    <div className="rounded-md  pb-4 max-w-full max-h-full justify-items-center grid ">
      <div className="bg-gray-300 justify-items-center grid max-w-full w-full  pr-5">
        <form>
          <figure className="grid">
            <input
              className="pl-5 w-96 mt-5 mb-5 pt-2 pb-2 rounded-md bg-gray-200 border-2 border-black"
              placeholder=" Search items here 🔍 "
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </figure>
        </form>
      </div>
      <button
        className="sm:grid lg:hidden p-2 border mb-5 rounded-br-2xl rounded-bl-2xl bg-[#039978] font-poppins"
        onClick={onOpen}
      >
        Open Categories
      </button>
      <div className=" shrink grid md:shrink-0   ssm:hidden lg:grid lg:grid-cols-8  mb-5">
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={""}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/3/www.madebyvadim.com.jpg?q=80&w=1482&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">All</p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Furnitures"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Furnitures
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Fashions"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">Fashions</p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Health & Beauty"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Health & Beauty
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Books & Media"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Books & Media
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Arts & Collectibles"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1456086272160-b28b0645b729?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Arts & Collectibles
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Mobiles CellPhone & Gadgets"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1616410011236-7a42121dd981?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Mobiles CellPhone & Gadgets
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Laptops & Computers"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1527600478564-488952effedb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Laptops & Computers
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Camera & Photo"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1563298258-c9b0371b55cc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Camera & Photo
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Electronic Parts"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1549781131-3e327129c3f7?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Electronic Parts
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Crafts & DIY"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1486129273931-27820249c615?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Crafts & DIY
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Pet Supplies"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1615531880032-4abafe570346?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Pet Supplies
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Jewelry & Accessories"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Jewelry & Accessories
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Clothings"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">Clothings</p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Men's Apparel"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Men`s Apparel
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Women's Apparel"}
          colorScheme="purple"
          bgImage={
            "https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Women`s Apparel
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"School Uniforms"}
          colorScheme="purple"
          bgImage={
            "https://f005.backblazeb2.com/file/MERN-Project/ctu_uniform_1564309352_90523b32_progressive.jpg"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              School Uniforms
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Lanyards"}
          colorScheme="purple"
          bgImage={
            "https://f005.backblazeb2.com/file/MERN-Project/315644611_179169384780538_3588805623603060726_n.jpg"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">Lanyards</p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"School Supplies"}
          colorScheme="purple"
          bgImage={
            "https://plus.unsplash.com/premium_photo-1663127374925-56558b81cd38?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              School Supplies
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Foods"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1697206663461-6fc09bedd829?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">Foods</p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Second Hand Items"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1700198816729-598f56205781?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Second Hand Items
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Men's Shoes"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Men`s Shoes
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Women's Shoes"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1670938258821-2956d4ce9c9b?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Women`s Shoes
            </p>
          </div>
        </Checkbox>
        <Checkbox
          className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
          value={"Other Items"}
          colorScheme="purple"
          bgImage={
            "https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          onChange={(e) => setSearch(e.target.value)}
        >
          <div className=" backdrop-opacity-20 p-1 invert">
            <p className="text-xl font-extralight text-black z-10">
              Other Items
            </p>
          </div>
        </Checkbox>
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
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Categories</DrawerHeader>
          <DrawerBody m={0} className="">
            <div className="justify-items-center grid ssm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 mb-7">
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={""}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/3/www.madebyvadim.com.jpg?q=80&w=1482&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">All</p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Furnitures"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Furnitures
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Fashions"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Fashions
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Health & Beauty"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Health & Beauty
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Books & Media"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Books & Media
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Arts & Collectibles"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1456086272160-b28b0645b729?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Arts & Collectibles
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Mobiles CellPhone & Gadgets"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1616410011236-7a42121dd981?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Mobiles CellPhone & Gadgets
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Laptops & Computers"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1527600478564-488952effedb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Laptops & Computers
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Camera & Photo"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1563298258-c9b0371b55cc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Camera & Photo
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Electronic Parts"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1549781131-3e327129c3f7?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Electronic Parts
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Crafts & DIY"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1486129273931-27820249c615?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Crafts & DIY
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Pet Supplies"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1615531880032-4abafe570346?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Pet Supplies
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Jewelry & Accessories"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Jewelry & Accessories
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Clothings"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Clothings
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Men's Apparel"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Men`s Apparel
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Women's Apparel"}
                colorScheme="purple"
                bgImage={
                  "https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Women`s Apparel
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"School Uniforms"}
                colorScheme="purple"
                bgImage={
                  "https://f005.backblazeb2.com/file/MERN-Project/ctu_uniform_1564309352_90523b32_progressive.jpg"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    School Uniforms
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Lanyards"}
                colorScheme="purple"
                bgImage={
                  "https://f005.backblazeb2.com/file/MERN-Project/315644611_179169384780538_3588805623603060726_n.jpg"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Lanyards
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"School Supplies"}
                colorScheme="purple"
                bgImage={
                  "https://plus.unsplash.com/premium_photo-1663127374925-56558b81cd38?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    School Supplies
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Foods"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1697206663461-6fc09bedd829?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Foods
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Second Hand Items"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1700198816729-598f56205781?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Second Hand Items
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Men's Shoes"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Men`s Shoes
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Women's Shoes"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1670938258821-2956d4ce9c9b?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Women`s Shoes
                  </p>
                </div>
              </Checkbox>
              <Checkbox
                className="p-4 inline-flex justify-center items-center h-32 w-40 bg-cover bg-no-repeat  bg-center font-quicksand transition ease-in-out hover:translate-x-y-1 hover:scale-105 relative"
                value={"Other Items"}
                colorScheme="purple"
                bgImage={
                  "https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" backdrop-opacity-20 p-1 invert">
                  <p className="text-xl font-extralight text-black z-10">
                    Other Items
                  </p>
                </div>
              </Checkbox>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Products;
