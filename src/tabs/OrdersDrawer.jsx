/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FaRegMessage } from "react-icons/fa6";
import { MdEmail, MdMessage } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { TbCircleLetterG, TbViewportWide } from "react-icons/tb";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Card,
  Img,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  Flex,
  Popover,
  PopoverTrigger,
  Box,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Text,
  PopoverBody,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import qrmaya from "../assets/PYMY CTU Marketplace.png";
import { FaFacebookF } from "react-icons/fa6";
import logo from "../assets/ctu-logo.jpg";
import logomarket from "../assets/ctu-logo-marketplace.jpg";
import { AtSignIcon, CalendarIcon, LinkIcon } from "@chakra-ui/icons";
import ChatPage from "./ChatPage";
import Loader from "../components/Loader";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
function OrdersDrawer({ id }) {
  const [orders, setOrders] = useState([]);
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);
  // const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const navigate = useNavigate();
  const [newChats, setNewChats] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [statusData, setStatusData] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const {
    isOpen: isOpenSecond,
    onOpen: onOpenSecond,
    onClose: onClosedSecond,
  } = useDisclosure();

  const size = ["xl"];
  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/");
      // }
      const { data } = await axios.post(
        `${baseUrl}/facultypost`,
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setisFaculty(user);

      return status;
    };
    verifyCookie();
  }, [cookies, navigate, removeCookies]);

  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/");
      // }
      const { data } = await axios.post(
        `${baseUrl}/userspost`,
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setisUser(user);

      return status;
    };
    verifyCookie();
  }, [cookies, navigate, removeCookies]);

  const [purchasedSchema, setPurchasedSchema] = useState({
    sellerId: "",
    userId: "",
    productId: "",
    prodName: "",
    message: "",
    sellerName: "",
    quantity: "",
    price: "",
    buyerName: "",
    buyerEmail: "",
    total: "",
    status: "",
    types: "",
    image: "",
  });
  const drawer = () => {
    onOpenDrawer();
  };
  const fetchTransactions = () => {
    axios
      .get(`${baseUrl}/api/orders/${id}`)
      .then((result) => {
        setOrders(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching:", err);
      });
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 1000);
    return () => clearInterval(interval);
  }, [id]);

  const removeItemClick = (id) => {
    axios
      .delete(`${baseUrl}/api/orders/${id}`)
      .then((result) => {
        // navigate("/");
      })
      .catch((err) => {
        console.log("Error to remove this product", err);
      });
  };
  const purchasedOnChange = (e) => {
    setPurchasedSchema({
      ...purchasedSchema,
      [e.target.name]: e.target.value,
    });
  };
  const formatPrice = (price) => {
    return (price / 10000).toFixed(4);
  };
  const chatForm = (e) => {
    e.preventDefault();
    let commenterName = "";
    if (isUsers) {
      commenterName = isUsers.fullname;
    } else if (isFaculty) {
      commenterName = isFaculty.fullname;
    }
    axios
      .post(`${baseUrl}/api/chats/${statusData._id}`, {
        chats: newChats,
        senderName: commenterName,
      })
      .then((result) => {
        setChatMessages([...chatMessages, result.data]);
        setNewChats("");
        onClosedSecond();
      })
      .catch((err) => {
        console.log("Error to send message", err);
      });
  };
  const chatButton = (id) => {
    setStatusData(id);
    onOpenDrawer();
  };
  const buttonStatus = (newStatus) => {
    setPurchasedSchema((prevSchema) => ({
      ...prevSchema,
      status: newStatus,
    }));
  };
  const statusHandler = (data) => {
    setStatusData(data);
    onOpen();
  };

  const productPurchased = (e) => {
    e.preventDefault();
    const data = {
      status: purchasedSchema.status,
    };
    axios
      .put(`${baseUrl}/api/purchasedItem/${statusData._id}`, data)
      .then((result) => {
        alert("Done");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error to update:", err);
      });
  };

  const handleOrder = async () => {
    try {
      const data = {
        userId: purchasedSchema.userId,
        productId: purchasedSchema.productId,
        sellerId: purchasedSchema.sellerId,
        buyerName: purchasedSchema.buyerName,
        buyerEmail: purchasedSchema.buyerEmail,
        total: purchasedSchema.total,
      };
      const response = await axios.post("/api/payments/create-payment", data);

      if (response.data.gcashRedirectUrl) {
        // Redirect to GCash payment page
        window.location.href = response.data.gcashRedirectUrl;
      }
    } catch (error) {
      console.error("Error creating payment:", error.message);
      alert("Failed to initiate payment");
    }
  };
  // const productPurchased = (e) => {
  //   e.preventDefault();
  //   axios
  //     .put(`${baseUrl}/api/purchasedItem/${id}`, {
  //       status: purchasedSchema.status,
  //     }) // Update only the status
  //     .then((result) => {
  //       console.log("Status updated successfully:", result.data);
  //       setPurchasedSchema({
  //         sellerId: "",
  //         userId: "",
  //         productId: "",
  //         prodName: "",
  //         message: "",
  //         sellerName: "",
  //         quantity: "",
  //         price: "",
  //         buyerName: "",
  //         buyerEmail: "",
  //         total: "",
  //         status: "",
  //         types: "",
  //         image: "",
  //       });
  //       // navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log("Error updating status:", err);
  //     });
  // };
  const [open, setOpen] = useState(false); // Lightbox open state
  const [currentImage, setCurrentImage] = useState(0); // Track current image index

  const handleOpenLightbox = (index) => {
    setCurrentImage(index); // Set the clicked image index
    setOpen(true); // Open the lightbox
  };
  return (
    <main className="rounded-md pb-4 max-w-full max-h-full justify-items-center grid  bg-gradient-to-tr">
      {" "}
      <div className="mt-2 mb-14  rounded-md pt-3 pb-4 max-w-full max-h-full ">
        <div className=" md:shrink-0 grid  justify-items-center grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 ">
          {/* <OrdersCount id={id} /> */}
          {loading ? (
            <>
              {" "}
              <div className="fixed mt-32 ">
                <Loader />
              </div>
            </>
          ) : (
            <>
              {orders.length === 0 ? (
                <div className=" text-xl font-thin font-quicksand h-32 mt-36">
                  No Data
                </div>
              ) : (
                <>
                  <Text>Pending</Text>
                  {orders
                    .filter((order) => order.status === undefined)
                    .map((order) => (
                      <div
                        key={order._id}
                        className="mt-1 border-solid rounded-2xl p-2 max-w-full   "
                      >
                        <div className="md:shrink-0 flex ">
                          <figure>
                            <img
                              className="  max-w-full max-h-full ssm:w-72 lg:w-40 h-20 object-cover bg-fixed"
                              src={order.image}
                              alt={order.prodName}
                            />
                          </figure>
                          <div className="grid  rounded-md  mx-5 bottom-2 font-quicksand text-sm">
                            <p className="text-xl grid grid-cols-2">
                              <button className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                                {order.prodName}
                              </button>

                              <Flex justifyContent={"end"} mx={1} gap={1}>
                                <Link
                                  to={`/ProductId/${order.productId}#item`}
                                  className="grid justify-self-start justify-start "
                                >
                                  <button size="xs">
                                    <Box as="span" flex="1" textAlign="right">
                                      <TbViewportWide className="text-base" />
                                    </Box>

                                    {/* <AccordionIcon /> */}
                                  </button>
                                </Link>
                                <Popover>
                                  <PopoverTrigger>
                                    <button size="xs">
                                      <Box as="span" flex="1" textAlign="right">
                                        <MdDelete className="text-base" />
                                      </Box>

                                      {/* <AccordionIcon /> */}
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent mr={8}>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign={"center"}>
                                      <Text>
                                        Cancel this order? <br />{" "}
                                        {order.prodName}
                                      </Text>
                                    </PopoverHeader>
                                    <PopoverBody>
                                      <button
                                        className="justify-self-center flex text-sm hover:shadow-inner hover:scale-110"
                                        onClick={() =>
                                          removeItemClick(order._id)
                                        }
                                      >
                                        Confirm
                                      </button>
                                    </PopoverBody>
                                  </PopoverContent>
                                </Popover>
                              </Flex>
                              <figure>
                                {/* <Link
                              to={`/ProductId/${order.productId}`}
                              className="grid justify-self-start justify-start "
                            >
                              <button className="text-xs underline">
                                View Item
                              </button>
                            </Link> */}
                                <div>{order.status}</div>
                                <div className="grid grid-cols-2 pt-1">
                                  <p className="w-32 text-sm flex">
                                    <p className="truncate">
                                      {order.sellerName}
                                    </p>
                                  </p>
                                </div>
                              </figure>
                              <figure className="justify-self-end text-xs ">
                                <article>
                                  {" "}
                                  <p className="flex">
                                    <p className="">{order.quantity}</p>
                                  </p>
                                  <p className="flex ">
                                    <p className="">
                                      {order.price.toLocaleString("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                      })}
                                    </p>
                                  </p>
                                  <p className="flex">
                                    <p className="">
                                      {order.total.toLocaleString("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                      })}
                                    </p>
                                  </p>
                                </article>
                              </figure>
                            </p>
                          </div>
                        </div>

                        {/* <Divider mt={5} /> */}
                        <Accordion mt={2} allowToggle>
                          <AccordionItem border={"none"} borderBottom={"solid"}>
                            <h2>
                              <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                  <Text className="text-xs">Checkout</Text>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel
                              pb={4}
                              bg={"#ffd8f547"}
                              roundedTop={"md"}
                            >
                              <div className="bg-gray-900 text-white text-center text-sm rounded-sm p-2 grid">
                                <p>
                                  Payment Method:{" "}
                                  {order.status ? (
                                    <>{order.status}</>
                                  ) : (
                                    <>None</>
                                  )}
                                </p>
                                <button
                                  onClick={() => statusHandler(order)}
                                  className="px-6 w-full mt-1 p-1 border-t-2 hover:bg-gray-800"
                                >
                                  <strong className="text-sm bottom-2 right-7">
                                    Pay via
                                  </strong>
                                  <div className="flex justify-between">
                                    <BsCashCoin className="text-2xl" />
                                    <p className="ml-2 mr-2">or</p>
                                    <TbCircleLetterG className="text-2xl" />
                                  </div>
                                </button>
                              </div>
                              <div className="grid grid-cols-2 pt-1">
                                <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                                  <LinkIcon className="mr-1 mt-1" />
                                  {order.sellerName}
                                </p>
                                <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                                  {order.accountType}
                                </p>
                              </div>
                              {order.accountType === "Student" && (
                                <>
                                  {" "}
                                  <Link
                                    to={`/UserAccount/${order.sellerEmail}`}
                                  >
                                    <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                                      <AtSignIcon className="mt-1 mr-1" />
                                      {order.sellerEmail}
                                    </p>
                                  </Link>
                                </>
                              )}
                              {order.accountType === "Faculty" && (
                                <>
                                  {" "}
                                  <Link
                                    to={`/FacultyAccount/${order.sellerEmail}`}
                                  >
                                    <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                                      <AtSignIcon className="mt-1 mr-1" />
                                      {order.sellerEmail}
                                    </p>
                                  </Link>
                                </>
                              )}

                              {/* <p className="truncate flex">
                          <FaFacebookF className="mt-1 mr-1" />{" "}
                          {order.sellerFacebook}
                        </p> */}
                              <hr />
                              <p className="flex">
                                <p>Quantity:</p>
                                <p className="px-2 font-bold underline">
                                  {order.quantity}
                                </p>
                              </p>
                              <p className="flex mr-5">
                                <p className="mr-1">Price:</p>
                                <p className="underline">
                                  {order.price.toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                  })}
                                </p>
                              </p>

                              <p className="flex mr-5">
                                <p className="mr-1">Total:</p>
                                <p className="underline">
                                  {order.total.toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                  })}
                                </p>
                              </p>
                              <p className="h-28 overflow-y-auto px-2 mt-1 mb-2 border-solid border-2 rounded-lg w-[100%] ">
                                <p className="bg-[#0e4f7728] rounded-md">
                                  Type: {order.types}
                                </p>
                                {order.message}
                              </p>
                              <figure className="grid justify-items-center">
                                <div className="mt-2">
                                  <button className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white">
                                    <MdEmail className="text-2xl" />
                                  </button>

                                  <a
                                    href={order.sellerFacebook}
                                    target="_blank"
                                  >
                                    <button className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </a>
                                  <button
                                    onClick={() => chatButton(order)}
                                    className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white"
                                  >
                                    <MdMessage className=" cursor-pointer mx-2  text-2xl" />
                                  </button>
                                </div>
                              </figure>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    ))}
                  <Text>E Payments</Text>
                  {orders
                    .filter((order) => order.status === "E-Payment")
                    .map((order) => (
                      <div
                        key={order._id}
                        className="mt-1 border-solid rounded-2xl p-2 max-w-full   "
                      >
                        <div className="md:shrink-0 flex ">
                          <figure>
                            <img
                              className="  max-w-full max-h-full ssm:w-72 lg:w-40 h-20 object-cover bg-fixed"
                              src={order.image}
                              alt={order.prodName}
                            />
                          </figure>
                          <div className="grid  rounded-md  mx-5 bottom-2 font-quicksand text-sm">
                            <p className="text-xl grid grid-cols-2">
                              <button className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                                {order.prodName}
                              </button>

                              <Flex justifyContent={"end"} mx={1} gap={1}>
                                <Link
                                  to={`/ProductId/${order.productId}`}
                                  className="grid justify-self-start justify-start "
                                >
                                  <button size="xs">
                                    <Box as="span" flex="1" textAlign="right">
                                      <TbViewportWide className="text-base" />
                                    </Box>

                                    {/* <AccordionIcon /> */}
                                  </button>
                                </Link>
                                <Popover>
                                  <PopoverTrigger>
                                    <button size="xs">
                                      <Box as="span" flex="1" textAlign="right">
                                        <MdDelete className="text-base" />
                                      </Box>

                                      {/* <AccordionIcon /> */}
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent mr={8}>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign={"center"}>
                                      <Text>
                                        Cancel this order? <br />{" "}
                                        {order.prodName}
                                      </Text>
                                    </PopoverHeader>
                                    <PopoverBody>
                                      <button
                                        className="justify-self-center flex text-sm hover:shadow-inner hover:scale-110"
                                        onClick={() =>
                                          removeItemClick(order._id)
                                        }
                                      >
                                        Confirm
                                      </button>
                                    </PopoverBody>
                                  </PopoverContent>
                                </Popover>
                              </Flex>
                              <figure>
                                {/* <Link
                              to={`/ProductId/${order.productId}`}
                              className="grid justify-self-start justify-start "
                            >
                              <button className="text-xs underline">
                                View Item
                              </button>
                            </Link> */}
                                <div>{order.status}</div>
                                <div className="grid grid-cols-2 pt-1">
                                  <p className="w-32 text-sm flex">
                                    <p className="truncate">
                                      {order.sellerName}
                                    </p>
                                  </p>
                                </div>
                              </figure>
                              <figure className="justify-self-end text-xs ">
                                <article>
                                  {" "}
                                  <p className="flex">
                                    <p className="">{order.quantity}</p>
                                  </p>
                                  <p className="flex ">
                                    <p className="">
                                      {order.price.toLocaleString("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                      })}
                                    </p>
                                  </p>
                                  <p className="flex">
                                    <p className="">
                                      {order.total.toLocaleString("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                      })}
                                    </p>
                                  </p>
                                </article>
                              </figure>
                            </p>
                          </div>
                        </div>

                        {/* <Divider mt={5} /> */}
                        <Accordion mt={2} allowToggle>
                          <AccordionItem border={"none"} borderBottom={"solid"}>
                            <h2>
                              <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                  <Text className="text-xs">Checkout</Text>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel
                              pb={4}
                              bg={"#ffd8f547"}
                              roundedTop={"md"}
                            >
                              <div className="bg-gray-900 text-white text-center text-sm rounded-sm p-2 grid">
                                <p>
                                  Payment Method:{" "}
                                  {order.status ? (
                                    <>{order.status}</>
                                  ) : (
                                    <>None</>
                                  )}
                                </p>
                                <button
                                  onClick={() => statusHandler(order)}
                                  className="px-6 w-full mt-1 p-1 border-t-2 hover:bg-gray-800"
                                >
                                  <strong className="text-sm bottom-2 right-7">
                                    Pay via
                                  </strong>
                                  <div className="flex justify-between">
                                    <BsCashCoin className="text-2xl" />
                                    <p className="ml-2 mr-2">or</p>
                                    <TbCircleLetterG className="text-2xl" />
                                  </div>
                                </button>
                              </div>
                              <div className="grid grid-cols-2 pt-1">
                                <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                                  <LinkIcon className="mr-1 mt-1" />
                                  {order.sellerName}
                                </p>
                                <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                                  {order.accountType}
                                </p>
                              </div>
                              {order.accountType === "Student" && (
                                <>
                                  {" "}
                                  <Link
                                    to={`/UserAccount/${order.sellerEmail}`}
                                  >
                                    <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                                      <AtSignIcon className="mt-1 mr-1" />
                                      {order.sellerEmail}
                                    </p>
                                  </Link>
                                </>
                              )}
                              {order.accountType === "Faculty" && (
                                <>
                                  {" "}
                                  <Link
                                    to={`/FacultyAccount/${order.sellerEmail}`}
                                  >
                                    <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                                      <AtSignIcon className="mt-1 mr-1" />
                                      {order.sellerEmail}
                                    </p>
                                  </Link>
                                </>
                              )}

                              {/* <p className="truncate flex">
                          <FaFacebookF className="mt-1 mr-1" />{" "}
                          {order.sellerFacebook}
                        </p> */}
                              <hr />
                              <p className="flex">
                                <p>Quantity:</p>
                                <p className="px-2 font-bold underline">
                                  {order.quantity}
                                </p>
                              </p>
                              <p className="flex mr-5">
                                <p className="mr-1">Price:</p>
                                <p className="underline">
                                  {order.price.toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                  })}
                                </p>
                              </p>

                              <p className="flex mr-5">
                                <p className="mr-1">Total:</p>
                                <p className="underline">
                                  {order.total.toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                  })}
                                </p>
                              </p>
                              <p className="h-28 overflow-y-auto px-2 mt-1 mb-2 border-solid border-2 rounded-lg w-[100%] ">
                                <p className="bg-[#0e4f7728] rounded-md">
                                  Type: {order.types}
                                </p>
                                {order.message}
                              </p>
                              <figure className="grid justify-items-center">
                                <div className="mt-2">
                                  <button className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white">
                                    <MdEmail className="text-2xl" />
                                  </button>

                                  <a
                                    href={order.sellerFacebook}
                                    target="_blank"
                                  >
                                    <button className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </a>
                                  <button
                                    onClick={() => chatButton(order)}
                                    className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white"
                                  >
                                    <MdMessage className=" cursor-pointer mx-2  text-2xl" />
                                  </button>
                                </div>
                              </figure>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    ))}
                  <Text>Meet up Payment</Text>
                  {orders
                    .filter((order) => order.status === "Meet up Pay")
                    .map((order) => (
                      <div
                        key={order._id}
                        className="mt-1 border-solid rounded-2xl p-2 max-w-full   "
                      >
                        <div className="md:shrink-0 flex ">
                          <figure>
                            <img
                              className="  max-w-full max-h-full ssm:w-72 lg:w-40 h-20 object-cover bg-fixed"
                              src={order.image}
                              alt={order.prodName}
                            />
                          </figure>
                          <div className="grid  rounded-md  mx-5 bottom-2 font-quicksand text-sm">
                            <p className="text-xl grid grid-cols-2">
                              <button className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                                {order.prodName}
                              </button>

                              <Flex justifyContent={"end"} mx={1} gap={1}>
                                <Link
                                  to={`/ProductId/${order.productId}`}
                                  className="grid justify-self-start justify-start "
                                >
                                  <button size="xs">
                                    <Box as="span" flex="1" textAlign="right">
                                      <TbViewportWide className="text-base" />
                                    </Box>

                                    {/* <AccordionIcon /> */}
                                  </button>
                                </Link>
                                <Popover>
                                  <PopoverTrigger>
                                    <button size="xs">
                                      <Box as="span" flex="1" textAlign="right">
                                        <MdDelete className="text-base" />
                                      </Box>

                                      {/* <AccordionIcon /> */}
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent mr={8}>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign={"center"}>
                                      <Text>
                                        Cancel this order? <br />{" "}
                                        {order.prodName}
                                      </Text>
                                    </PopoverHeader>
                                    <PopoverBody>
                                      <button
                                        className="justify-self-center flex text-sm hover:shadow-inner hover:scale-110"
                                        onClick={() =>
                                          removeItemClick(order._id)
                                        }
                                      >
                                        Confirm
                                      </button>
                                    </PopoverBody>
                                  </PopoverContent>
                                </Popover>
                              </Flex>
                              <figure>
                                {/* <Link
                              to={`/ProductId/${order.productId}`}
                              className="grid justify-self-start justify-start "
                            >
                              <button className="text-xs underline">
                                View Item
                              </button>
                            </Link> */}
                                <div>{order.status}</div>
                                <div className="grid grid-cols-2 pt-1">
                                  <p className="w-32 text-sm flex">
                                    <p className="truncate">
                                      {order.sellerName}
                                    </p>
                                  </p>
                                </div>
                              </figure>
                              <figure className="justify-self-end text-xs ">
                                <article>
                                  {" "}
                                  <p className="flex">
                                    <p className="">{order.quantity}</p>
                                  </p>
                                  <p className="flex ">
                                    <p className="">
                                      {order.price.toLocaleString("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                      })}
                                    </p>
                                  </p>
                                  <p className="flex">
                                    <p className="">
                                      {order.total.toLocaleString("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                      })}
                                    </p>
                                  </p>
                                </article>
                              </figure>
                            </p>
                          </div>
                        </div>

                        {/* <Divider mt={5} /> */}
                        <Accordion mt={2} allowToggle>
                          <AccordionItem border={"none"} borderBottom={"solid"}>
                            <h2>
                              <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                  <Text className="text-xs">Checkout</Text>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel
                              pb={4}
                              bg={"#ffd8f547"}
                              roundedTop={"md"}
                            >
                              <div className="bg-gray-900 text-white text-center text-sm rounded-sm p-2 grid">
                                <p>
                                  Payment Method:{" "}
                                  {order.status ? (
                                    <>{order.status}</>
                                  ) : (
                                    <>None</>
                                  )}
                                </p>
                                <button
                                  onClick={() => statusHandler(order)}
                                  className="px-6 w-full mt-1 p-1 border-t-2 hover:bg-gray-800"
                                >
                                  <strong className="text-sm bottom-2 right-7">
                                    Pay via
                                  </strong>
                                  <div className="flex justify-between">
                                    <BsCashCoin className="text-2xl" />
                                    <p className="ml-2 mr-2">or</p>
                                    <TbCircleLetterG className="text-2xl" />
                                  </div>
                                </button>
                              </div>
                              <div className="grid grid-cols-2 pt-1">
                                <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                                  <LinkIcon className="mr-1 mt-1" />
                                  {order.sellerName}
                                </p>
                                <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                                  {order.accountType}
                                </p>
                              </div>
                              {order.accountType === "Student" && (
                                <>
                                  {" "}
                                  <Link
                                    to={`/UserAccount/${order.sellerEmail}`}
                                  >
                                    <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                                      <AtSignIcon className="mt-1 mr-1" />
                                      {order.sellerEmail}
                                    </p>
                                  </Link>
                                </>
                              )}
                              {order.accountType === "Faculty" && (
                                <>
                                  {" "}
                                  <Link
                                    to={`/FacultyAccount/${order.sellerEmail}`}
                                  >
                                    <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                                      <AtSignIcon className="mt-1 mr-1" />
                                      {order.sellerEmail}
                                    </p>
                                  </Link>
                                </>
                              )}

                              {/* <p className="truncate flex">
                          <FaFacebookF className="mt-1 mr-1" />{" "}
                          {order.sellerFacebook}
                        </p> */}
                              <hr />
                              <p className="flex">
                                <p>Quantity:</p>
                                <p className="px-2 font-bold underline">
                                  {order.quantity}
                                </p>
                              </p>
                              <p className="flex mr-5">
                                <p className="mr-1">Price:</p>
                                <p className="underline">
                                  {order.price.toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                  })}
                                </p>
                              </p>

                              <p className="flex mr-5">
                                <p className="mr-1">Total:</p>
                                <p className="underline">
                                  {order.total.toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                  })}
                                </p>
                              </p>
                              <p className="h-28 overflow-y-auto px-2 mt-1 mb-2 border-solid border-2 rounded-lg w-[100%] ">
                                <p className="bg-[#0e4f7728] rounded-md">
                                  Type: {order.types}
                                </p>
                                {order.message}
                              </p>
                              <figure className="grid justify-items-center">
                                <div className="mt-2">
                                  <button className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white">
                                    <MdEmail className="text-2xl" />
                                  </button>

                                  <a
                                    href={order.sellerFacebook}
                                    target="_blank"
                                  >
                                    <button className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </a>
                                  <button
                                    onClick={() => chatButton(order)}
                                    className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white"
                                  >
                                    <MdMessage className=" cursor-pointer mx-2  text-2xl" />
                                  </button>
                                </div>
                              </figure>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    ))}
                </>
              )}
            </>
          )}
        </div>
        {statusData && (
          <Drawer
            isOpen={isOpenDrawer}
            placement="right"
            size={"sm"}
            onClose={onCloseDrawer}
          >
            <DrawerOverlay />
            <DrawerContent rounded={"xl"} m={{ base: 0, md: 2, lg: 2 }}>
              <DrawerCloseButton />
              <DrawerHeader>
                {" "}
                <div className="gap-1.5  text-xs grid grid-cols-2">
                  <p className=" font-bold">Seller's Info</p>

                  <p className="text-xs font-thin font-quicksand flex gap-2 truncate w-40">
                    <p>Product: </p>
                    {statusData.prodName}
                  </p>

                  {statusData.accountType === "Student" && (
                    <>
                      {" "}
                      <Link to={`/UserAccount/${statusData.sellerEmail}`}>
                        <p className="text-xs font-thin font-quicksand truncate w-40 underline">
                          {statusData.sellerEmail}
                        </p>
                      </Link>
                    </>
                  )}
                  {statusData.accountType === "Faculty" && (
                    <>
                      {" "}
                      <Link to={`/FacultyAccount/${statusData.sellerEmail}`}>
                        <p className="text-xs font-thin font-quicksand truncate w-40 underline">
                          {statusData.sellerEmail}
                        </p>
                      </Link>
                    </>
                  )}
                  <p className="text-xs font-thin font-quicksand flex gap-2">
                    <p>Total: </p>
                    {statusData.total.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </p>
                  <p className="text-xs font-quicksand truncate w-40">
                    {statusData.sellerName}
                  </p>
                  <p className="text-xs font-thin font-quicksand flex gap-2">
                    <p>Price: </p>
                    {statusData.price.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </p>
                </div>
              </DrawerHeader>

              <DrawerBody>
                <ChatPage userEmail={statusData.sellerEmail} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}

        {statusData && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <p className="text-center font-quicksand">
                  Transaction of Payment
                </p>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p className=" text-sm font-bold font-bebos">
                  When doing Transaction with a Seller please input payment
                  method below for the rules of our CTU Marketplace. as a Buyer
                  please Cooperate, Thank you.
                </p>
                <br />
                <p className=" text-lg font-bebos">Strict Rules:</p>
                <ul className="text-sm font-quicksand">
                  <li>
                    1. Transaction will only be inside of campus so we can
                    ensure you're safety.
                  </li>
                  <li>
                    2. We are always monitoring users not to do something not
                    right and scams for a seller and so on we can restrict your
                    account and report to school student affairs office.
                  </li>
                  <li>3. Avoid using spam account to purchase item.</li>
                </ul>
                <br />
                <p className=" text-lg font-bebos">
                  Our Rules of transactions:
                </p>
                <ul className="text-sm font-quicksand">
                  <li>
                    1. Cooperate taking a picture of you with ID and product
                    when doing transaction.
                  </li>
                  <li>
                    2. Select your method of payment ( Meet up Pay or Gcash
                    Payment ).
                  </li>
                </ul>
                <br />
                <form onSubmit={productPurchased}>
                  <div className="text-center p-1 px-4 border rounded-md">
                    <div className="m-5 mx-14 grid border text-center rounded-md">
                      <p className="m-1">Select Payment Method</p>
                      <button
                        type="button"
                        className="m-2 border p-3"
                        onClick={() => buttonStatus("Meet up Pay")}
                      >
                        Meet up Pay
                      </button>

                      <button
                        className="m-2 text-center border p-3  "
                        type="button"
                        onClick={() => buttonStatus("E-Payment")}
                      >
                        E payment
                      </button>
                      {/* <button onClick={handleOrder}>
                        Add Order & Pay with GCash
                      </button> */}
                      {purchasedSchema.status === "E-Payment" ? (
                        <div>
                          {/* <Img
                            src={qrmaya}
                            alt=""
                            className="shadow-inner hover:shadow-xl size-96 rounded-md cursor-pointer"
                            onClick={() => setOpen(true)}
                          /> */}
                          <Link
                            to={`https://paymaya.me/ctumarketplace?amt=${statusData.total}`}
                          >
                            s
                          </Link>
                        </div>
                      ) : (
                        <>
                          {" "}
                          <input
                            className="bg-transparent text-center mb-1"
                            readOnly
                            disabled
                            type="text"
                            name="status"
                            placeholder="None"
                            value={
                              (purchasedSchema.status =
                                statusData.status || purchasedSchema.status)
                            }
                            onChange={purchasedOnChange}
                          />
                        </>
                      )}
                      <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        plugins={[Zoom]}
                        slides={[{ src: qrmaya }]}
                      />
                    </div>
                  </div>
                  <center>
                    {" "}
                    <button
                      className="mt-4 bg-teal-800 rounded-md p-2 border  mb-2 px-10"
                      type="submit"
                    >
                      Submit
                    </button>
                  </center>
                </form>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        )}
        {statusData && (
          <Modal onClose={onClosedSecond} size={size} isOpen={isOpenSecond}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <p>Item: {statusData.prodName}</p>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {statusData.chat && statusData.chat.length > 0 && (
                  <div className="border px-2 rounded-md  h-80 overflow-y-auto overflow-hidden ">
                    {statusData.chat.map((chat, index) => (
                      <div key={index._id}>
                        {chat.chats2 && (
                          <div
                            className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block mb-2 mt-2"
                            style={{ textAlign: "left" }}
                          >
                            <strong className="text-xs font-quicksand">
                              {chat.senderName2}
                            </strong>
                            <p className="font-quicksand">{chat.chats2}</p>
                          </div>
                        )}
                        {chat.chats && (
                          <div style={{ textAlign: "right" }}>
                            <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block mt-2 mb-2 font-quicksand">
                              <p>{chat.chats}</p>
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {isUsers && (
                  <div>
                    <form onSubmit={chatForm}>
                      <input
                        type="text"
                        className=""
                        value={newChats}
                        placeholder="Message to seller."
                        onChange={(e) => setNewChats(e.target.value)}
                      />
                      <button type="submit"></button>
                    </form>
                  </div>
                )}
                {isFaculty && (
                  <div>
                    <form onSubmit={chatForm}>
                      <input
                        className="border bg-transparent mt-2 rounded-md px-2 p-2 w-4/5"
                        type="text"
                        value={newChats}
                        placeholder="Message to seller."
                        onChange={(e) => setNewChats(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="px-3 ml-5 rounded-md  bg-teal-950 border p-2 hover:bg-teal-600"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </main>
  );
}

export default OrdersDrawer;
