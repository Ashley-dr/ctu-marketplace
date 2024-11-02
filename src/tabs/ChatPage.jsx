/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Button, Img, Input } from "@chakra-ui/react";
import { MdDelete, MdSend } from "react-icons/md";
import { formatDateToNow } from "../pages/Products";

function ChatPage({ userEmail }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);
  const [file, setFile] = useState(null);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const [currentSenderEmail, setCurrentSenderEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/");
        return;
      }
      try {
        const facultyRes = await axios.post(
          `${baseUrl}/facultypost`,
          {},
          { withCredentials: true }
        );
        setisFaculty(facultyRes.data.user);

        const userRes = await axios.post(
          `${baseUrl}/userspost`,
          {},
          { withCredentials: true }
        );
        setisUser(userRes.data.user);

        setCurrentSenderEmail(
          facultyRes.data.user?.email || userRes.data.user?.email
        );
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };
    verifyCookie();
  }, [baseUrl, cookies, navigate, removeCookies]);

  useEffect(() => {
    if (!currentSenderEmail || !userEmail) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/get-message/${currentSenderEmail}/${userEmail}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat-channel");
    channel.bind("message", (data) => {
      if (
        (data.senderEmail === currentSenderEmail &&
          data.receiverEmail === userEmail) ||
        (data.senderEmail === userEmail &&
          data.receiverEmail === currentSenderEmail)
      ) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [baseUrl, currentSenderEmail, userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() || file) {
      try {
        const formData = new FormData();
        formData.append("senderEmail", currentSenderEmail);
        formData.append("receiverEmail", userEmail);
        formData.append("message", newMessage);
        if (file) {
          formData.append("image", file); // Match with the backend 'image' field name
        }

        const config = {
          headers: {
            "Content-Type": "multipart/form-data", // For file uploads
          },
        };

        await axios.post(`${baseUrl}/api/send-message`, formData, config);
        setFile(null);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const deleteMessage = (id) => {
    if (!id) {
      console.log("Error: Message ID is undefined");
      return;
    }

    axios
      .delete(`${baseUrl}/api/delete-message/${id}`)
      .then((result) => {
        console.log("Message deleted:", result.data);
      })
      .catch((err) => {
        console.log("Error deleting message:", err);
      });
  };
  return (
    <div className="">
      <div className="chat-history border h-96 overflow-y-scroll bg-[#d2e2f513] rounded-lg font-quicksand text-sm px-1 pb-2 pt-2">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={
              msg.senderEmail === currentSenderEmail ? "sent" : "received"
            }
          >
            <article className="">
              {msg.senderEmail === userEmail && (
                <div className="flex  justify-start">
                  <div className="mt-0.5 mb-0.5 bg-[#69c8ff1e] break-words max-w-[80%] rounded-md">
                    <p className=" px-2">
                      <p className=""> {msg.message}</p>

                      {msg.file && (
                        <img
                          src={msg.file}
                          alt="attachment"
                          className="w-32 h-auto mt-2 rounded-md"
                        />
                      )}
                      <p className="text-xs text-[10px] font-thin font-montserrat">
                        {new Date(msg.timestamp).toLocaleTimeString("en-PH", {
                          second: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </p>
                  </div>
                </div>
              )}
              {msg.senderEmail === currentSenderEmail && (
                <div className="flex justify-end ">
                  <div className="mt-0.5 mb-0.5  break-words max-w-[80%] rounded-md">
                    <p className=" text-right  px-2 pt-0.5 pb-0.5  bg-[#55ede019] rounded-xl ">
                      <p className=""> {msg.message}</p>

                      {msg.file && (
                        <img
                          src={msg.file}
                          alt="attachment"
                          className="w-32 h-auto mt-2 rounded-md"
                        />
                      )}
                      <div className="flex gap-1">
                        <p className="text-xs text-[10px] font-thin font-montserrat">
                          {new Date(msg.timestamp).toLocaleTimeString("en-PH", {
                            second: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                        <button
                          className="justify-self-end  text-sm hover:shadow-inner hover:scale-110"
                          onClick={() => deleteMessage(msg._id)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </p>
                  </div>
                </div>
              )}
            </article>
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className=" mt-4 ">
        <div className="flex gap-1">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message"
          />

          <Button bg={"transparent"} type="submit">
            <MdSend className="text-2xl " />
          </Button>
        </div>
        <div className="">
          <input
            className="block w-full text-sm mt-1 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept=".jpeg,.jpg,.png,.gif,.pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
      </form>
    </div>
  );
}

export default ChatPage;
