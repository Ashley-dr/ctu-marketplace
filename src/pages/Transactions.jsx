/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { MdEmail } from "react-icons/md";
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
} from "@chakra-ui/react";
function Transactions() {
  const [orders, setOrders] = useState([]);
  const [cookies, removeCookies] = useCookies([]);

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

  const [myTransactions, setTransactions] = useState([]);
  const { id } = useParams();
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/api/transactions/${id}`)
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
      .get(`http://localhost:4000/api/transactions/${id}`)
      .then((result) => {
        setTransactions(result.data);
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
      .post(`http://localhost:4000/api/chats/${statusData._id}`, {
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
    onOpenSecond();
  };

  return (
    <div className="mx-2 px-4 rounded-md pt-3 pb-4 max-w-full  max-h-full bg-slate-700">
      <div className=" md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 ">
        {myTransactions.map((item) => (
          <div
            className="border-solid border-2 border-black px-2 rounded-2xl p-2  max-w-full w-96  mb-5 bg-slate-400"
            key={item._id}
          >
            <div className="">
              <img
                className=" block ml-auto mr-auto rounded-2xl max-w-full max-h-full w-full h-56 object-cover bg-fixed"
                src={item.image}
                alt=""
              />
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
                      className="px-4 p-3 mx-2 rounded-lg bg-teal-400"
                      onClick={() => chatButton(item)}
                    >
                      <FaRegMessage className="text-2xl" />
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
        ))}
      </div>
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
                          <strong className="text-xs">{chat.senderName}</strong>
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
    </div>
  );
}

export default Transactions;
