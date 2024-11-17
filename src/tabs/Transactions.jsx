/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { MdEmail, MdMessage } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { TbCircleLetterG } from "react-icons/tb";
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
  visuallyHiddenStyle,
  Input,
  Img,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import logomarket from "../assets/ctu-logo-marketplace.jpg";
import { AddIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import Loader from "../components/Loader";
import ChatPage from "./ChatPage";
function Transactions() {
  const [orders, setOrders] = useState([]);
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);

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
  const { id } = useParams();
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
      .delete(`${baseUrl}/api/orders/${id}`)
      .then((result) => {
        navigate("/");
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
    } catch (error) {
      console.log("Error uploading file", error);
    }
  };

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

  const pendingCard = () => {
    return (
      <div className=" md:shrink-0 grid justify-items-center grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 ">
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
              myTransactions
                .filter((item) => item.transactionStatus === undefined)
                .map((item) => (
                  <div
                    className="border-solid border-2  border-black px-2 rounded-2xl p-2  max-w-full w-96  mb-5 bg-slate-400"
                    key={item._id}
                  >
                    <div className="">
                      <img
                        className=" block ml-auto mr-auto rounded-2xl max-w-full max-h-full w-full h-56 object-cover bg-fixed"
                        src={item.image}
                        alt=""
                      />
                      <div className="flex  justify-center ">
                        <button
                          className=" p-1 bg-[#b40e0e9d] rounded-md  float-right mr-2"
                          onClick={() => {
                            removeItemClick(item._id);
                          }}
                        >
                          Cancel Transaction <CloseIcon />
                        </button>
                        <button
                          onClick={() => markTransactions(item)}
                          className=" p-1 bg-[#4dbe86] rounded-md  float-right mr-2"
                        >
                          Mark Done Transaction <CheckIcon />
                        </button>
                      </div>
                      <figure className=" bg-slate-500 rounded-2xl  p-1 mt-2 ">
                        <p>
                          <label>Buyer Name: </label>
                          {item.buyerName}
                        </p>
                        <p>
                          <label>Buyer Email: </label>
                          {item.buyerEmail}
                        </p>
                        <p className=" h-20 overflow-y-auto px-2 mt-1 mb-2 border-solid border-2 rounded-lg">
                          <label className=" font-semibold">Message: </label>
                          {item.message}
                        </p>
                        <figure className="flex ">
                          <div>
                            <p className="mx-3">Contact on</p>
                            <button className="px-4 p-3 mx-2 rounded-lg bg-teal-400">
                              <MdEmail className="text-2xl" />
                            </button>
                            <button className="px-4 p-3 mx-2 rounded-lg bg-teal-400">
                              <FaFacebookSquare className="text-2xl" />
                            </button>
                            <button
                              onClick={() => chatButton(item)}
                              className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white"
                            >
                              <MdMessage className=" cursor-pointer mx-2  text-2xl" />
                            </button>
                          </div>

                          <div className="grid text-sm">
                            <p>
                              <label>Status: </label>
                              {!item.status ? <>Pending</> : <>{item.status}</>}
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
                        </figure>
                      </figure>
                    </div>
                  </div>
                ))
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <main className="rounded-md pb-4 max-w-full max-h-full   bg-gradient-to-tr ">
      {" "}
      <div className="mx-2 mt-2 mb-14  px-4 rounded-md pt-3 pb-4 max-w-full max-h-full ">
        {pendingCard()}
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
                  When doing Transaction with a Buyer select a payment method
                  below if there are changes of the transaction.
                </p>
                <br />
                <p className=" text-lg font-bebos">Strict Rules:</p>
                <ul className="text-sm font-quicksand">
                  <li>
                    1. Transaction will only be inside of campus so we can
                    ensure your safety.
                  </li>
                  <li>
                    2. We are always monitoring users not to do something not
                    right and scams for a buyer and so on we can restrict your
                    account and report to school student affairs office.
                  </li>
                  <li>
                    3. We are accepting the right personal account to selling
                    and so we guarantee that you are verified.
                  </li>
                  <li>
                    4. We are eager to ask 1% share of your earnings so it can
                    help us support our system furthermore.
                  </li>
                  <li>
                    5. By not sharing up to 3 products sales of your earnings we
                    can restrict your account.
                  </li>
                  <li>
                    6. Avoid Scamming buyers or this account will be restricted
                    and we have your information so that we can report it to our
                    Student affairs Office.
                  </li>
                </ul>
                <br />
                <p className=" text-lg font-bebos">
                  Our Rules of transactions:
                </p>
                <ul className="text-sm font-quicksand">
                  <li>
                    1. Cooperate taking a picture of buyer with a product and ID
                    of a Student/Without id when Faculty Member.
                  </li>
                  <li>
                    2. Select your method of payment ( Meet up Pay or E-Payment
                    ).
                  </li>
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
                        className=" border-slate-400  border-t border-e border-x border-y  rounded-md text-black bg-[#e1e4e4] "
                        value={imageSubmit.picture}
                        accept="image/"
                        name="picture"
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
      </div>
    </main>
  );
}

export default Transactions;
