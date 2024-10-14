/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FaRegMessage } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { TbCircleLetterG } from "react-icons/tb";
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
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";
import { CgNametag } from "react-icons/cg";
import { CiBoxes } from "react-icons/ci";
import { formatDate, formatDistanceToNow } from "date-fns";
import { AtSignIcon, CalendarIcon, LinkIcon } from "@chakra-ui/icons";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoPricetagOutline } from "react-icons/io5";
import { TbLetterT, TbSquareLetterS } from "react-icons/tb";
import { CiShoppingCart } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [cookies, removeCookies] = useCookies([]);
  const { id } = useParams();
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const navigate = useNavigate();
  const [newChats, setNewChats] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [statusData, setStatusData] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSecond,
    onOpen: onOpenSecond,
    onClose: onClosedSecond,
  } = useDisclosure();

  const size = ["xl"];
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/");
      }
      const { data } = await axios.post(
        "http://localhost:4000/facultypost",
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
      if (!cookies.token) {
        navigate("/");
      }
      const { data } = await axios.post(
        "http://localhost:4000/userspost",
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

  const fetchTransactions = () => {
    axios
      .get(`http://localhost:4000/api/orders/${id}`)
      .then((result) => {
        setOrders(result.data);
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
      .delete(`http://localhost:4000/api/orders/${id}`)
      .then((result) => {
        navigate("/");
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
      .post(`http://localhost:4000/api/chats/${statusData._id}`, {
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
    onOpenSecond();
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
      .put(`http://localhost:4000/api/purchasedItem/${statusData._id}`, data)
      .then((result) => {
        alert("Done");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error to update:", err);
      });
  };
  // const productPurchased = (e) => {
  //   e.preventDefault();
  //   axios
  //     .put(`http://localhost:4000/api/purchasedItem/${id}`, {
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
  return (
    <main className="rounded-md pb-4 max-w-full max-h-full justify-items-center grid  bg-gradient-to-tr ">
      {" "}
      <div className="mx-2 mt-2 mb-14  px-4 rounded-md pt-3 pb-4 max-w-full max-h-full ">
        <div className=" md:shrink-0 grid justify-items-center grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
          {orders.length === 0 ? (
            <p className="text-center text-gray-600 font-semibold">
              No data available
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="border-solid bg-[#b7b7b81f] px-2 rounded-2xl p-2 max-w-full mb-5 lg:mx-4 shadow-inner hover:shadow-xl"
              >
                <div className="md:shrink-0 grid justify-items-center grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                  <figure>
                    <img
                      className="mt-2.5 block ml-auto mr-auto rounded-sm max-w-full max-h-full w-96 h-80 object-cover bg-fixed"
                      src={order.image}
                      alt={order.prodName}
                    />
                    <div className="bg-gray-900 text-white text-center text-sm rounded-sm p-2 grid">
                      <p>
                        Payment Method:{" "}
                        {order.status ? <>{order.status}</> : <>None</>}
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
                  </figure>
                  <Card className="grid rounded-md px-2 lg:w-72 p-1 mt-2 font-quicksand text-sm space-y-1">
                    <p className="text-xl grid grid-cols-2">
                      <Link to={`/ProductId/${order.productId}`}>
                        <button className="truncate ssm:w-80 lg:w-60 text-start">
                          {order.prodName}
                        </button>
                      </Link>
                      <button
                        className="justify-self-end text-2xl hover:shadow-inner hover:scale-110"
                        onClick={() => removeItemClick(order._id)}
                      >
                        <MdDelete />
                      </button>
                      <Link to={`/ProductId/${order.productId}`}>
                        <button className="text-xs underline">View Item</button>
                      </Link>
                    </p>

                    <div className="grid grid-cols-2 pt-1">
                      <p className="truncate w-48 flex">
                        <LinkIcon className="mr-1 mt-1" />
                        {order.sellerName}
                      </p>
                      <p className="text-xs px-1 mt-1 justify-self-end mr-2 rounded-md bg-[#15f85667]">
                        {order.accountType}
                      </p>
                    </div>
                    <p className="truncate flex">
                      <AtSignIcon className="mt-1 mr-1" /> {order.sellerEmail}
                    </p>
                    <p className="truncate flex">
                      <FaFacebookF className="mt-1 mr-1" />{" "}
                      {order.sellerFacebook}
                    </p>
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
                    <p className="h-28 overflow-y-auto px-2 mt-1 mb-2 border-solid border-2 rounded-lg ssm:w-96 lg:w-full">
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
                        <button className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white">
                          <FaFacebookSquare className="text-2xl" />
                        </button>
                        <button
                          className="px-4 p-3 mx-2 rounded-lg bg-gray-900 text-white"
                          onClick={() => chatButton(order)}
                        >
                          <FaRegMessage className="text-2xl" />
                        </button>
                      </div>
                    </figure>
                  </Card>
                </div>
              </div>
            ))
          )}
        </div>

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
                        onClick={() => buttonStatus("GCash")}
                      >
                        ( GCash )
                      </button>
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

export default Orders;
