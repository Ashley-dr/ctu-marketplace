/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FaRegMessage } from "react-icons/fa6";
import {
  MdArrowBack,
  MdArrowBackIosNew,
  MdEmail,
  MdError,
  MdMessage,
  MdPayments,
  MdPeople,
} from "react-icons/md";
import orderImg from "../assets/order.png";
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
  Tooltip,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  IconButton,
  Input,
  Select,
  Textarea,
  useToast,
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
import { formatDateToNow } from "../pages/Products";
import { RiImage2Fill } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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

  const {
    isOpen: isOpenSecondDrawer,
    onOpen: onOpenSecondDrawer,
    onClose: onClosedSecondDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenThirdDrawer,
    onOpen: onOpenThirdDrawer,
    onClose: onClosedThirdDrawer,
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

  const [open, setOpen] = useState(false); // Lightbox open state
  const [currentImage, setCurrentImage] = useState(0); // Track current image index

  const handleOpenLightbox = (index) => {
    setCurrentImage(index); // Set the clicked image index
    setOpen(true); // Open the lightbox
  };
  const toast = useToast();
  const [loadingRefund, setRefundLoading] = useState(false);
  const [refund, setRefund] = useState({
    orderId: "",
    buyerName: "",
    buyerEmail: "",
    contactNumber: "",
    sellerName: "",
    sellerEmail: "",
    itemTotalPaid: "",
    itemQuantity: "",
    productName: "",
    returnReason: "",
    returnPaymentMethod: "",
  });
  const [refundImage, setRefundImage] = useState([]);
  const refundHandler = (e) => {
    setRefund({ ...refund, [e.target.name]: e.target.value });
  };
  const refundImageHandler = (e) => {
    setRefundImage(Array.from(e.target.files));
  };

  const refundSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("orderId", refund.orderId);
    formData.append("buyerName", refund.buyerName);
    formData.append("buyerEmail", refund.buyerEmail);
    formData.append("contactNumber", refund.contactNumber);
    formData.append("sellerName", refund.sellerName);
    formData.append("sellerEmail", refund.sellerEmail);
    formData.append("productName", refund.productName);
    formData.append("returnReason", refund.returnReason);
    formData.append("itemTotalPaid", refund.itemTotalPaid);
    formData.append("itemQuantity", refund.itemQuantity);
    formData.append("returnPaymentMethod", refund.returnPaymentMethod);
    refundImage.forEach((itemFile) => {
      formData.append("itemFile", itemFile);
    });
    try {
      setRefundLoading(true);
      const response = await axios.post(
        `${baseUrl}/api/refund-item`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Image Uploaded", response.data.itemFile);
      setRefund({
        orderId: "",
        buyerName: "",
        buyerEmail: "",
        contactNumber: "",
        sellerName: "",
        sellerEmail: "",
        itemTotalPaid: "",
        itemQuantity: "",
        productName: "",
        returnReason: "",
        returnPaymentMethod: "",
      });
      setRefundImage([]);
      console.log("Refund Submitted");

      toast({
        position: "top",
        title: "Refund submitted.",
        description: "Your refund request has been successfully submitted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onCloseDrawer();
    } catch (error) {
      console.log("Error uploading images", error);
      toast({
        title: "Error submitting refund.",
        description:
          "There was an error submitting your refund. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setRefundLoading(false);
    }
  };

  const pendingCard = () => {
    return (
      <>
        {" "}
        {orders
          .filter((order) => order.status === undefined)
          .map((order) => (
            <div
              key={order._id}
              className="mt-1 border-solid rounded-2xl mb-5 max-w-full   "
            >
              <div className=" flex ">
                <figure>
                  <img
                    className="  max-w-full max-h-full ssm:w-72 lg:w-40 h-20 object-cover bg-fixed"
                    src={order.image}
                    alt={order.prodName}
                  />
                </figure>
                <div className="grid  rounded-md  ssm:mx-1 lg:mx-3 bottom-2 font-quicksand text-sm">
                  <p className="text-xl grid grid-cols-2">
                    <button className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                      {order.prodName}
                    </button>

                    <Flex justifyContent={"end"} mx={1} gap={1}>
                      <Tooltip label={`View ${order.prodName}`}>
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
                      </Tooltip>
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
                              Cancel this order? <br /> {order.prodName}
                            </Text>
                          </PopoverHeader>
                          <PopoverBody>
                            <button
                              className="justify-self-center flex text-sm hover:shadow-inner hover:scale-110"
                              onClick={() => removeItemClick(order._id)}
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
                          <p className="truncate">{order.sellerName}</p>
                        </p>
                      </div>
                      {order.marketType === "Trading" && (
                        <>
                          <p className="text-xs mt-2 font-quicksand text-orange-400">
                            {order.marketType}
                          </p>
                        </>
                      )}
                      {order.marketType === "Selling" && (
                        <>
                          <p className="text-xs mt-2 font-quicksand text-emerald-400">
                            {order.marketType}
                          </p>
                        </>
                      )}
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
              {order.marketType === "Selling" && (
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
                    <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
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
                          <Link to={`/UserAccount/${order.sellerEmail}`}>
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
                          <Link to={`/FacultyAccount/${order.sellerEmail}`}>
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
                      <Divider className="m-2" />
                      <div className="space-y-1">
                        <p className="flex justify-between ">
                          <p className="text-xs font-light">Item:</p>
                          <p className="px-2 text-xs text-right w-64 font-bold ">
                            {order.prodName}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Quantity:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {order.quantity}{" "}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Price:</p>
                          <p className="px-2 text-xs  text-right w-64  font-semibold ">
                            {order.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}{" "}
                          </p>
                        </p>

                        <p className="flex justify-between">
                          <p className="text-xs font-light">Total:</p>
                          <p className="px-2 text-xs  text-right w-64 font-semibold ">
                            {order.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Market Type:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>{order.marketType}</p>
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Status:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>
                              {order.status ? (
                                <>{order.status}</>
                              ) : (
                                <>Pending</>
                              )}
                            </p>
                          </p>
                        </p>
                      </div>
                      <Divider className="m-2" />
                      <Accordion mt={2} allowToggle>
                        <AccordionItem border={"none"}>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                <Text className="text-xs">More info.</Text>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel
                            pb={4}
                            bg={"#ffffff0a"}
                            roundedTop={"md"}
                          >
                            {" "}
                            <p className="h-full space-y-1 overflow-y-auto  mt-1 mb-2 border-solid  rounded-lg  ">
                              <p className="text-xs font-quicksand">
                                Type: {order.types}
                              </p>
                              <p className="text-xs font-quicksand">
                                Message: {order.message}
                              </p>
                            </p>
                            <Divider />
                            <figure className="flex flex-col items-center  ">
                              <div className="flex gap-4 mt-4">
                                {/* Email Button */}
                                <Tooltip label={<MdError />}>
                                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all shadow-md">
                                    <MdEmail className="text-2xl" />
                                  </button>
                                </Tooltip>

                                {/* Facebook Button */}
                                <a
                                  href={order.sellerFacebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Tooltip label="Visit seller facebook Page.">
                                    <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </Tooltip>
                                </a>

                                {/* Chat Button */}
                                <Tooltip label="Message this seller.">
                                  <button
                                    onClick={() => chatButton(order)}
                                    className="flex items-center justify-center  w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all shadow-md"
                                  >
                                    <MdMessage className="text-2xl" />
                                  </button>
                                </Tooltip>
                              </div>
                            </figure>
                          </AccordionPanel>{" "}
                        </AccordionItem>
                      </Accordion>

                      <button
                        onClick={() => statusHandler(order)}
                        className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center text-sm rounded-md grid  hover:bg-gray-800"
                      >
                        Pay now
                      </button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
              {order.marketType === "Trading" && (
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
                    <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
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
                          <Link to={`/UserAccount/${order.sellerEmail}`}>
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
                          <Link to={`/FacultyAccount/${order.sellerEmail}`}>
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
                      <Divider className="m-2" />
                      <div className="space-y-1">
                        <p className="flex justify-between ">
                          <p className="text-xs font-light">Item:</p>
                          <p className="px-2 text-xs text-right w-64 font-bold ">
                            {order.prodName}
                          </p>
                        </p>

                        <p className="flex justify-between">
                          <p className="text-xs font-light">Trade sched:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {new Date(order.tradeSchedule).toLocaleTimeString(
                              "en-PH",
                              {
                                hour: "2-digit",

                                day: "2-digit",
                                month: "long",
                              }
                            )}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Quantity:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {order.quantity}{" "}
                          </p>
                        </p>
                        {order.addTradeMoney === null || 0 || undefined ? (
                          <></>
                        ) : (
                          <p className="flex justify-between">
                            <p className="text-xs font-light">Additional:</p>
                            <p className="px-2 text-xs  text-right w-64  font-semibold ">
                              {order.addTradeMoney.toLocaleString("en-PH", {
                                style: "currency",
                                currency: "PHP",
                              })}{" "}
                            </p>
                          </p>
                        )}
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Price:</p>
                          <p className="px-2 text-xs  text-right w-64  font-semibold ">
                            {order.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}{" "}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Total:</p>
                          <p className="px-2 text-xs  text-right w-64 font-semibold ">
                            {order.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Market Type:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>{order.marketType}</p>
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Status:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>
                              {order.status ? (
                                <>{order.status}</>
                              ) : (
                                <>Pending</>
                              )}
                            </p>
                          </p>
                        </p>
                      </div>
                      <Divider className="m-2" />
                      <Accordion mt={2} allowToggle>
                        <AccordionItem border={"none"}>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                <Text className="text-xs">More info.</Text>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel
                            pb={4}
                            bg={"#ffffff0a"}
                            roundedTop={"md"}
                          >
                            {" "}
                            <p className="h-full space-y-2 overflow-y-auto  mt-1 mb-2 border-solid  rounded-lg  ">
                              <p className="text-xs font-quicksand">
                                Type: {order.types}
                              </p>
                              <p className="text-xs font-quicksand">
                                Message: {order.message}
                              </p>
                              <Image
                                className="w-32 justify-self-center  h-32"
                                src={order.tradeImage}
                              />
                            </p>
                            <Divider />
                            <figure className="flex flex-col items-center  ">
                              <Text className="text-sm mt-2 font-quicksand">
                                Message a Poster
                              </Text>
                              <div className="flex gap-4 mt-4">
                                {/* Email Button */}
                                <Tooltip label={<MdError />}>
                                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all shadow-md">
                                    <MdEmail className="text-2xl" />
                                  </button>
                                </Tooltip>

                                {/* Facebook Button */}
                                <a
                                  href={order.sellerFacebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Tooltip label="Visit Poster facebook Page.">
                                    <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </Tooltip>
                                </a>

                                {/* Chat Button */}
                                <Tooltip label="Message this Poster.">
                                  <button
                                    onClick={() => chatButton(order)}
                                    className="flex items-center justify-center  w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all shadow-md"
                                  >
                                    <MdMessage className="text-2xl" />
                                  </button>
                                </Tooltip>
                              </div>
                            </figure>
                          </AccordionPanel>{" "}
                        </AccordionItem>
                      </Accordion>

                      <button
                        onClick={() => statusHandler(order)}
                        className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center text-sm rounded-md grid  hover:bg-gray-800"
                      >
                        Pay now
                      </button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ))}
      </>
    );
  };

  const EpaymentCard = () => {
    return (
      <>
        {" "}
        {orders
          .filter(
            (order) =>
              order.transactionStatus === undefined &&
              order.status === "E-Payment"
          )
          .map((order) => (
            <div
              key={order._id}
              className="mt-1 border-solid rounded-2xl mb-5 max-w-full   "
            >
              <div className=" flex ">
                <figure>
                  <img
                    className="  max-w-full max-h-full ssm:w-72 lg:w-40 h-20 object-cover bg-fixed"
                    src={order.image}
                    alt={order.prodName}
                  />
                </figure>
                <div className="grid  rounded-md  ssm:mx-1 lg:mx-3 bottom-2 font-quicksand text-sm">
                  <p className="text-xl grid grid-cols-2">
                    <button className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                      {order.prodName}
                    </button>

                    <Flex justifyContent={"end"} mx={1} gap={1}>
                      <Tooltip label={`View ${order.prodName}`}>
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
                      </Tooltip>
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
                              Cancel this order? <br /> {order.prodName}
                            </Text>
                          </PopoverHeader>
                          <PopoverBody>
                            <button
                              className="justify-self-center flex text-sm hover:shadow-inner hover:scale-110"
                              onClick={() => removeItemClick(order._id)}
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
                      {order.transactionStatus === "Success" && (
                        <>
                          {" "}
                          <Tooltip label="Transaction Success: Item Received">
                            <div className="bg-emerald-700 text-white text-center rounded-lg text-xs w-20">
                              {order.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {order.transactionStatus === undefined && (
                        <Tooltip label="Transaction Status Pending">
                          <div className="bg-gray-800 text-white text-center rounded-lg text-xs w-20">
                            In Proccess
                          </div>
                        </Tooltip>
                      )}
                      {order.transactionStatus === "Item Returned" && (
                        <>
                          <Tooltip label="Transaction Status: Item Returned.">
                            <div className="bg-orange-600 text-white text-center rounded-lg text-xs w-24">
                              {order.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      <div className="grid grid-cols-2 pt-1">
                        <p className="w-32 text-sm flex">
                          <p className="truncate">{order.sellerName}</p>
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
                  <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
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
                        <Link to={`/UserAccount/${order.sellerEmail}`}>
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
                        <Link to={`/FacultyAccount/${order.sellerEmail}`}>
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
                    <Divider className="m-2" />
                    <div className="space-y-1">
                      <p className="flex justify-between ">
                        <p className="text-xs font-light">Item:</p>
                        <p className="px-2 text-xs text-right w-64 font-bold ">
                          {order.prodName}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Quantity:</p>
                        <p className="px-2 text-xs  text-right w-64  font-bold ">
                          {order.quantity}{" "}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Price:</p>
                        <p className="px-2 text-xs  text-right w-64  font-semibold ">
                          {order.price.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          })}{" "}
                        </p>
                      </p>

                      <p className="flex justify-between">
                        <p className="text-xs font-light">Total:</p>
                        <p className="px-2 text-xs  text-right w-64 font-semibold ">
                          {order.total.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          })}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Market Type:</p>
                        <p className="px-2 text-xs font-bold ">
                          <p>{order.marketType}</p>
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Status:</p>
                        <p className="px-2 text-xs font-bold ">
                          <p>
                            {order.status ? <>{order.status}</> : <>Pending</>}
                          </p>
                        </p>
                      </p>
                    </div>
                    <Divider className="m-2" />
                    <Accordion mt={2} allowToggle>
                      <AccordionItem border={"none"}>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              <Text className="text-xs">More info.</Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          pb={4}
                          bg={"#ffffff0a"}
                          roundedTop={"md"}
                        >
                          {" "}
                          <p className="h-full space-y-1 overflow-y-auto  mt-1 mb-2 border-solid  rounded-lg  ">
                            <p className="text-xs font-quicksand">
                              Type: {order.types}
                            </p>
                            <p className="text-xs font-quicksand">
                              Message: {order.message}
                            </p>
                          </p>
                          <Divider />
                          <figure className="flex flex-col items-center  ">
                            <div className="flex gap-4 mt-4">
                              {/* Email Button */}
                              <Tooltip label={<MdError />}>
                                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all shadow-md">
                                  <MdEmail className="text-2xl" />
                                </button>
                              </Tooltip>

                              {/* Facebook Button */}
                              <a
                                href={order.sellerFacebook}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Tooltip label="Visit seller facebook Page.">
                                  <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                    <FaFacebookSquare className="text-2xl" />
                                  </button>
                                </Tooltip>
                              </a>

                              {/* Chat Button */}
                              <Tooltip label="Message this seller.">
                                <button
                                  onClick={() => chatButton(order)}
                                  className="flex items-center justify-center  w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all shadow-md"
                                >
                                  <MdMessage className="text-2xl" />
                                </button>
                              </Tooltip>
                            </div>
                          </figure>
                        </AccordionPanel>{" "}
                      </AccordionItem>
                    </Accordion>

                    {/* <button
                      onClick={() => statusHandler(order)}
                      className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center text-sm rounded-md grid  hover:bg-gray-800"
                    >
                      Pay now
                    </button> */}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
      </>
    );
  };

  const meetUpPayCard = () => {
    return (
      <div className="max-w-full">
        {" "}
        {orders
          .filter(
            (order) =>
              order.transactionStatus === undefined &&
              order.status === "Meet up Pay"
          )
          .map((order) => (
            <div
              key={order._id}
              className="mt-1 border-solid rounded-2xl mb-5 max-w-full   "
            >
              <div className=" flex ">
                <figure>
                  <img
                    className="  max-w-full max-h-full ssm:w-72 lg:w-40 h-20 object-cover bg-fixed"
                    src={order.image}
                    alt={order.prodName}
                  />
                </figure>
                <div className="grid  rounded-md  ssm:mx-1 lg:mx-3 bottom-2 font-quicksand text-sm">
                  <p className="text-xl grid grid-cols-2">
                    <button className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                      {order.prodName}
                    </button>

                    <Flex justifyContent={"end"} mx={1} gap={1}>
                      <Tooltip label={`View ${order.prodName}`}>
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
                      </Tooltip>
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
                              Cancel this order? <br /> {order.prodName}
                            </Text>
                          </PopoverHeader>
                          <PopoverBody>
                            <button
                              className="justify-self-center flex text-sm hover:shadow-inner hover:scale-110"
                              onClick={() => removeItemClick(order._id)}
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
                      {order.transactionStatus === "Success" && (
                        <>
                          {" "}
                          <Tooltip label="Transaction Success: Item Received">
                            <div className="bg-emerald-700 text-white text-center rounded-lg text-xs w-20">
                              {order.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {order.transactionStatus === undefined && (
                        <Tooltip label="Transaction Status Pending">
                          <div className="bg-gray-800  text-white text-center rounded-lg text-xs w-20">
                            In Process
                          </div>
                        </Tooltip>
                      )}
                      {order.transactionStatus === "Item Returned" && (
                        <>
                          <Tooltip label="Transaction Status: Item Returned.">
                            <div className="bg-orange-600 text-white text-center rounded-lg text-xs w-20">
                              {order.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}

                      <div className="grid grid-cols-2 pt-1">
                        <p className="w-32 text-sm flex">
                          <p className="truncate">{order.sellerName}</p>
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
                  <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
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
                        <Link to={`/UserAccount/${order.sellerEmail}`}>
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
                        <Link to={`/FacultyAccount/${order.sellerEmail}`}>
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
                    <Divider className="m-2" />
                    <div className="space-y-1">
                      <p className="flex justify-between ">
                        <p className="text-xs font-light">Item:</p>
                        <p className="px-2 text-xs text-right w-64 font-bold ">
                          {order.prodName}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Quantity:</p>
                        <p className="px-2 text-xs  text-right w-64  font-bold ">
                          {order.quantity}{" "}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Price:</p>
                        <p className="px-2 text-xs  text-right w-64  font-semibold ">
                          {order.price.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          })}{" "}
                        </p>
                      </p>

                      <p className="flex justify-between">
                        <p className="text-xs font-light">Total:</p>
                        <p className="px-2 text-xs  text-right w-64 font-semibold ">
                          {order.total.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          })}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Market Type:</p>
                        <p className="px-2 text-xs font-bold ">
                          <p>{order.marketType}</p>
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Status:</p>
                        <p className="px-2 text-xs font-bold ">
                          <p>
                            {order.status ? <>{order.status}</> : <>Pending</>}
                          </p>
                        </p>
                      </p>
                    </div>
                    <Divider className="m-2" />
                    <Accordion mt={2} allowToggle>
                      <AccordionItem border={"none"}>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              <Text className="text-xs">More info.</Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          pb={4}
                          bg={"#ffffff0a"}
                          roundedTop={"md"}
                        >
                          {" "}
                          <p className="h-full space-y-1 overflow-y-auto  mt-1 mb-2 border-solid  rounded-lg  ">
                            <p className="text-xs font-quicksand">
                              Type: {order.types}
                            </p>
                            <p className="text-xs font-quicksand">
                              Message: {order.message}
                            </p>
                          </p>
                          <Divider />
                          <figure className="flex flex-col items-center  ">
                            <div className="flex gap-4 mt-4">
                              {/* Email Button */}
                              <Tooltip label={<MdError />}>
                                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all shadow-md">
                                  <MdEmail className="text-2xl" />
                                </button>
                              </Tooltip>

                              {/* Facebook Button */}
                              <a
                                href={order.sellerFacebook}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Tooltip label="Visit seller facebook Page.">
                                  <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                    <FaFacebookSquare className="text-2xl" />
                                  </button>
                                </Tooltip>
                              </a>

                              {/* Chat Button */}
                              <Tooltip label="Message this seller.">
                                <button
                                  onClick={() => chatButton(order)}
                                  className="flex items-center justify-center  w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all shadow-md"
                                >
                                  <MdMessage className="text-2xl" />
                                </button>
                              </Tooltip>
                            </div>
                          </figure>
                        </AccordionPanel>{" "}
                      </AccordionItem>
                    </Accordion>
                    {/* 
                    <button
                      onClick={() => statusHandler(order)}
                      className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center text-sm rounded-md grid  hover:bg-gray-800"
                    >
                      Pay now
                    </button> */}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
      </div>
    );
  };

  const historySuccessCard = () => {
    return (
      <>
        {" "}
        {orders
          .filter((order) => order.transactionStatus === "Success")
          .map((order) => (
            <div
              key={order._id}
              className="mt-1 border-solid rounded-2xl mb-5 max-w-full   "
            >
              <div className=" flex ">
                <figure>
                  <img
                    className="  max-w-full max-h-full ssm:w-72 lg:w-40 h-20 object-cover bg-fixed"
                    src={order.image}
                    alt={order.prodName}
                  />
                </figure>
                <div className="grid  rounded-md  ssm:mx-1 lg:mx-3 bottom-2 font-quicksand text-sm">
                  <p className="text-xl grid grid-cols-2">
                    <button className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                      {order.prodName}
                    </button>

                    <Flex justifyContent={"end"} mx={1} gap={1}>
                      <Tooltip label={`View ${order.prodName}`}>
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
                      </Tooltip>
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
                      {order.transactionStatus === "Success" && (
                        <>
                          {" "}
                          <Tooltip label="Transaction Success: Item Received">
                            <div className="bg-emerald-700 text-white text-center rounded-lg text-xs w-20">
                              {order.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {order.transactionStatus === undefined && (
                        <Tooltip label="Transaction Status Pending">
                          <div className="bg-gray-800 text-white text-center rounded-lg text-xs w-20">
                            In Proccess
                          </div>
                        </Tooltip>
                      )}
                      {order.transactionStatus === "Item Returned" && (
                        <>
                          <Tooltip label="Transaction Status: Item Returned.">
                            <div className="bg-orange-600 text-white text-center rounded-lg text-xs w-24">
                              {order.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      <div className="grid grid-cols-2 pt-1">
                        <p className="w-32 text-sm flex">
                          <p className="truncate">{order.sellerName}</p>
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
                        <Text className="text-xs">View</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
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
                        <Link to={`/UserAccount/${order.sellerEmail}`}>
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
                        <Link to={`/FacultyAccount/${order.sellerEmail}`}>
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
                    <Divider className="m-2" />
                    <div className="space-y-1">
                      <p className="flex justify-between ">
                        <p className="text-xs font-light">Item:</p>
                        <p className="px-2 text-xs text-right w-64 font-bold ">
                          {order.prodName}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Quantity:</p>
                        <p className="px-2 text-xs  text-right w-64  font-bold ">
                          {order.quantity}{" "}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Price:</p>
                        <p className="px-2 text-xs  text-right w-64  font-semibold ">
                          {order.price.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          })}{" "}
                        </p>
                      </p>

                      <p className="flex justify-between">
                        <p className="text-xs font-light">Total:</p>
                        <p className="px-2 text-xs  text-right w-64 font-semibold ">
                          {order.total.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          })}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Market Type:</p>
                        <p className="px-2 text-xs font-bold ">
                          <p>{order.marketType}</p>
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Status:</p>
                        <p className="px-2 text-xs font-bold ">
                          <p>
                            {order.status ? <>{order.status}</> : <>Pending</>}
                          </p>
                        </p>
                      </p>
                    </div>
                    <Divider className="m-2" />
                    <Accordion mt={2} allowToggle>
                      <AccordionItem border={"none"}>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              <Text className="text-xs">More info.</Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          pb={4}
                          bg={"#ffffff0a"}
                          roundedTop={"md"}
                        >
                          {" "}
                          <p className="h-full space-y-1 overflow-y-auto  mt-1 mb-2 border-solid  rounded-lg  ">
                            <p className="text-xs font-quicksand">
                              Type: {order.types}
                            </p>
                            <p className="text-xs font-quicksand">
                              Message: {order.message}
                            </p>
                          </p>
                          <Divider />
                          <figure className="flex flex-col items-center  ">
                            <div className="flex gap-4 mt-4">
                              {/* Email Button */}
                              <Tooltip label={<MdError />}>
                                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all shadow-md">
                                  <MdEmail className="text-2xl" />
                                </button>
                              </Tooltip>

                              {/* Facebook Button */}
                              <a
                                href={order.sellerFacebook}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Tooltip label="Visit seller facebook Page.">
                                  <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                    <FaFacebookSquare className="text-2xl" />
                                  </button>
                                </Tooltip>
                              </a>

                              {/* Chat Button */}
                              <Tooltip label="Message this seller.">
                                <button
                                  onClick={() => chatButton(order)}
                                  className="flex items-center justify-center  w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all shadow-md"
                                >
                                  <MdMessage className="text-2xl" />
                                </button>
                              </Tooltip>
                            </div>
                          </figure>
                        </AccordionPanel>{" "}
                      </AccordionItem>
                    </Accordion>
                    <Divider className="m-2" />
                    <Accordion
                      mt={2}
                      allowToggle
                      bg={"#f6fcff"}
                      className="text-black"
                      rounded={"base"}
                    >
                      <AccordionItem border={"none"}>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              <Text className="text-xs text-center font-poppins ">
                                Request a Refund.
                              </Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          pb={4}
                          bg={"#f4ddff38"}
                          roundedTop={"md"}
                        >
                          <form onSubmit={refundSubmit}>
                            <article hidden>
                              <Input
                                type="text"
                                name="orderId"
                                value={(refund.orderId = order._id)}
                                onChange={refundHandler}
                                disabled
                              />
                              <Input
                                type="text"
                                name="buyerName"
                                value={(refund.buyerName = order.buyerName)}
                                onChange={refundHandler}
                                disabled
                              />
                              <Input
                                type="text"
                                name="buyerEmail"
                                value={(refund.buyerEmail = order.buyerEmail)}
                                onChange={refundHandler}
                                disabled
                              />
                              <Input
                                type="number"
                                name="contactNumber"
                                value={
                                  (refund.contactNumber =
                                    order.buyerPhoneNumber)
                                }
                                onChange={refundHandler}
                                disabled
                              />
                              <Input
                                type="text"
                                name="sellerName"
                                value={(refund.sellerName = order.sellerName)}
                                onChange={refundHandler}
                                disabled
                              />
                              <Input
                                type="text"
                                name="sellerEmail"
                                value={(refund.sellerEmail = order.sellerEmail)}
                                onChange={refundHandler}
                                disabled
                              />
                              <Input
                                type="text"
                                name="productName"
                                value={(refund.productName = order.prodName)}
                                onChange={refundHandler}
                                disabled
                              />
                              <Input
                                type="text"
                                name="itemTotalPaid"
                                value={(refund.itemTotalPaid = order.total)}
                                onChange={refundHandler}
                                disabled
                              />
                              <Input
                                type="text"
                                name="itemQuantity"
                                value={(refund.itemQuantity = order.quantity)}
                                onChange={refundHandler}
                                disabled
                              />
                            </article>
                            <article className="space-y-1 grid justify-items-center">
                              <label
                                htmlFor="text-area"
                                className="text-xs font-poppins font-extralight"
                              >
                                Reason for a refund.
                              </label>
                              <Textarea
                                type="text"
                                id="text-area"
                                name="returnReason"
                                value={refund.returnReason}
                                onChange={refundHandler}
                                className=" border s"
                                border={"solid.1px"}
                                borderColor={"purple"}
                                required
                              />

                              {/* <Select
                                id="select-method"
                                type="text"
                                name="returnPaymentMethod"
                                value={refund.returnPaymentMethod}
                                onChange={refundHandler}
                                className="border"
                                border={"solid.1px"}
                                borderColor={"purple"}
                              >
                                <option value="E-Payment">E-Payment</option>
                                <option value="Meet up Pay">Meet up Pay</option>
                              </Select> */}
                              <figure className="space-y-2 grid justify-items-center">
                                <Box className="mx-5 mt-5 grid justify-items-center ">
                                  <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer flex"
                                  >
                                    <Tooltip label="Input your Item image here (Required)">
                                      <IconButton
                                        bg={"#8b18ff6e"}
                                        _hover={{ bg: "#601da4d3" }}
                                        className="bg-[#512f73d3]"
                                        size="lg"
                                        icon={<RiImage2Fill />}
                                        aria-label="Upload file"
                                        as="span"
                                      />
                                    </Tooltip>
                                  </label>

                                  <Input
                                    id="file-upload"
                                    type="file"
                                    name="refundImage"
                                    accept=".jpeg,.jpg,.png,.gif,.pdf,.doc,.docx"
                                    onChange={refundImageHandler}
                                    multiple
                                    required
                                    display="none"
                                  />
                                  <Text className="text-xs">
                                    Attach file image of an item. ({" "}
                                    {refundImage.length} ) 5 max.
                                  </Text>
                                </Box>
                                {loadingRefund ? (
                                  <>
                                    {" "}
                                    <Button
                                      rounded={"0"}
                                      w={"100%"}
                                      bg={"#601da4d3"}
                                      _hover={{ bg: "#512f73d3" }}
                                      className="bg-[#601da4d3]  justify-self-center  font-poppins"
                                    >
                                      Processing{" "}
                                      <AiOutlineLoading3Quarters className="animate-spin ml-2" />
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    rounded={"0"}
                                    w={"100%"}
                                    bg={"#601da4d3"}
                                    _hover={{ bg: "#512f73d3" }}
                                    className="bg-[#601da4d3]  justify-self-center  font-poppins"
                                    type="submit"
                                  >
                                    Submit
                                  </Button>
                                )}
                              </figure>
                            </article>
                          </form>
                        </AccordionPanel>{" "}
                      </AccordionItem>
                    </Accordion>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
      </>
    );
  };
  const historyItemReturnedCard = () => {
    return (
      <>
        {" "}
        {orders
          .filter((order) => order.transactionStatus === "Item Returned")
          .map((order) => (
            <div
              key={order._id}
              className="mt-1 border-solid rounded-2xl mb-5 max-w-full   "
            >
              <div className=" flex ">
                <figure>
                  <img
                    className="  max-w-full max-h-full ssm:w-72 lg:w-40 h-20 object-cover bg-fixed"
                    src={order.image}
                    alt={order.prodName}
                  />
                </figure>
                <div className="grid  rounded-md  ssm:mx-1 lg:mx-3 bottom-2 font-quicksand text-sm">
                  <p className="text-xl grid grid-cols-2">
                    <button className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                      {order.prodName}
                    </button>

                    <Flex justifyContent={"end"} mx={1} gap={1}>
                      <Tooltip label={`View ${order.prodName}`}>
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
                      </Tooltip>
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
                      {order.transactionStatus === "Success" && (
                        <>
                          {" "}
                          <Tooltip label="Transaction Success: Item Received">
                            <div className="bg-emerald-700 text-white text-center rounded-lg text-xs w-20">
                              {order.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {order.transactionStatus === undefined && (
                        <Tooltip label="Transaction Status Pending">
                          <div className="bg-gray-800 text-white text-center rounded-lg text-xs w-20">
                            In Proccess
                          </div>
                        </Tooltip>
                      )}
                      {order.transactionStatus === "Item Returned" && (
                        <>
                          <Tooltip label="Transaction Status: Item Returned.">
                            <div className="bg-orange-600 text-white text-center rounded-lg text-xs w-24">
                              {order.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      <div className="grid grid-cols-2 pt-1">
                        <p className="w-32 text-sm flex">
                          <p className="truncate">{order.sellerName}</p>
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
                        <Text className="text-xs">View</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
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
                        <Link to={`/UserAccount/${order.sellerEmail}`}>
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
                        <Link to={`/FacultyAccount/${order.sellerEmail}`}>
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
                    <Divider className="m-2" />
                    <div className="space-y-1">
                      <p className="flex justify-between ">
                        <p className="text-xs font-light">Item:</p>
                        <p className="px-2 text-xs text-right w-64 font-bold ">
                          {order.prodName}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Quantity:</p>
                        <p className="px-2 text-xs  text-right w-64  font-bold ">
                          {order.quantity}{" "}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Price:</p>
                        <p className="px-2 text-xs  text-right w-64  font-semibold ">
                          {order.price.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          })}{" "}
                        </p>
                      </p>

                      <p className="flex justify-between">
                        <p className="text-xs font-light">Total:</p>
                        <p className="px-2 text-xs  text-right w-64 font-semibold ">
                          {order.total.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          })}
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Market Type:</p>
                        <p className="px-2 text-xs font-bold ">
                          <p>{order.marketType}</p>
                        </p>
                      </p>
                      <p className="flex justify-between">
                        <p className="text-xs font-light">Status:</p>
                        <p className="px-2 text-xs font-bold ">
                          <p>
                            {order.status ? <>{order.status}</> : <>Pending</>}
                          </p>
                        </p>
                      </p>
                    </div>
                    <Divider className="m-2" />
                    <Accordion mt={2} allowToggle>
                      <AccordionItem border={"none"}>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              <Text className="text-xs">More info.</Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          pb={4}
                          bg={"#ffffff0a"}
                          roundedTop={"md"}
                        >
                          {" "}
                          <p className="h-full space-y-1 overflow-y-auto  mt-1 mb-2 border-solid  rounded-lg  ">
                            <p className="text-xs font-quicksand">
                              Type: {order.types}
                            </p>
                            <p className="text-xs font-quicksand">
                              Message: {order.message}
                            </p>
                          </p>
                          <Divider />
                          <figure className="flex flex-col items-center  ">
                            <div className="flex gap-4 mt-4">
                              {/* Email Button */}
                              <Tooltip label={<MdError />}>
                                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all shadow-md">
                                  <MdEmail className="text-2xl" />
                                </button>
                              </Tooltip>

                              {/* Facebook Button */}
                              <a
                                href={order.sellerFacebook}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Tooltip label="Visit seller facebook Page.">
                                  <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                    <FaFacebookSquare className="text-2xl" />
                                  </button>
                                </Tooltip>
                              </a>

                              {/* Chat Button */}
                              <Tooltip label="Message this seller.">
                                <button
                                  onClick={() => chatButton(order)}
                                  className="flex items-center justify-center  w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-500 transition-all shadow-md"
                                >
                                  <MdMessage className="text-2xl" />
                                </button>
                              </Tooltip>
                            </div>
                          </figure>
                        </AccordionPanel>{" "}
                      </AccordionItem>
                    </Accordion>

                    {/* <button
                      onClick={() => statusHandler(order)}
                      className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center text-sm rounded-md grid  hover:bg-gray-800"
                    >
                      Pay now
                    </button> */}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
      </>
    );
  };
  return (
    <main className="rounded-md pb-4 max-w-full max-h-full justify-items-center grid  bg-gradient-to-tr">
      {" "}
      <div className=" mb-14  rounded-md pt-3 pb-4 max-w-full max-h-full ">
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
                  <Tabs isFitted w={["370px", "390px", "420px"]}>
                    <TabList>
                      <Tab
                        fontSize={11}
                        color={"black.600"}
                        className="font-quicksand"
                      >
                        Pending Checkout
                      </Tab>
                      <Tab
                        fontSize={9}
                        color={"black.600"}
                        className="font-quicksand"
                      >
                        Completed E-Payment
                      </Tab>
                      <Tab
                        fontSize={11}
                        color={"black.600"}
                        className="font-quicksand"
                      >
                        Meet up Pay
                      </Tab>
                      <Tab
                        fontSize={11}
                        color={"black.600"}
                        className="font-quicksand"
                      >
                        History
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel> {pendingCard()}</TabPanel>
                      <TabPanel> {EpaymentCard()}</TabPanel>
                      <TabPanel> {meetUpPayCard()}</TabPanel>
                      <TabPanel>
                        {" "}
                        <Tabs isFitted w={["340px", "350px", "390px"]}>
                          <TabList>
                            {" "}
                            <Tab
                              fontSize={11}
                              color={"black.600"}
                              className="font-quicksand"
                            >
                              Complete Transaction
                            </Tab>
                            <Tab
                              fontSize={11}
                              color={"black.600"}
                              className="font-quicksand"
                            >
                              Item Returned
                            </Tab>
                          </TabList>
                          <TabPanels>
                            <TabPanel> {historySuccessCard()}</TabPanel>
                            <TabPanel> {historyItemReturnedCard()}</TabPanel>
                          </TabPanels>
                        </Tabs>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
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
          <>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <p className="text-center font-quicksand">
                    Transaction of Payment
                  </p>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody className="grid">
                  <Img
                    className="w-44 h-52 justify-self-center"
                    src={orderImg}
                    mb={4}
                  ></Img>
                  <p className=" text-sm font-bold font-bebos">
                    When doing Transaction with a Seller please input payment
                    method below for the rules of our CTU Marketplace. as a
                    Buyer please Cooperate, Thank you.
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
                      right and scams for a seller and so on we can restrict
                      your account and report to school student affairs office.
                    </li>
                    <li>3. Avoid using spam account to purchase item.</li>
                  </ul>
                  <br />

                  <br />
                  <Button justifySelf={"center"} onClick={onOpenSecondDrawer}>
                    Choose Payment Method
                  </Button>
                </ModalBody>

                <ModalFooter></ModalFooter>
              </ModalContent>
            </Modal>
            <Drawer
              placement={"bottom"}
              onClose={onClosedSecondDrawer}
              isOpen={isOpenSecondDrawer}
            >
              <DrawerOverlay />
              <DrawerContent roundedTop={16} justifySelf={"center"} w={"600px"}>
                <DrawerCloseButton
                  as={IconButton}
                  icon={<MdArrowBackIosNew />}
                  size={"lg"}
                  top={3}
                  right={10}
                />
                <DrawerHeader textAlign={"center"}>
                  <Text>Payment</Text>
                </DrawerHeader>
                <DrawerBody>
                  <Img
                    className="w-44 h-52 justify-self-center"
                    src={orderImg}
                    mb={4}
                  ></Img>
                  <form onSubmit={productPurchased}>
                    <div className=" grid  rounded-md">
                      <p className=" text-lg font-bebos">
                        Our Rules of transactions:
                      </p>
                      <ul className="text-sm font-quicksand">
                        <li>
                          1. Cooperate taking a picture of you with ID and
                          product when doing transaction.
                        </li>

                        <li className="">
                          2. Select your method of payment <br />
                        </li>
                      </ul>
                      <div className="m-5 grid gap-6 text-center rounded-md   shadow-lg">
                        <h2 className="text-lg font-bold font-bebos  ">
                          Select Your Payment Method
                        </h2>

                        {/* Meet up Pay */}
                        <button
                          type="button"
                          className="flex items-center justify-center gap-2 border p-4 rounded-lg bg-white hover:bg-green-100 hover:scale-105 transition-transform duration-200 shadow-sm"
                          onClick={() => buttonStatus("Meet up Pay")}
                        >
                          <MdPeople className="text-xl text-green-600" />
                          <span className="font-semibold text-gray-700">
                            Meet up Pay
                          </span>
                        </button>
                        {purchasedSchema.status === "Meet up Pay" && (
                          <div>
                            <center>
                              <button
                                className="mt-4 uppercase font-bebos font-semibold bg-[#ffffff] text-black rounded-md p-2 border hover:bg-green-200 px-7 hover:scale-105 shadow-md"
                                type="submit"
                              >
                                Submit Meet up Pay
                              </button>
                            </center>
                          </div>
                        )}

                        {/* E-Payment */}
                        <button
                          type="button"
                          className="flex items-center justify-center gap-2 border p-4 rounded-lg bg-white hover:bg-blue-100 hover:scale-105 transition-transform duration-200 shadow-sm"
                          onClick={() => {
                            buttonStatus("E-Payment");
                            onOpenThirdDrawer();
                          }}
                        >
                          <MdPayments className="text-xl text-blue-600" />
                          <span className="font-semibold text-gray-700">
                            E-Payment
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            <Drawer
              placement={"bottom"}
              onClose={onClosedThirdDrawer}
              isOpen={isOpenThirdDrawer}
            >
              <DrawerOverlay />
              <DrawerContent roundedTop={16} justifySelf={"center"} w={"600px"}>
                <DrawerCloseButton
                  as={IconButton}
                  icon={<MdArrowBackIosNew />}
                  size={"lg"}
                  top={3}
                  right={10}
                />
                <DrawerHeader>
                  <Text>E Payment Portal</Text>
                </DrawerHeader>

                <form onSubmit={productPurchased}>
                  <iframe
                    src={`https://paymaya.me/ctumarketplace?amt=${statusData.total}`}
                    style={{
                      width: "100%",
                      height: "470px",
                      border: "none",

                      borderRadius: "10px",
                    }}
                  />
                  <center>
                    {" "}
                    <p className="text-xs mt-0.5  font-quicksand">
                      If Payment is Done, Click submit below.
                    </p>
                    <button
                      className="mt-2  bg-[#ffffff] text-black uppercase rounded-md p-1 border  mb-5  px-6 text-xs  font-bebos font-semibold hover:scale-105"
                      type="submit"
                      onClick={() => {
                        buttonStatus("E-Payment");
                      }}
                    >
                      Submit complete
                    </button>
                  </center>
                </form>
              </DrawerContent>
            </Drawer>
          </>
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
