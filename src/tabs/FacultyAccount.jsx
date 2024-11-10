/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useContext } from "react";

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
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import pbc from "../assets/profile-cover.jpg";
import { useCookies } from "react-cookie";
import { FiEdit3, FiEyeOff } from "react-icons/fi";
import Inventory from "./Inventory";
import { FaFacebook } from "react-icons/fa";
import Orders from "./Orders";
import InventoryCounts from "../context/InventoryCount";
import ItemSold from "../context/ItemSold";
import UserInventory from "./UserInventory";
import ChatPage from "./ChatPage";
import { MdMessage } from "react-icons/md";

function FacultyAccount() {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/faculty-account/${email}`
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError("User not found");
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const facultyRes = await axios.post(
          `${baseUrl}/facultypost`,
          {},
          { withCredentials: true }
        );
        setisFaculty(facultyRes.data);

        const userRes = await axios.post(
          `${baseUrl}/userspost`,
          {},
          { withCredentials: true }
        );
        setisUser(userRes.data);

        setCurrentUser(facultyRes.data.user || userRes.data.user);
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };
    verifyCookie();
  }, [baseUrl, cookies, navigate, removeCookies]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <main className="grid justify-items-center max-w-full font-quicksand max-h-full">
        <figure className="grid justify-items-center mb-5">
          <img
            src="https://i.pinimg.com/originals/75/51/d8/7551d8249f7048d3159a1abf8d0e257d.jpg"
            alt="Cover"
            className="bg-cover bg-center object-cover lg:h-72 w-screen"
          />

          <Avatar
            className="relative bottom-16"
            zIndex={1}
            borderRadius="full"
            boxSize="135px"
            border={"solid"}
            src={user.image}
          />

          {/* Edit Button to Open Modal */}

          <p className="mt-2 relative bottom-16 flex font-quicksand font-bold">
            {user.fullname}
            {currentUser ? (
              <>
                {" "}
                <MdMessage
                  onClick={onOpen}
                  className=" cursor-pointer mx-2  text-2xl"
                />
              </>
            ) : (
              <></>
            )}
          </p>

          <Drawer
            isOpen={isOpen}
            placement="right"
            size={"sm"}
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent rounded={"xl"} m={2}>
              <DrawerCloseButton />
              <DrawerHeader>
                <div className="flex gap-4 space-y-2  ">
                  <Avatar src={user.image} border={"solid"} />
                  <div>
                    <p className="text-xs font-quicksand">{user.fullname}</p>
                    <p className="text-xs font-thin font-quicksand">
                      {user.email}
                    </p>
                  </div>
                </div>
              </DrawerHeader>

              <DrawerBody>
                <ChatPage userEmail={user.email} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <label className="text-xs relative bottom-16 mt-1">
            {user.isSeller && (
              <p className="bg-green-300 text-gray-950 px-2 rounded-md text-xs truncate font-semibold">
                Verified Seller
              </p>
            )}
          </label>
        </figure>

        <figure className="flex gap-16 relative bottom-16 mb-5 text-center">
          <label className="grid">
            <p>
              <InventoryCounts id={user._id} />
            </p>
            <p>ITEM SELL</p>
          </label>
          <label className="grid">
            <p>
              <ItemSold id={user._id} />
            </p>
            <p>ITEM SOLD</p>
          </label>
          {/* <label className="grid">
            <p>218</p>
            <p>RATE</p>
          </label> */}
        </figure>

        <Tabs
          className="relative bottom-16"
          isFitted
          size={"md"}
          variant="enclosed"
        >
          <TabList>
            <Tab>Items</Tab>
            <Tab>About me</Tab>
            {/* <Tab>Chat</Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserInventory userId={user._id} />
            </TabPanel>
            <TabPanel>
              <Box
                w={{ base: "xs", md: "md", lg: "lg" }}
                className="font-poppins shadow-2xl space-y-2 border bg-[#ebe6e60a] grid mb-16 p-5 text-sm rounded-2xl"
              >
                {user.isSeller ? (
                  <>
                    <p className="ssm:w-72 lg:w-full text-center mb-2 text-lg">
                      {user.shopDescription}
                    </p>
                    <hr className=" w-full mx-auto" />
                  </>
                ) : (
                  <p className="text-center mb-2 text-lg">Become a Seller</p>
                )}

                <label className="text-xs">
                  Email:
                  <p className="text-base ssm:w-72 lg:w-full truncate font-semibold w-full">
                    {user.email}
                  </p>
                </label>

                <label className="text-xs">
                  Address:
                  <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                    {" "}
                    {user.address}
                  </p>
                </label>

                <label className="text-xs">
                  Username:
                  <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                    {" "}
                    {user.username}
                  </p>
                </label>

                <label className="text-xs">
                  Phone Number:
                  <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                    {" "}
                    {user.phoneNumber}
                  </p>
                </label>
                <label className="text-xs">
                  Gender:
                  <p className="text-base truncate font-semibold">
                    {user.gender}
                  </p>
                </label>
                <label className="text-xs">
                  <p className="text-base truncate  font-semibold">
                    {user.isFaculty} Member
                  </p>
                </label>
                <article>
                  <label className="text-xs grid">
                    <a
                      href={user.facebook}
                      className="text-base truncate underline font-semibold w-full flex justify-center"
                    >
                      <Button
                        className="w-full"
                        size="sm"
                        variant="outline"
                        leftIcon={<FaFacebook />}
                      >
                        Facebook
                      </Button>
                    </a>
                  </label>
                </article>
              </Box>
            </TabPanel>
            {/* <TabPanel>
              <ChatPage userEmail={user.email} />
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </main>
    </div>
  );
}

export default FacultyAccount;
