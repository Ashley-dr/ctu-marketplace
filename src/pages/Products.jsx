/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { Checkbox, CheckboxGroup, Input, Radio, Stack } from "@chakra-ui/react";
import { BsBox2 } from "react-icons/bs";
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
  RadioGroup,
} from "@chakra-ui/react";
import { MdAssignmentInd } from "react-icons/md";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  CalendarIcon,
  AtSignIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";
import { TbSquareLetterS } from "react-icons/tb";
import { TbLetterT } from "react-icons/tb";
import { RiAccountPinCircleLine } from "react-icons/ri";
export const formatDateToNow = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
function Products() {
  const [search, setSearch] = useState("");
  const [productsData, setProductsData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("top");
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:4000/api/products")
        .then((result) => {
          setProductsData(result.data);
        })
        .catch((err) => {
          console.log("Error fetching products data", err);
        });
    };
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);
  const [value, setValue] = useState("1");
  const [checkedItems, setCheckedItems] = useState([false, false]);
  return (
    <div className="rounded-md  pb-4 max-w-full max-h-full justify-items-center grid  bg-gradient-to-tr from-[#00ffdd2d] via-[#0834f523] to-[#087bff1a]">
      <div className="bg-[#79787809] justify-items-center grid max-w-full w-full  pr-5">
        <form className="">
          <figure className="grid ">
            <Input
              ml={5}
              w={96}
              bg={"#ffff"}
              textColor={"black"}
              borderColor={"teal.900"}
              className="pl-5 w-96 mt-5 pt-1 rounded-md  border-2 "
              placeholder="Search items here"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </figure>
          <div className="flex mb-2 mt-2 font-quicksand justify-center">
            {" "}
            <RadioGroup onChange={setValue} value={value}>
              <Radio
                className=" pr-5"
                value={""}
                colorScheme="purple"
                onChange={(e) => setSearch(e.target.value)}
              >
                <p className="text-sm font-extralight mr-3">All</p>
              </Radio>
              <Radio
                className="mx-1 pr-5"
                value={"Trading"}
                colorScheme="orange"
                onChange={(e) => setSearch(e.target.value)}
              >
                <p className="text-sm font-extralight mr-3">Trading</p>
              </Radio>
              <Radio
                className="mx-1 pr-5"
                value={"Selling"}
                colorScheme="green"
                onChange={(e) => setSearch(e.target.value)}
              >
                <p className="text-sm font-extralight">Selling</p>
              </Radio>
            </RadioGroup>
          </div>
        </form>
      </div>
      <button
        className="sm:grid lg:hidden p-2 border mb-5 rounded-br-2xl rounded-bl-2xl bg-[#039978] font-poppins flex justify-items-center hover:bg-[#0ccea4]"
        onClick={onOpen}
      >
        <p className="text-xs">Open Categories</p>{" "}
        <ArrowRightIcon className="transform rotate-90  ml-3" />
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
      <div className=" md:shrink-0 grid  ssm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
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

            const marketType =
              item.marketType &&
              item.marketType.toLowerCase().includes(search.toLowerCase());
            // Return true if either categories or prodName match the search term
            return categoryMatch || nameMatch || marketType;
          })
          .map((item) => {
            return (
              <div
                key={item._id}
                className="   mx-6 ssm:w-48 md:w-56 lg:w-80 shadow-inner hover:shadow-2xl mb-5 bg-[#8583830a] hover:bg-[#ffffff28]"
              >
                <div className="relative isolate flex flex-col justify-end overflow-hidden   max-w-sm ">
                  <div className="grid grid-cols-2 mt-1 font-quicksand">
                    <label className="">
                      <p className="truncate flex text-base ml-1.5 ">
                        <MdAssignmentInd className="mr-1 mt-1 text-lg" />
                        {item.sellerName}
                      </p>
                    </label>
                    <label className="flex justify-end mt-1 mr-5 ml-5">
                      {" "}
                      {item.marketType == "Selling" ? (
                        <>
                          <p className=" font-quicksand uppercase font-bold  ssm:text-sm ssm:ml-14 md:text-base lg:text-base pl-1 pr-1 rounded-md bg-[#2dd1b662] flex">
                            <TbSquareLetterS className="mt-1 mr-2" />
                            {item.marketType}
                          </p>
                        </>
                      ) : (
                        <></>
                      )}
                      {item.marketType == "Trading" ? (
                        <>
                          <p className=" font-quicksand uppercase font-bold pl-1 pr-1 rounded-md bg-[#ff7b0f50] ssm:text-sm ssm:ml-14 md:text-base lg:text-base flex">
                            <TbLetterT className="mt-1 mr-1" />
                            {item.marketType}
                          </p>
                        </>
                      ) : (
                        <></>
                      )}
                    </label>
                  </div>
                  <label className="flex mb-1">
                    {" "}
                    <p className="ml-2 ssm:text-sm lg:text-sm opacity-90  ">
                      <CalendarIcon className="mb-1" />{" "}
                      {formatDateToNow(item.createdAt)}
                    </p>
                  </label>
                  {item.image.slice(0, 1).map((image, index) => (
                    <a key={index} target="_blank" href={image}>
                      <img
                        className="rounded-md p-1 ssm:h-48 md:h-56 lg:h-72 bg-no-repeat bg-fixed w-full object-cover"
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                      />
                      <div className="absolute inset-0 opacity-40 rounded-md"></div>
                      <div className="absolute  inset-0 ssm:mt-52 sm:mt-52 md:mt-60 lg:mt-72  bg-gradient-to-t from-gray-900 via-gray-500/30">
                        <h2 className="z-10 relative lg:top-6 text-2xl px-4  font-orbitron text-white">
                          <p>
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(item.price)}
                          </p>
                        </h2>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="font-quicksand ">
                  <label className="">
                    <p className="truncate mb-1 mt-1 text-lg ml-3  font-extralight ">
                      {item.prodName}
                    </p>
                  </label>
                  <div className="flex justify-between px-2">
                    <label className="flex mx-2">
                      <BsBox2 className="mt-1 text-base" />
                      <p className="pl-1  text-base underline">{item.stocks}</p>
                    </label>
                    <label className="flex mx-2">
                      <RiAccountPinCircleLine className="mt-1 text-base" />

                      <p className="pl-1  text-base underline">
                        {item.accountType}
                      </p>
                    </label>
                  </div>
                  <Link
                    to={`/ProductId/${item._id}`}
                    className="bg-gray-900 mt-2 pt-1 pb-1 text-white text-center text-sm  rounded-sm p-2 grid hover:bg-gray-950"
                  >
                    <button className="m-1 font-quicksand">
                      See more <ExternalLinkIcon />
                    </button>
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
