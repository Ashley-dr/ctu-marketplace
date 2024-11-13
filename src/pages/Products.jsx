/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import {
  Checkbox,
  CheckboxGroup,
  Img,
  Input,
  Radio,
  Stack,
  Text,
} from "@chakra-ui/react";
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
import logo from "../assets/ctu-logo.jpg";
import logomarket from "../assets/ctu-logo-marketplace.jpg";
import Loader from "../components/Loader";
function Products() {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [search, setSearch] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [countProducts, setCountProducts] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placement, setPlacement] = useState("top");
  const [value, setValue] = useState("1");
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const [productLimit, setProductLimit] = useState(10);

  useEffect(() => {
    const fetchProductsCount = async () => {
      try {
        const result = await axios.get(`${baseUrl}/api/count-products`);
        setCountProducts(result.data.count);
      } catch (error) {
        console.log("Error fetching the Orders Count.", error);
      }
    };
    fetchProductsCount();
    const interval = setInterval(fetchProductsCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/products`);
      setProductsData(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching products data");
      console.error("Error fetching products data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 1000);
    return () => clearInterval(interval);
  }, [fetchProducts]);

  const loadMoreProducts = () => {
    setProductLimit((limit) => limit + 10);
  };

  const filterProducts = useCallback(
    (item) => {
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
    },
    [search]
  );

  const filteredProducts = useMemo(() => {
    return [...productsData]
      .filter(filterProducts)
      .slice(0, productLimit)
      .reverse();
  }, [productsData, filterProducts, productLimit]);

  const renderProductCard = useCallback((item) => {
    return (
      <div
        key={item._id}
        className=" ssm:mb-7 ssm:mx-6 ssm:w-36 md:w-56  lg:w-64 shadow-inner hover:shadow-2xl mb-5 bg-[#8583830a] "
      >
        <div className="relative isolate flex flex-col justify-end overflow-hidden   max-w-sm ">
          <div className="grid grid-cols-2 mt-1 font-quicksand">
            <label className="">
              <p className="ssm:text-[10px]  truncate flex lg:text-base ml-1.5 ">
                <MdAssignmentInd className="mr-1 mt-1 text-lg" />
                {item.sellerName}
              </p>
            </label>
            <label className=" flex justify-end mt-1 mr-5 ml-5">
              {" "}
              {item.marketType == "Selling" ? (
                <>
                  <p className=" font-quicksand uppercase font-bold  ssm:pt-1 lg:pt-0 ssm:text-[8px] ssm:ml-14 md:text-base md:w-full lg:text-base pl-1 pr-1 rounded-md bg-[#2dd1b662] flex">
                    {/* <TbSquareLetterS className="text-xs mt-0.5" /> */}
                    {item.marketType}
                  </p>
                </>
              ) : (
                <></>
              )}
              {item.marketType == "Trading" ? (
                <>
                  <p className=" font-quicksand uppercase font-bold pl-1 pr-1 lg:pt-0 rounded-md bg-[#ff7b0f50] ssm:pt-1 ssm:text-[8px] ssm:ml-14 md:text-base lg:text-base flex">
                    {/* <TbLetterT className="mt-1 mr-1" /> */}
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
            <p className="ml-2 ssm:text-[10px] lg:text-xs opacity-90  ">
              <CalendarIcon className="mb-1" />{" "}
              {formatDateToNow(item.createdAt)}
              <br />
              <p className=" ssm:text-[9px] lg:text-[11px]">
                {new Date(item.createdAt).toLocaleTimeString("en-PH", {
                  second: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "long",
                  hour12: true,
                })}
              </p>
            </p>
          </label>
          {item.image.slice(0, 1).map((image, index) => (
            <div key={index} className="relative group cursor-pointer">
              <img
                className="rounded-md p-1 ssm:h-48 md:h-56 lg:h-72 bg-cover bg-no-repeat bg-fixed w-full object-cover transition duration-300 ease-out transform group-hover:scale-105"
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
              />
              <div className="absolute inset-0 opacity-40 rounded-md"></div>
              <div className="absolute  inset-0 ssm:mt-52 sm:mt-52 md:mt-60 lg:mt-72 "></div>
            </div>
          ))}
        </div>
        <div className="font-thin font-quicksand space-y-0 ">
          <div className="grid ">
            <label className="">
              <p className="ssm:text-[12px] ssm:w-32 lg:w-52  truncate mb-1  lg:text-lg ml-3  font-extralight ">
                {item.prodName}
              </p>
            </label>

            <p className="ssm:text-[12px] ssm:w-32 lg:w-52   truncate mb-1  lg:text-lg ml-3  mr-5 font-extralight ">
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(item.price)}
            </p>
          </div>

          <Link
            to={`/ProductId/${item._id}#item`}
            className="bg-gray-900 mt-2 pt-1 pb-1 text-white text-center text-sm  rounded-sm p-2 grid hover:bg-gray-950"
          >
            <button className="m-1 font-quicksand">
              See more <ExternalLinkIcon />
            </button>
          </Link>
        </div>
      </div>
    );
  }, []);

  if (loading && productsData.length === 0) {
    return (
      <div className="flex text-center justify-center mb-10 relative h-96 mt-20">
        <div className="absolute mt-32">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-md mt-5 pb-4 max-w-full max-h-full justify-items-center grid  ">
      <div className=" bg-gradient-to-br from-[#4a35610d] via-[#5505a60d] to-[#480a850d] justify-items-center grid max-w-full w-full  pr-5">
        <form className="">
          <figure className="grid">
            <Input
              ml={5}
              borderColor={"purple.700"}
              borderTop={2}
              borderLeft={2}
              rounded={0}
              borderRight={2}
              className="pl-5 w-96 mt-5 pt-1   border-2  "
              placeholder="Search items here"
              type="text"
              w={{ base: "xs", md: "md", lg: "lg" }}
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
        className="sm:grid lg:hidden p-2 border mb-5 rounded-br-2xl rounded-bl-2xl text-black bg-[#ffffff] font-poppins flex justify-items-center hover:bg-[#ffffff]"
        onClick={onOpen}
      >
        <p className="text-xs">Open Categories</p>{" "}
        <ArrowRightIcon className="transform rotate-90  ml-3" />
      </button>
      <div className="flex mt-7 mb-7  pt-5 ssm:px-0 lg:px-5 rounded-lg">
        {/* filter */}
        <div className=" shrink-0 grid font-quicksand text-sm space-y-2   ssm:hidden lg:grid lg:grid-cols-1  mb-5">
          <p className="flex text-sm gap-2 font-poppins">
            <p>Total Products</p>
            <p className="font-quicksand text-orange-200 bg-orange-900 px-2 mb-2 ">
              {countProducts}
            </p>
          </p>
          {/* checkboxes */}
          <Text>Filter by</Text>
          <hr />
          <Checkbox value={""} onChange={(e) => setSearch(e.target.value)}>
            <div className="flex gap-2 mx-2 ">
              <p className="">All</p>

              {countProducts}
            </div>
          </Checkbox>
          <Checkbox
            value={"Furnitures"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Furnitures</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Fashions"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2 ">
              <p className="">Fashions</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Health & Beauty"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Health & Beauty</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Books & Media"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2 ">
              <p className="">Books & Media</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Arts & Collectibles"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Arts & Collectibles</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Mobiles CellPhone & Gadgets"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2 w-32 hover:w-full">
              <p className="truncate">Mobiles CellPhone & Gadgets</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Laptops & Computers"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p>Laptops & Computers</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Camera & Photo"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2 ">
              <p className="">Camera & Photo</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Electronic Parts"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Electronic Parts</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Crafts & DIY"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Crafts & DIY</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Pet Supplies"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Pet Supplies</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Jewelry & Accessories"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Jewelry & Accessories</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Clothings"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className=" flex gap-2 mx-2">
              <p>Clothings</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Men's Apparel"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Men`s Apparel</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Women's Apparel"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Women`s Apparel</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"School Uniforms"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p>School Uniforms</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Lanyards"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p>Lanyards</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"School Supplies"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p>School Supplies</p>
            </div>
          </Checkbox>
          <Checkbox value={"Foods"} onChange={(e) => setSearch(e.target.value)}>
            <div className="flex gap-2 mx-2">
              <p>Foods</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Second Hand Items"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p>Second Hand Items</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Men's Shoes"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Men`s Shoes</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Women's Shoes"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Women`s Shoes</p>
            </div>
          </Checkbox>
          <Checkbox
            value={"Other Items"}
            onChange={(e) => setSearch(e.target.value)}
          >
            <div className="flex gap-2 mx-2">
              <p className="">Other Items</p>
            </div>
          </Checkbox>
        </div>
        <div className="">
          <div className=" md:shrink-0 grid xs:grid-cols-1  ssm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {/* here  */}
            {filteredProducts.length === 0 ? (
              <p className="text-center text-xs mx-6 w-80 font-quicksand mb-5">
                No Items are selling for this category yet.
              </p>
            ) : (
              filteredProducts.map(renderProductCard)
            )}
          </div>
        </div>
      </div>
      {productLimit < countProducts && (
        <Button onClick={loadMoreProducts}>View More</Button>
      )}
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Categories</DrawerHeader>
          <DrawerBody m={0} className="">
            <div className=" grid grid-cols-1 text-lg mb-7">
              <p className="flex text-lg gap-2 font-poppins">
                <p>Total Products</p>
                <p className="font-quicksand text-orange-200 bg-orange-900 px-2 mb-2 ">
                  {countProducts}
                </p>
              </p>
              {/* checkboxes */}
              <Text>Filter by</Text>
              <hr />
              <Checkbox value={""} onChange={(e) => setSearch(e.target.value)}>
                <div className="flex gap-2 mx-2 ">
                  <p className="">All</p>

                  {countProducts}
                </div>
              </Checkbox>
              <Checkbox
                value={"Furnitures"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Furnitures</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Fashions"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2 ">
                  <p className="">Fashions</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Health & Beauty"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Health & Beauty</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Books & Media"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2 ">
                  <p className="">Books & Media</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Arts & Collectibles"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Arts & Collectibles</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Mobiles CellPhone & Gadgets"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2 w-32 hover:w-full">
                  <p className="truncate">Mobiles CellPhone & Gadgets</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Laptops & Computers"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p>Laptops & Computers</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Camera & Photo"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2 ">
                  <p className="">Camera & Photo</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Electronic Parts"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Electronic Parts</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Crafts & DIY"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Crafts & DIY</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Pet Supplies"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Pet Supplies</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Jewelry & Accessories"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Jewelry & Accessories</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Clothings"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className=" flex gap-2 mx-2">
                  <p>Clothings</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Men's Apparel"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Men`s Apparel</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Women's Apparel"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Women`s Apparel</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"School Uniforms"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p>School Uniforms</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Lanyards"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p>Lanyards</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"School Supplies"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p>School Supplies</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Foods"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p>Foods</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Second Hand Items"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p>Second Hand Items</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Men's Shoes"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Men`s Shoes</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Women's Shoes"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Women`s Shoes</p>
                </div>
              </Checkbox>
              <Checkbox
                value={"Other Items"}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="flex gap-2 mx-2">
                  <p className="">Other Items</p>
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
