/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import {
  MdCheck,
  MdCheckBox,
  MdEmail,
  MdError,
  MdMessage,
} from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import { FaRegMessage } from "react-icons/fa6";
import { useCookies } from "react-cookie";
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
  useToast,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { TbCircleLetterG, TbViewportWide } from "react-icons/tb";
import logomarket from "../assets/ctu-logo-marketplace.jpg";
import {
  AddIcon,
  CloseIcon,
  CheckIcon,
  AtSignIcon,
  LinkIcon,
} from "@chakra-ui/icons";
import Loader from "../components/Loader";
import ChatPage from "./ChatPage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Transactions({ id }) {
  const [orders, setOrders] = useState([]);
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);
  const toast = useToast();
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const navigate = useNavigate();
  const [newChats, setNewChats] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [doneTransactSchema, setDoneTransactSchema] = useState({
    userId: "",
    cartId: "",
    sellerId: "",
    sellerName: "",
    productId: "",
    sellerEmail: "",
    prodName: "",
    message: "",
    quantity: "",
    buyerName: "",
    buyerEmail: "",
    image: "",
    status: "",
    total: "",
    types: "",
    sellerFacebook: "",
    buyerFacebook: "",
    picture: "",
    price: "",
    buyerPhoneNumber: "",
    sellerPhoneNumber: "",
    buyerGcashNumber: "",
    sellerGcashNumber: "",
    accountType: "",
    buyerType: "",
    tax: "",
  });
  const [imageSubmit, setImageSubmit] = useState([]);
  const [purchasedSchema, setPurchasedSchema] = useState({
    sellerId: "",
    userId: "",
    cartId: "",
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
    picture: "",
    buyerPhoneNumber: "",
    sellerPhoneNumber: "",
    buyerGcashNumber: "",
    sellerGcashNumber: "",
    accountType: "",
    buyerType: "",
  });
  const {
    isOpen: isOpenSecond,
    onOpen: onOpenSecond,
    onClose: onClosedSecond,
  } = useDisclosure();
  const {
    isOpen: isOpenMark,
    onOpen: onOpenMark,
    onClose: onClosedMark,
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

  const [myTransactions, setTransactions] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${baseUrl}/api/transactions/${id}`)
  //     .then((result) => {
  //       setTransactions(result.data);
  //       console.log(result.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error to fetch transaction items.", err);
  //     });
  // }, [id]);

  // useEffect(() => {});

  const fetchTransactions = () => {
    axios
      .get(`${baseUrl}/api/transactions/${id}`)
      .then((result) => {
        setTransactions(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error to fetch transaction items.", err);
      });
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 1000);
    return () => clearInterval(interval);
  }, [id]);

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
        chats2: newChats,
        senderName2: commenterName,
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
  const removeItemClick = (id) => {
    axios
      .delete(`${baseUrl}/api/ordersTransaction/${id}`)
      .then((result) => {
        // navigate("/");
      })
      .catch((err) => {
        console.log("Error to remove this product", err);
      });
  };
  const markTransactions = (id) => {
    setStatusData(id);
    onOpenMark();
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
        navigate("/");
      })
      .catch((err) => {
        console.log("Error to update:", err);
      });
  };
  const purchasedOnChange = (e) => {
    setPurchasedSchema({
      ...purchasedSchema,
      [e.target.name]: e.target.value,
    });
  };
  const buttonStatus = (newStatus) => {
    setPurchasedSchema((prevSchema) => ({
      ...prevSchema,
      status: newStatus,
    }));
  };
  const imageHandler = (e) => {
    setDoneTransactSchema({
      ...doneTransactSchema,
      [e.target.name]: e.target.value,
    });
  };
  const imageHandlerFile = (e) => {
    setImageSubmit(Array.from(e.target.files));
  };

  const [transactLoading, setTransactLoading] = useState(false);
  const submitTransaction = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", doneTransactSchema.userId);
    formData.append("sellerId", doneTransactSchema.sellerId);
    formData.append("cartId", doneTransactSchema.cartId);
    formData.append("sellerName", doneTransactSchema.sellerName);
    formData.append("productId", doneTransactSchema.productId);
    formData.append("sellerEmail", doneTransactSchema.sellerEmail);
    formData.append("prodName", doneTransactSchema.prodName);
    formData.append("message", doneTransactSchema.message);
    formData.append("quantity", doneTransactSchema.quantity);
    formData.append("buyerName", doneTransactSchema.buyerName);
    formData.append("buyerEmail", doneTransactSchema.buyerEmail);
    formData.append("image", doneTransactSchema.image);
    formData.append("status", doneTransactSchema.status);
    formData.append("total", doneTransactSchema.total);
    formData.append("types", doneTransactSchema.types);
    formData.append("tax", doneTransactSchema.tax);
    formData.append("sellerFacebook", doneTransactSchema.sellerFacebook);
    formData.append("buyerFacebook", doneTransactSchema.buyerFacebook);
    formData.append("price", doneTransactSchema.price);
    formData.append("accountType", doneTransactSchema.accountType);
    formData.append("buyerPhoneNumber", doneTransactSchema.buyerPhoneNumber);
    formData.append("sellerPhoneNumber", doneTransactSchema.sellerPhoneNumber);
    formData.append("buyerGcashNumber", doneTransactSchema.buyerGcashNumber);
    formData.append("sellerGcashNumber", doneTransactSchema.sellerGcashNumber);
    formData.append("buyerType", doneTransactSchema.buyerType);
    imageSubmit.forEach((pictures) => {
      formData.append("picture", pictures);
    });
    try {
      setTransactLoading(true);
      const res = await axios.post(`${baseUrl}/api/DonePurchased`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Uploaded", res.data.picture);
      setDoneTransactSchema({
        userId: "",
        sellerId: "",
        cartId: "",
        sellerName: "",
        productId: "",
        sellerEmail: "",
        prodName: "",
        message: "",
        quantity: "",
        buyerName: "",
        buyerEmail: "",
        image: "",
        status: "",
        total: "",
        types: "",
        sellerFacebook: "",
        buyerFacebook: "",
        picture: "",
        price: "",
        tax: "",
        buyerPhoneNumber: "",
        sellerPhoneNumber: "",
        buyerGcashNumber: "",
        sellerGcashNumber: "",
        accountType: "",
      });
      setImageSubmit([]);
      console.log("Submitted");
      toast({
        position: "top",
        title: "Transaction submitted.",
        description: "Your refund request has been successfully submitted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClosedMark();
    } catch (error) {
      console.log("Error uploading file", error);
      toast({
        title: "Error submitting Transaction.",
        description:
          "There was an error submitting your Transaction. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setTransactLoading(false);
    }
  };
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const drawer = () => {
    onOpenDrawer();
  };

  const price = statusData.price;
  const quantity = statusData.quantity;
  const total = price * quantity;
  const tax = total * 0.01;
  const totalWithTax = total - tax;

  const EpaymentCard = () => {
    return (
      <div className="">
        {myTransactions
          .filter(
            (item) =>
              item.transactionStatus === undefined &&
              item.status === "E-Payment"
          )
          .map((item) => (
            <div
              className="mt-1 border-solid rounded-2xl mb-5 max-w-full   "
              key={item._id}
            >
              <div className="flex ">
                <figure className="mr-2">
                  <img
                    className="  max-w-full max-h-full ssm:w-44  lg:w-40 h-20 object-cover bg-fixed"
                    src={item.image}
                    alt=""
                  />
                </figure>

                <figure className="grid  rounded-md  ssm:mx-1 lg:mx-3 bottom-2 font-quicksand text-sm">
                  <p className="text-xl grid grid-cols-2">
                    <p className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                      {item.prodName}
                    </p>
                    <Flex justifyContent={"end"} mx={1} gap={1}>
                      <Tooltip label={`View ${item.prodName}`}>
                        <Link
                          to={`/ProductId/${item.productId}#item`}
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
                              Cancel Transaction? <br /> {item.prodName}
                            </Text>
                          </PopoverHeader>
                          <PopoverBody>
                            <button
                              className="justify-self-center flex text-sm hover:shadow-inner hover:scale-110"
                              onClick={() => {
                                removeItemClick(item._id);
                              }}
                            >
                              Confirm
                            </button>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Flex>
                    <figure>
                      {item.transactionStatus === "Success" && (
                        <>
                          {" "}
                          <Tooltip label="Transaction Success: Item Received">
                            <div className="bg-emerald-700 text-white text-center rounded-lg text-xs w-20">
                              {item.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {item.transactionStatus === undefined && (
                        <Tooltip label="Transaction Status Pending">
                          <div className="bg-gray-800 text-white text-center rounded-lg text-xs w-20">
                            In Proccess
                          </div>
                        </Tooltip>
                      )}
                      {item.transactionStatus === "Item Returned" && (
                        <>
                          <Tooltip label="Transaction Status: Item Returned.">
                            <div className="bg-orange-600 text-white text-center rounded-lg text-xs w-24">
                              {item.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {item.marketType === "Trading" && (
                        <>
                          <p className="text-xs mt-2 font-quicksand text-orange-400">
                            {item.marketType}
                          </p>
                        </>
                      )}
                      {item.marketType === "Selling" && (
                        <>
                          <p className="text-xs mt-2 font-quicksand text-emerald-400">
                            {item.marketType}
                          </p>
                        </>
                      )}
                    </figure>
                    <figure className="justify-self-end text-xs ">
                      <article>
                        {" "}
                        <p className="flex">
                          <p className="">{item.quantity}</p>
                        </p>
                        <p className="flex ">
                          <p className="">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex">
                          <p className="">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                      </article>
                    </figure>
                  </p>
                </figure>
              </div>
              {item.marketType === "Selling" && (
                <Accordion mt={2} allowToggle>
                  <AccordionItem border={"none"} borderBottom={"solid"}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Text className="text-xs">View Details</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
                      <div className="grid grid-cols-2 pt-1">
                        <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                          <LinkIcon className="mr-1 mt-1" />
                          {item.buyerName}
                        </p>
                        <Tooltip label="Buyer Account Type">
                          <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                            {item.buyerType}
                          </p>
                        </Tooltip>
                      </div>
                      {item.buyerType === "Student" && (
                        <>
                          {" "}
                          <Link to={`/UserAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}
                      {item.buyerType === "Faculty" && (
                        <>
                          {" "}
                          <Link to={`/FacultyAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}

                      <Divider className="m-2" />
                      <div className="space-y-1">
                        <p className="flex justify-between ">
                          <p className="text-xs font-light">Item:</p>
                          <p className="px-2 text-xs text-right w-64 font-bold ">
                            {item.prodName}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Quantity:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {item.quantity}{" "}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Price:</p>
                          <p className="px-2 text-xs  text-right w-64  font-semibold ">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}{" "}
                          </p>
                        </p>

                        <p className="flex justify-between">
                          <p className="text-xs font-light">Total:</p>
                          <p className="px-2 text-xs  text-right w-64 font-semibold ">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Market Type:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>{item.marketType}</p>
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Status:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>
                              {item.status ? <>{item.status}</> : <>Pending</>}
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
                                Type: {item.types}
                              </p>
                              <p className="text-xs font-quicksand">
                                Message: {item.message}
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
                                  href={item.buyerFacebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Tooltip label="Visit buyer facebook Page.">
                                    <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </Tooltip>
                                </a>

                                {/* Chat Button */}
                                <Tooltip label="Message this buyer.">
                                  <button
                                    onClick={() => chatButton(item)}
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
                        size="xs"
                        onClick={() => markTransactions(item)}
                        className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center  text-sm rounded-md flex justify-center  hover:bg-gray-800"
                      >
                        Submit Transaction{" "}
                        <MdCheck className="text-base mt-0.5 ml-3" />
                      </button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
              {item.marketType === "Trading" && (
                <Accordion mt={2} allowToggle>
                  <AccordionItem border={"none"} borderBottom={"solid"}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Text className="text-xs">View Details</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
                      <div className="grid grid-cols-2 pt-1">
                        <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                          <LinkIcon className="mr-1 mt-1" />
                          {item.buyerName}
                        </p>
                        <Tooltip label="Buyer Account Type">
                          <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                            {item.buyerType}
                          </p>
                        </Tooltip>
                      </div>
                      {item.buyerType === "Student" && (
                        <>
                          {" "}
                          <Link to={`/UserAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}
                      {item.buyerType === "Faculty" && (
                        <>
                          {" "}
                          <Link to={`/FacultyAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}

                      <Divider className="m-2" />

                      <div className="space-y-1">
                        <p className="flex justify-between ">
                          <p className="text-xs font-light">Item:</p>
                          <p className="px-2 text-xs text-right w-64 font-bold ">
                            {item.prodName}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Trade sched:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {new Date(item.tradeSchedule).toLocaleTimeString(
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
                            {item.quantity}{" "}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Price:</p>
                          <p className="px-2 text-xs  text-right w-64  font-semibold ">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}{" "}
                          </p>
                        </p>
                        {item.addTradeMoney === null || 0 || undefined ? (
                          <></>
                        ) : (
                          <p className="flex justify-between">
                            <p className="text-xs font-light">Additional:</p>
                            <p className="px-2 text-xs  text-right w-64  font-semibold ">
                              {item.addTradeMoney.toLocaleString("en-PH", {
                                style: "currency",
                                currency: "PHP",
                              })}{" "}
                            </p>
                          </p>
                        )}
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Total:</p>
                          <p className="px-2 text-xs  text-right w-64 font-semibold ">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Market Type:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>{item.marketType}</p>
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Status:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>
                              {item.status ? <>{item.status}</> : <>Pending</>}
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
                                Type: {item.types}
                              </p>
                              <p className="text-xs font-quicksand">
                                Message: {item.message}
                              </p>
                              <Image
                                className="w-32 justify-self-center cursor-pointer  h-32"
                                onClick={() => {
                                  setOpen(true);
                                  setCurrentImage(item.tradeImage);
                                }}
                                src={item.tradeImage}
                              />
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
                                  href={item.buyerFacebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Tooltip label="Visit buyer facebook Page.">
                                    <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </Tooltip>
                                </a>

                                {/* Chat Button */}
                                <Tooltip label="Message this buyer.">
                                  <button
                                    onClick={() => chatButton(item)}
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
                        size="xs"
                        onClick={() => markTransactions(item)}
                        className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center  text-sm rounded-md flex justify-center  hover:bg-gray-800"
                      >
                        Submit Transaction{" "}
                        <MdCheck className="text-base mt-0.5 ml-3" />
                      </button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ))}
      </div>
    );
  };

  const meetUpPayCard = () => {
    return (
      <div className="">
        {myTransactions
          .filter(
            (item) =>
              item.transactionStatus === undefined &&
              item.status === "Meet up Pay"
          )
          .map((item) => (
            <div
              className="mt-1 border-solid rounded-2xl mb-5 max-w-full   "
              key={item._id}
            >
              <div className="flex ">
                <figure className="mr-2">
                  <img
                    className="  max-w-full max-h-full ssm:w-44  lg:w-40 h-20 object-cover bg-fixed"
                    src={item.image}
                    alt=""
                  />
                </figure>

                <figure className="grid  rounded-md  ssm:mx-1 lg:mx-3 bottom-2 font-quicksand text-sm">
                  <p className="text-xl grid grid-cols-2">
                    <p className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                      {item.prodName}
                    </p>
                    <Flex justifyContent={"end"} mx={1} gap={1}>
                      <Tooltip label={`View ${item.prodName}`}>
                        <Link
                          to={`/ProductId/${item.productId}#item`}
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
                              Cancel Transaction? <br /> {item.prodName}
                            </Text>
                          </PopoverHeader>
                          <PopoverBody>
                            <button
                              className="justify-self-center flex text-sm hover:shadow-inner hover:scale-110"
                              onClick={() => {
                                removeItemClick(item._id);
                              }}
                            >
                              Confirm
                            </button>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Flex>
                    <figure>
                      {item.transactionStatus === "Success" && (
                        <>
                          {" "}
                          <Tooltip label="Transaction Success: Item Received">
                            <div className="bg-emerald-700 text-white text-center rounded-lg text-xs w-20">
                              {item.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {item.transactionStatus === undefined && (
                        <Tooltip label="Transaction Status Pending">
                          <div className="bg-gray-800 text-white text-center rounded-lg text-xs w-20">
                            In Proccess
                          </div>
                        </Tooltip>
                      )}
                      {item.transactionStatus === "Item Returned" && (
                        <>
                          <Tooltip label="Transaction Status: Item Returned.">
                            <div className="bg-orange-600 text-white text-center rounded-lg text-xs w-24">
                              {item.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {item.marketType === "Trading" && (
                        <>
                          <p className="text-xs mt-2 font-quicksand text-orange-400">
                            {item.marketType}
                          </p>
                        </>
                      )}
                      {item.marketType === "Selling" && (
                        <>
                          <p className="text-xs mt-2 font-quicksand text-emerald-400">
                            {item.marketType}
                          </p>
                        </>
                      )}
                    </figure>
                    <figure className="justify-self-end text-xs ">
                      <article>
                        {" "}
                        <p className="flex">
                          <p className="">{item.quantity}</p>
                        </p>
                        <p className="flex ">
                          <p className="">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex">
                          <p className="">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                      </article>
                    </figure>
                  </p>
                </figure>
              </div>
              {item.marketType === "Selling" && (
                <Accordion mt={2} allowToggle>
                  <AccordionItem border={"none"} borderBottom={"solid"}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Text className="text-xs">View Details</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
                      <div className="grid grid-cols-2 pt-1">
                        <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                          <LinkIcon className="mr-1 mt-1" />
                          {item.buyerName}
                        </p>
                        <Tooltip label="Buyer Account Type">
                          <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                            {item.buyerType}
                          </p>
                        </Tooltip>
                      </div>
                      {item.buyerType === "Student" && (
                        <>
                          {" "}
                          <Link to={`/UserAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}
                      {item.buyerType === "Faculty" && (
                        <>
                          {" "}
                          <Link to={`/FacultyAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}

                      <Divider className="m-2" />
                      <div className="space-y-1">
                        <p className="flex justify-between ">
                          <p className="text-xs font-light">Item:</p>
                          <p className="px-2 text-xs text-right w-64 font-bold ">
                            {item.prodName}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Quantity:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {item.quantity}{" "}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Price:</p>
                          <p className="px-2 text-xs  text-right w-64  font-semibold ">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}{" "}
                          </p>
                        </p>

                        <p className="flex justify-between">
                          <p className="text-xs font-light">Total:</p>
                          <p className="px-2 text-xs  text-right w-64 font-semibold ">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Market Type:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>{item.marketType}</p>
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Status:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>
                              {item.status ? <>{item.status}</> : <>Pending</>}
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
                                Type: {item.types}
                              </p>
                              <p className="text-xs font-quicksand">
                                Message: {item.message}
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
                                  href={item.buyerFacebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Tooltip label="Visit buyer facebook Page.">
                                    <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </Tooltip>
                                </a>

                                {/* Chat Button */}
                                <Tooltip label="Message this buyer.">
                                  <button
                                    onClick={() => chatButton(item)}
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
                        size="xs"
                        onClick={() => markTransactions(item)}
                        className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center  text-sm rounded-md flex justify-center  hover:bg-gray-800"
                      >
                        Submit Transaction{" "}
                        <MdCheck className="text-base mt-0.5 ml-3" />
                      </button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
              {item.marketType === "Trading" && (
                <Accordion mt={2} allowToggle>
                  <AccordionItem border={"none"} borderBottom={"solid"}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Text className="text-xs">View Details</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
                      <div className="grid grid-cols-2 pt-1">
                        <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                          <LinkIcon className="mr-1 mt-1" />
                          {item.buyerName}
                        </p>
                        <Tooltip label="Buyer Account Type">
                          <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                            {item.buyerType}
                          </p>
                        </Tooltip>
                      </div>
                      {item.buyerType === "Student" && (
                        <>
                          {" "}
                          <Link to={`/UserAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}
                      {item.buyerType === "Faculty" && (
                        <>
                          {" "}
                          <Link to={`/FacultyAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}

                      <Divider className="m-2" />

                      <div className="space-y-1">
                        <p className="flex justify-between ">
                          <p className="text-xs font-light">Item:</p>
                          <p className="px-2 text-xs text-right w-64 font-bold ">
                            {item.prodName}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Trade sched:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {new Date(item.tradeSchedule).toLocaleTimeString(
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
                            {item.quantity}{" "}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Price:</p>
                          <p className="px-2 text-xs  text-right w-64  font-semibold ">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}{" "}
                          </p>
                        </p>
                        {item.addTradeMoney === null || 0 || undefined ? (
                          <></>
                        ) : (
                          <p className="flex justify-between">
                            <p className="text-xs font-light">Additional:</p>
                            <p className="px-2 text-xs  text-right w-64  font-semibold ">
                              {item.addTradeMoney.toLocaleString("en-PH", {
                                style: "currency",
                                currency: "PHP",
                              })}{" "}
                            </p>
                          </p>
                        )}
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Total:</p>
                          <p className="px-2 text-xs  text-right w-64 font-semibold ">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Market Type:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>{item.marketType}</p>
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Status:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>
                              {item.status ? <>{item.status}</> : <>Pending</>}
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
                                Type: {item.types}
                              </p>
                              <p className="text-xs font-quicksand">
                                Message: {item.message}
                              </p>
                              <Image
                                className="w-32 justify-self-center cursor-pointer  h-32"
                                onClick={() => {
                                  setOpen(true);
                                  setCurrentImage(item.tradeImage);
                                }}
                                src={item.tradeImage}
                              />
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
                                  href={item.buyerFacebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Tooltip label="Visit buyer facebook Page.">
                                    <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </Tooltip>
                                </a>

                                {/* Chat Button */}
                                <Tooltip label="Message this buyer.">
                                  <button
                                    onClick={() => chatButton(item)}
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
                        size="xs"
                        onClick={() => markTransactions(item)}
                        className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center  text-sm rounded-md flex justify-center  hover:bg-gray-800"
                      >
                        Submit Transaction{" "}
                        <MdCheck className="text-base mt-0.5 ml-3" />
                      </button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ))}
      </div>
    );
  };

  const historySuccessCard = () => {
    return (
      <div className="">
        {myTransactions
          .filter((item) => item.transactionStatus === "Success")
          .map((item) => (
            <div
              className="mt-1 border-solid rounded-2xl mb-5 max-w-full   "
              key={item._id}
            >
              <div className="flex ">
                <figure className="mr-2">
                  <img
                    className="  max-w-full max-h-full ssm:w-44  lg:w-40 h-20 object-cover bg-fixed"
                    src={item.image}
                    alt=""
                  />
                </figure>

                <figure className="grid  rounded-md  ssm:mx-1 lg:mx-3 bottom-2 font-quicksand text-sm">
                  <p className="text-xl grid grid-cols-2">
                    <p className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                      {item.prodName}
                    </p>
                    <Flex justifyContent={"end"} mx={1} gap={1}>
                      <Tooltip label={`View ${item.prodName}`}>
                        <Link
                          to={`/ProductId/${item.productId}#item`}
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
                              Delete in history? <br /> {item.prodName}
                            </Text>
                          </PopoverHeader>
                          <PopoverBody>
                            <button
                              className="justify-self-center flex text-sm hover:shadow-inner hover:scale-110"
                              onClick={() => {
                                removeItemClick(item._id);
                              }}
                            >
                              Confirm
                            </button>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Flex>
                    <figure>
                      {item.transactionStatus === "Success" && (
                        <>
                          {" "}
                          <Tooltip label="Transaction Success: Item Received">
                            <div className="bg-emerald-700 text-white text-center rounded-lg text-xs w-20">
                              {item.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {item.transactionStatus === undefined && (
                        <Tooltip label="Transaction Status Pending">
                          <div className="bg-gray-800 text-white text-center rounded-lg text-xs w-20">
                            In Proccess
                          </div>
                        </Tooltip>
                      )}
                      {item.transactionStatus === "Item Returned" && (
                        <>
                          <Tooltip label="Transaction Status: Item Returned.">
                            <div className="bg-orange-600 text-white text-center rounded-lg text-xs w-24">
                              {item.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {item.marketType === "Trading" && (
                        <>
                          <p className="text-xs mt-2 font-quicksand text-orange-400">
                            {item.marketType}
                          </p>
                        </>
                      )}
                      {item.marketType === "Selling" && (
                        <>
                          <p className="text-xs mt-2 font-quicksand text-emerald-400">
                            {item.marketType}
                          </p>
                        </>
                      )}
                    </figure>
                    <figure className="justify-self-end text-xs ">
                      <article>
                        {" "}
                        <p className="flex">
                          <p className="">{item.quantity}</p>
                        </p>
                        <p className="flex ">
                          <p className="">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex">
                          <p className="">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                      </article>
                    </figure>
                  </p>
                </figure>
              </div>
              {item.marketType === "Selling" && (
                <Accordion mt={2} allowToggle>
                  <AccordionItem border={"none"} borderBottom={"solid"}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Text className="text-xs">View Details</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
                      <div className="grid grid-cols-2 pt-1">
                        <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                          <LinkIcon className="mr-1 mt-1" />
                          {item.buyerName}
                        </p>
                        <Tooltip label="Buyer Account Type">
                          <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                            {item.buyerType}
                          </p>
                        </Tooltip>
                      </div>
                      {item.buyerType === "Student" && (
                        <>
                          {" "}
                          <Link to={`/UserAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}
                      {item.buyerType === "Faculty" && (
                        <>
                          {" "}
                          <Link to={`/FacultyAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}

                      <Divider className="m-2" />
                      <div className="space-y-1">
                        <p className="flex justify-between ">
                          <p className="text-xs font-light">Item:</p>
                          <p className="px-2 text-xs text-right w-64 font-bold ">
                            {item.prodName}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Quantity:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {item.quantity}{" "}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Price:</p>
                          <p className="px-2 text-xs  text-right w-64  font-semibold ">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}{" "}
                          </p>
                        </p>

                        <p className="flex justify-between">
                          <p className="text-xs font-light">Total:</p>
                          <p className="px-2 text-xs  text-right w-64 font-semibold ">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Market Type:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>{item.marketType}</p>
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Status:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>
                              {item.status ? <>{item.status}</> : <>Pending</>}
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
                                Type: {item.types}
                              </p>
                              <p className="text-xs font-quicksand">
                                Message: {item.message}
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
                                  href={item.buyerFacebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Tooltip label="Visit buyer facebook Page.">
                                    <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </Tooltip>
                                </a>

                                {/* Chat Button */}
                                <Tooltip label="Message this buyer.">
                                  <button
                                    onClick={() => chatButton(item)}
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
                        size="xs"
                        onClick={() => markTransactions(item)}
                        className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center  text-sm rounded-md flex justify-center  hover:bg-gray-800"
                      >
                        Submit Transaction{" "}
                        <MdCheck className="text-base mt-0.5 ml-3" />
                      </button> */}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
              {item.marketType === "Trading" && (
                <Accordion mt={2} allowToggle>
                  <AccordionItem border={"none"} borderBottom={"solid"}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Text className="text-xs">View Details</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
                      <div className="grid grid-cols-2 pt-1">
                        <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                          <LinkIcon className="mr-1 mt-1" />
                          {item.buyerName}
                        </p>
                        <Tooltip label="Buyer Account Type">
                          <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                            {item.buyerType}
                          </p>
                        </Tooltip>
                      </div>
                      {item.buyerType === "Student" && (
                        <>
                          {" "}
                          <Link to={`/UserAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}
                      {item.buyerType === "Faculty" && (
                        <>
                          {" "}
                          <Link to={`/FacultyAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}

                      <Divider className="m-2" />

                      <div className="space-y-1">
                        <p className="flex justify-between ">
                          <p className="text-xs font-light">Item:</p>
                          <p className="px-2 text-xs text-right w-64 font-bold ">
                            {item.prodName}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Trade sched:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {new Date(item.tradeSchedule).toLocaleTimeString(
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
                            {item.quantity}{" "}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Price:</p>
                          <p className="px-2 text-xs  text-right w-64  font-semibold ">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}{" "}
                          </p>
                        </p>
                        {item.addTradeMoney === null || 0 || undefined ? (
                          <></>
                        ) : (
                          <p className="flex justify-between">
                            <p className="text-xs font-light">Additional:</p>
                            <p className="px-2 text-xs  text-right w-64  font-semibold ">
                              {item.addTradeMoney.toLocaleString("en-PH", {
                                style: "currency",
                                currency: "PHP",
                              })}{" "}
                            </p>
                          </p>
                        )}
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Total:</p>
                          <p className="px-2 text-xs  text-right w-64 font-semibold ">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Market Type:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>{item.marketType}</p>
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Status:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>
                              {item.status ? <>{item.status}</> : <>Pending</>}
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
                                Type: {item.types}
                              </p>
                              <p className="text-xs font-quicksand">
                                Message: {item.message}
                              </p>
                              <Image
                                className="w-32 justify-self-center cursor-pointer  h-32"
                                onClick={() => {
                                  setOpen(true);
                                  setCurrentImage(item.tradeImage);
                                }}
                                src={item.tradeImage}
                              />
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
                                  href={item.buyerFacebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Tooltip label="Visit buyer facebook Page.">
                                    <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </Tooltip>
                                </a>

                                {/* Chat Button */}
                                <Tooltip label="Message this buyer.">
                                  <button
                                    onClick={() => chatButton(item)}
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
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ))}
      </div>
    );
  };

  const historyItemReturnedCard = () => {
    return (
      <div className="">
        {myTransactions
          .filter((item) => item.transactionStatus === "Item Returned")
          .map((item) => (
            <div
              className="mt-1 border-solid rounded-2xl mb-5 max-w-full   "
              key={item._id}
            >
              <div className="flex ">
                <figure className="mr-2">
                  <img
                    className="  max-w-full max-h-full ssm:w-44  lg:w-40 h-20 object-cover bg-fixed"
                    src={item.image}
                    alt=""
                  />
                </figure>

                <figure className="grid  rounded-md  ssm:mx-1 lg:mx-3 bottom-2 font-quicksand text-sm">
                  <p className="text-xl grid grid-cols-2">
                    <p className="truncate ssm:w-32 lg:w-52 pr-2 text-start">
                      {item.prodName}
                    </p>
                    <Flex justifyContent={"end"} mx={1} gap={1}>
                      <Tooltip label={`View ${item.prodName}`}>
                        <Link
                          to={`/ProductId/${item.productId}#item`}
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
                              Delete in History? <br /> {item.prodName}
                            </Text>
                          </PopoverHeader>
                          <PopoverBody>
                            <button
                              className="justify-self-center flex text-sm hover:shadow-inner hover:scale-110"
                              onClick={() => {
                                removeItemClick(item._id);
                              }}
                            >
                              Confirm
                            </button>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Flex>
                    <figure>
                      {item.transactionStatus === "Success" && (
                        <>
                          {" "}
                          <Tooltip label="Transaction Success: Item Received">
                            <div className="bg-emerald-700 text-white text-center rounded-lg text-xs w-20">
                              {item.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {item.transactionStatus === undefined && (
                        <Tooltip label="Transaction Status Pending">
                          <div className="bg-gray-800 text-white text-center rounded-lg text-xs w-20">
                            In Proccess
                          </div>
                        </Tooltip>
                      )}
                      {item.transactionStatus === "Item Returned" && (
                        <>
                          <Tooltip label="Transaction Status: Item Returned.">
                            <div className="bg-orange-600 text-white text-center rounded-lg text-xs w-24">
                              {item.transactionStatus}
                            </div>
                          </Tooltip>
                        </>
                      )}
                      {item.marketType === "Trading" && (
                        <>
                          <p className="text-xs mt-2 font-quicksand text-orange-400">
                            {item.marketType}
                          </p>
                        </>
                      )}
                      {item.marketType === "Selling" && (
                        <>
                          <p className="text-xs mt-2 font-quicksand text-emerald-400">
                            {item.marketType}
                          </p>
                        </>
                      )}
                    </figure>
                    <figure className="justify-self-end text-xs ">
                      <article>
                        {" "}
                        <p className="flex">
                          <p className="">{item.quantity}</p>
                        </p>
                        <p className="flex ">
                          <p className="">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex">
                          <p className="">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                      </article>
                    </figure>
                  </p>
                </figure>
              </div>
              {item.marketType === "Selling" && (
                <Accordion mt={2} allowToggle>
                  <AccordionItem border={"none"} borderBottom={"solid"}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Text className="text-xs">View Details</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
                      <div className="grid grid-cols-2 pt-1">
                        <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                          <LinkIcon className="mr-1 mt-1" />
                          {item.buyerName}
                        </p>
                        <Tooltip label="Buyer Account Type">
                          <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                            {item.buyerType}
                          </p>
                        </Tooltip>
                      </div>
                      {item.buyerType === "Student" && (
                        <>
                          {" "}
                          <Link to={`/UserAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}
                      {item.buyerType === "Faculty" && (
                        <>
                          {" "}
                          <Link to={`/FacultyAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}

                      <Divider className="m-2" />
                      <div className="space-y-1">
                        <p className="flex justify-between ">
                          <p className="text-xs font-light">Item:</p>
                          <p className="px-2 text-xs text-right w-64 font-bold ">
                            {item.prodName}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Quantity:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {item.quantity}{" "}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Price:</p>
                          <p className="px-2 text-xs  text-right w-64  font-semibold ">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}{" "}
                          </p>
                        </p>

                        <p className="flex justify-between">
                          <p className="text-xs font-light">Total:</p>
                          <p className="px-2 text-xs  text-right w-64 font-semibold ">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Market Type:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>{item.marketType}</p>
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Status:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>
                              {item.status ? <>{item.status}</> : <>Pending</>}
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
                                Type: {item.types}
                              </p>
                              <p className="text-xs font-quicksand">
                                Message: {item.message}
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
                                  href={item.buyerFacebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Tooltip label="Visit buyer facebook Page.">
                                    <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </Tooltip>
                                </a>

                                {/* Chat Button */}
                                <Tooltip label="Message this buyer.">
                                  <button
                                    onClick={() => chatButton(item)}
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
                        size="xs"
                        onClick={() => markTransactions(item)}
                        className="px-6 w-full pt-2 pb-2 font-quicksand mt-1 p-1 bg-gray-900 text-white text-center  text-sm rounded-md flex justify-center  hover:bg-gray-800"
                      >
                        Submit Transaction{" "}
                        <MdCheck className="text-base mt-0.5 ml-3" />
                      </button> */}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
              {item.marketType === "Trading" && (
                <Accordion mt={2} allowToggle>
                  <AccordionItem border={"none"} borderBottom={"solid"}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Text className="text-xs">View Details</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg={"#ffffff0a"} roundedTop={"md"}>
                      <div className="grid grid-cols-2 pt-1">
                        <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                          <LinkIcon className="mr-1 mt-1" />
                          {item.buyerName}
                        </p>
                        <Tooltip label="Buyer Account Type">
                          <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                            {item.buyerType}
                          </p>
                        </Tooltip>
                      </div>
                      {item.buyerType === "Student" && (
                        <>
                          {" "}
                          <Link to={`/UserAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}
                      {item.buyerType === "Faculty" && (
                        <>
                          {" "}
                          <Link to={`/FacultyAccount/${item.buyerEmail}`}>
                            <p className="text-xs font-thin font-quicksand truncate w-52 underline">
                              <AtSignIcon className="mt-1 mr-1" />
                              {item.buyerEmail}
                            </p>
                          </Link>
                        </>
                      )}

                      <Divider className="m-2" />

                      <div className="space-y-1">
                        <p className="flex justify-between ">
                          <p className="text-xs font-light">Item:</p>
                          <p className="px-2 text-xs text-right w-64 font-bold ">
                            {item.prodName}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Trade sched:</p>
                          <p className="px-2 text-xs  text-right w-64  font-bold ">
                            {new Date(item.tradeSchedule).toLocaleTimeString(
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
                            {item.quantity}{" "}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Price:</p>
                          <p className="px-2 text-xs  text-right w-64  font-semibold ">
                            {item.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}{" "}
                          </p>
                        </p>
                        {item.addTradeMoney === null || 0 || undefined ? (
                          <></>
                        ) : (
                          <p className="flex justify-between">
                            <p className="text-xs font-light">Additional:</p>
                            <p className="px-2 text-xs  text-right w-64  font-semibold ">
                              {item.addTradeMoney.toLocaleString("en-PH", {
                                style: "currency",
                                currency: "PHP",
                              })}{" "}
                            </p>
                          </p>
                        )}
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Total:</p>
                          <p className="px-2 text-xs  text-right w-64 font-semibold ">
                            {item.total.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Market Type:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>{item.marketType}</p>
                          </p>
                        </p>
                        <p className="flex justify-between">
                          <p className="text-xs font-light">Status:</p>
                          <p className="px-2 text-xs font-bold ">
                            <p>
                              {item.status ? <>{item.status}</> : <>Pending</>}
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
                                Type: {item.types}
                              </p>
                              <p className="text-xs font-quicksand">
                                Message: {item.message}
                              </p>
                              <Image
                                className="w-32 justify-self-center cursor-pointer  h-32"
                                onClick={() => {
                                  setOpen(true);
                                  setCurrentImage(item.tradeImage);
                                }}
                                src={item.tradeImage}
                              />
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
                                  href={item.buyerFacebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Tooltip label="Visit buyer facebook Page.">
                                    <button className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md">
                                      <FaFacebookSquare className="text-2xl" />
                                    </button>
                                  </Tooltip>
                                </a>

                                {/* Chat Button */}
                                <Tooltip label="Message this buyer.">
                                  <button
                                    onClick={() => chatButton(item)}
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
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ))}
      </div>
    );
  };

  return (
    <main className="rounded-md pb-4 max-w-full max-h-full justify-items-center grid  bg-gradient-to-tr">
      {" "}
      <div className=" mb-14  rounded-md pt-3 pb-4 max-w-full max-h-full ">
        <div className=" md:shrink-0 grid  justify-items-center grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 ">
          {loading ? (
            <>
              {" "}
              <div className="fixed mt-32 ">
                <Loader />
              </div>
            </>
          ) : (
            <>
              {myTransactions.length === 0 ? (
                <div className=" absolute  text-xl font-thin font-quicksand  mt-10">
                  Empty Transaction
                </div>
              ) : (
                <>
                  <Tabs isFitted w={["370px", "390px", "420px"]}>
                    <TabList>
                      <Tab
                        fontSize={9}
                        color={"black.600"}
                        className="font-quicksand"
                      >
                        E-Payment
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
                      <TabPanel> {EpaymentCard()}</TabPanel>
                      <TabPanel> {meetUpPayCard()}</TabPanel>
                      <TabPanel>
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
                  <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={[{ src: currentImage }]}
                    plugins={[Zoom]}
                  />
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
            <DrawerContent rounded={"xl"} m={2}>
              <DrawerCloseButton />
              <DrawerHeader>
                {" "}
                <div className="gap-1.5  text-xs grid grid-cols-2">
                  <p className=" font-bold">Buyers Info</p>

                  <p className="text-xs font-thin font-quicksand flex gap-2 truncate w-40">
                    <p>Product: </p>
                    {statusData.prodName}
                  </p>

                  {statusData.buyerType === "Student" && (
                    <>
                      {" "}
                      <Link to={`/UserAccount/${statusData.buyerEmail}`}>
                        <p className="text-xs font-thin font-quicksand truncate w-40 underline">
                          {statusData.buyerEmail}
                        </p>
                      </Link>
                    </>
                  )}
                  {statusData.buyerType === "Faculty" && (
                    <>
                      {" "}
                      <Link to={`/FacultyAccount/${statusData.buyerEmail}`}>
                        <p className="text-xs font-thin font-quicksand truncate w-40 underline">
                          {statusData.buyerEmail}
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
                <ChatPage userEmail={statusData.buyerEmail} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
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
                  <div className="border px-2 rounded-md  h-80 overflow-y-auto">
                    {statusData.chat.map((chat, index) => (
                      <div key={index._id}>
                        {chat.chats && (
                          <div
                            className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block mb-2 mt-2"
                            style={{ textAlign: "left" }}
                          >
                            <strong className="text-xs">
                              {chat.senderName}
                            </strong>
                            <p>{chat.chats}</p>
                          </div>
                        )}
                        {chat.chats2 && (
                          <div style={{ textAlign: "right" }}>
                            <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block mt-2 mb-2">
                              <p>{chat.chats2}</p>
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
                        className="border bg-transparent mt-2 rounded-md px-2 p-2 w-4/5"
                        type="text"
                        value={newChats}
                        placeholder="Message to buyer."
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
                {isFaculty && (
                  <div>
                    <form onSubmit={chatForm}>
                      <input
                        className="border bg-transparent mt-2 rounded-md px-2 p-2 w-4/5"
                        type="text"
                        value={newChats}
                        placeholder="Message to buyer."
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
        {/* modal for transaction mark as done button */}
        {statusData && (
          <Modal onClose={onClosedMark} size={size} isOpen={isOpenMark}>
            <ModalOverlay />
            <ModalContent border={"dashed"} borderColor={"GrayText"}>
              <ModalHeader>
                <p className="text-center font-quicksand">
                  Payment Slip of Transactions
                </p>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p className=" text-sm font-bold font-bebos">
                  As a seller in the CTU Marketplace, please follow the rules
                  and procedures outlined below to ensure a smooth and secure
                  transaction process. Your cooperation is essential to maintain
                  a safe marketplace for everyone. Thank you.
                </p>
                <br />
                <p className=" text-lg font-bebos">Strict Guidelines:</p>
                <ul className="text-sm font-quicksand">
                  <li>
                    1. All transactions must occur within the campus to ensure
                    safety for both parties.
                  </li>
                  <li>
                    2. We monitor all activities to prevent fraudulent actions.
                    If any suspicious activity is detected, your account may be
                    restricted, and the matter will be reported to the school’s
                    student affairs office.
                  </li>
                  <li>
                    3. Only legitimate, verified accounts are allowed to conduct
                    transactions. Fake or spam accounts will be removed from the
                    platform.
                  </li>
                  <br></br>
                  <p className=" text-lg font-bebos">Transaction Rules:</p>

                  <li>
                    1. You must deliver the product to the CTU Marketplace Team
                    (admin), not directly to the buyer. The drop-off point is in
                    the COT study area.
                  </li>
                  <li>
                    2. Ensure that the product is in its agreed-upon condition
                    and ready for handover.
                  </li>
                  <li>
                    3. Once the buyer has completed the payment via the chosen
                    payment method (Meet-up Pay or E-Payment), the CTU
                    Marketplace Team will handle the transaction.
                  </li>
                  <li>
                    4. We will process the buyer’s payment and transfer the
                    corresponding funds to your registered GCash account or any
                    other mobile banking app you have within 3-5 business days.
                  </li>
                  <li>
                    5. Do not engage in any activities that may be considered
                    fraudulent or misleading, as violations will result in your
                    account being restricted.
                  </li>
                  <li>
                    6. Lastly, please cooperate by taking a picture with the
                    product and your ID (if you are a student) or without an ID
                    (if you are a faculty member) at the drop-off area as proof.
                  </li>
                </ul>

                <ul className="text-sm font-quicksand">
                  <li>
                    {" "}
                    <label className="flex mt-5 text-lg font-montserrat">
                      <p className="pr-1">3. Sold earned: ₱</p>
                      <input
                        type="number"
                        name="tax"
                        className="text-xl border px-2 w-32 rounded-md underline"
                        disabled
                        value={(doneTransactSchema.tax = totalWithTax)}
                        onChange={imageHandler}
                      />
                    </label>
                  </li>
                </ul>
                <br />
                <form onSubmit={submitTransaction}>
                  <div className="text-center p-1 px-4 border rounded-md grid grid-cols-2 ">
                    <label className="mb-7 rounded-lg cursor-pointer ml-3 mr-2 border mt-5 font-montserrat text-sm grid">
                      <p className="">Item Image: Up 5 files. </p>

                      <p className="text-3xl mt-14 mb-14">
                        <AddIcon />
                      </p>
                      <Input
                        pl={0}
                        p="6px"
                        bg={"slate"}
                        border="1px"
                        borderColor="slate"
                        type="file"
                        name="imageSubmit"
                        className=" border-slate-400  border-t border-e border-x border-y  rounded-md text-black bg-[#e1e4e4] "
                        // value={imageSubmit.picture}
                        accept=".jpeg,.jpg,.png,.gif,.pdf,.doc,.docx"
                        // name="picture"
                        placeholder="image"
                        multiple
                        onChange={imageHandlerFile}
                      />

                      {/* do next is to fix this to upload image here  */}
                    </label>

                    <div className=" lg:m-5 grid border text-center rounded-md">
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
                        ( E-Payment )
                      </button>
                      <div className="hidden">
                        <input
                          type="text"
                          name="userId"
                          value={
                            (doneTransactSchema.userId = statusData.userId)
                          }
                          onChange={imageHandler}
                        />
                        <input
                          type="text"
                          name="cartId"
                          value={(doneTransactSchema.cartId = statusData._id)}
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="sellerId"
                          value={
                            (doneTransactSchema.sellerId = statusData.sellerId)
                          }
                          onChange={imageHandler}
                        />{" "}
                        <br />
                        <input
                          type="text"
                          name="sellerName"
                          value={
                            (doneTransactSchema.sellerName =
                              statusData.sellerName)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="productId"
                          value={
                            (doneTransactSchema.productId =
                              statusData.productId)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="sellerEmail"
                          value={
                            (doneTransactSchema.sellerEmail =
                              statusData.sellerEmail)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="prodName"
                          value={
                            (doneTransactSchema.prodName = statusData.prodName)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="message"
                          value={
                            (doneTransactSchema.message = statusData.message)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="number"
                          name="quantity"
                          value={
                            (doneTransactSchema.quantity = statusData.quantity)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="buyerName"
                          value={
                            (doneTransactSchema.buyerName =
                              statusData.buyerName)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="buyerEmail"
                          value={
                            (doneTransactSchema.buyerEmail =
                              statusData.buyerEmail)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="status"
                          value={
                            (doneTransactSchema.status = statusData.status)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="number"
                          name="total"
                          value={(doneTransactSchema.total = statusData.total)}
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="types"
                          value={(doneTransactSchema.types = statusData.types)}
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="sellerFacebook"
                          value={
                            (doneTransactSchema.sellerFacebook =
                              statusData.sellerFacebook)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="buyerFacebook"
                          value={
                            (doneTransactSchema.buyerFacebook =
                              statusData.buyerFacebook)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="number"
                          name="price"
                          value={(doneTransactSchema.price = statusData.price)}
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="accountType"
                          value={
                            (doneTransactSchema.accountType =
                              statusData.accountType)
                          }
                          onChange={imageHandler}
                        />
                        <input
                          type="text"
                          name="buyerType"
                          value={
                            (doneTransactSchema.buyerType =
                              statusData.buyerType)
                          }
                          onChange={imageHandler}
                        />
                        <input
                          type="number"
                          name="buyerPhoneNumber"
                          value={
                            (doneTransactSchema.buyerPhoneNumber =
                              statusData.buyerPhoneNumber)
                          }
                          onChange={imageHandler}
                        />
                        <input
                          type="number"
                          name="buyerGcashNumber"
                          value={
                            (doneTransactSchema.buyerGcashNumber =
                              statusData.buyerGcashNumber)
                          }
                          onChange={imageHandler}
                        />
                        <input
                          type="number"
                          name="sellerGcashNumber"
                          value={
                            (doneTransactSchema.sellerGcashNumber =
                              statusData.sellerGcashNumber)
                          }
                          onChange={imageHandler}
                        />
                        <input
                          type="number"
                          name="sellerPhoneNumber"
                          value={
                            (doneTransactSchema.sellerPhoneNumber =
                              statusData.sellerPhoneNumber)
                          }
                          onChange={imageHandler}
                        />
                        <br />
                        <input
                          type="text"
                          name="image"
                          value={(doneTransactSchema.image = statusData.image)}
                          onChange={imageHandler}
                        />
                      </div>

                      <input
                        className="bg-transparent text-center mb-2"
                        readOnly
                        disabled
                        type="text"
                        name="status"
                        placeholder="None"
                        value={
                          (doneTransactSchema.status =
                            statusData.status || purchasedSchema.status)
                        }
                        onChange={imageHandler}
                      />
                    </div>
                  </div>

                  {/* continue here in transaction creating a model data schema and all the input types  */}
                  {transactLoading ? (
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
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </main>
  );
}

export default Transactions;
