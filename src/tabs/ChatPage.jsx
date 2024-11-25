/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { MdDelete, MdSend } from "react-icons/md";
import { formatDateToNow } from "../pages/Products";
import { InputRightButton } from "@saas-ui/react";
import { FaUpload } from "react-icons/fa6";
import { RiFileUploadFill } from "react-icons/ri";

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
      // if (!cookies.token) {
      //   navigate("/");
      //   return;
      // }
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
          `${baseUrl}/api/get-message/${currentSenderEmail}/${userEmail}`,
          { withCredentials: true }
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
        location.reload();
      })
      .catch((err) => {
        console.log("Error deleting message:", err);
      });
  };
  return (
    <div className="">
      <div className="chat-history border ssm:h-[500px] lg:h-[420px] overflow-y-scroll bg-[#d2e2f513] rounded-lg font-quicksand text-sm px-1 pb-2 pt-2">
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
                      <div className="flex items-center ">
                        <p className="text-xs text-[10px] font-thin font-montserrat">
                          {new Date(msg.timestamp).toLocaleTimeString("en-PH", {
                            second: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                        <Flex justifyContent={"end"} mx={1}>
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
                                <Text>Do you want to remove this comment?</Text>
                              </PopoverHeader>
                              <PopoverBody>
                                <button
                                  className="justify-self-start text-sm hover:shadow-inner hover:scale-110"
                                  onClick={() => deleteMessage(msg._id)}
                                >
                                  Confirm
                                </button>
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Flex>
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
          <InputGroup>
            <InputRightElement mr={6}>
              {" "}
              <Flex align="center">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Tooltip label="Send File Image.">
                    <IconButton
                      bg={"transparent"}
                      icon={<RiFileUploadFill />}
                      aria-label="Upload file"
                      as="span"
                      size="md"
                    />
                  </Tooltip>
                </label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".jpeg,.jpg,.png,.gif,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  display="none"
                />
              </Flex>
              <Tooltip label="Send">
                <Button bg={"transparent"} type="submit">
                  <MdSend className="text-2xl " />
                </Button>
              </Tooltip>
            </InputRightElement>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message"
            />
          </InputGroup>
        </div>
      </form>
    </div>
  );
}

export default ChatPage;
