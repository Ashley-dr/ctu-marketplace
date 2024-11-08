/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { MdMessage } from "react-icons/md";
import {
  Avatar,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Select,
  Textarea,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Box,
  VStack,
  Heading,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import ChatPage from "../tabs/ChatPage";
function UsersMessage({ email }) {
  const [messageUserCount, setMessageUserCounte] = useState(null);
  const [messageUsers, setMessageUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const [statusData, setStatusData] = useState("");
  const [file, setFile] = useState(null);

  const [currentReceiverEmail, setCurrentReceiverEmail] = useState("");
  const chatButton = (id) => {
    setStatusData(id);
    onOpenDrawer();
  };
  useEffect(() => {
    const verifyCookie = async () => {
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

        setCurrentReceiverEmail(
          facultyRes.data.user?.email || userRes.data.user?.email
        );
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };
    verifyCookie();
  }, [baseUrl, cookies, navigate, removeCookies]);

  useEffect(() => {
    if (!currentReceiverEmail || !email) return;
    const fetchMessageUsers = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${baseUrl}/api/get-senders/${currentReceiverEmail}`
        );

        setMessageUsers(result.data.senders);
        setMessageUserCounte(result.data.count);
        setError(null);
      } catch (error) {
        console.log("Error fetching the Messages Users.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessageUsers();
    // const interval = setInterval(fetchMessageUsers, 1000);
    // return () => clearInterval(interval);
  }, [currentReceiverEmail]);
  return (
    <div className="unique-senders font-quicksand">
      <p className="flex gap-2 justify-center">
        <p className="bg-gray-200 px-2 text-black rounded-md mb-5">
          {messageUserCount}
        </p>{" "}
        Messages
      </p>
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <div className="space-y-4">
            {messageUsers.map((sender, index) => (
              <div
                key={index}
                className="flex border-b-purple-100 border-2 border-l-0 border-r-0 border-t-0 p-2 gap-2 lg:w-96"
                onClick={() => chatButton(sender)}
              >
                <Avatar src={sender.senderImage} />{" "}
                <p className=" ">{sender.senderName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {statusData && (
        <Drawer
          isOpen={isOpenDrawer}
          placement="right"
          size={"sm"}
          onClose={onCloseDrawer}
        >
          <DrawerOverlay />
          <DrawerContent rounded={"xl"}>
            <DrawerCloseButton />
            <DrawerHeader>
              <div className="flex gap-4 space-y-2">
                <Avatar src={statusData.senderImage} border={"solid"} />
                <div>
                  <p className="text-xs font-quicksand">
                    {statusData.senderName}
                  </p>
                  <p className="text-xs font-thin font-quicksand">
                    {statusData.senderEmail}
                  </p>
                </div>
              </div>
            </DrawerHeader>

            <DrawerBody>
              <ChatPage userEmail={statusData.senderEmail} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

export default UsersMessage;
