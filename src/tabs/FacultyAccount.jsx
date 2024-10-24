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

function FacultyAccount() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/faculty-account/${email}`
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
          </p>

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
          <label className="grid">
            <p>218</p>
            <p>RATE</p>
          </label>
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
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserInventory userId={user._id} />
            </TabPanel>
            <TabPanel>
              <figure className="font-quicksand shadow-2xl space-y-2 border bg-[#ebe6e60a] grid mb-16 p-5 ssm:w-96 lg:w-128 text-sm rounded-2xl">
                {user.isSeller ? (
                  <>
                    <p className="text-center mb-2  ssm:w-80 ssm:mx-3 lg:mx-0 lg:w-full  text-lg">
                      {user.shopDescription}
                    </p>
                    <hr className=" ssm:w-80 ssm:mx-3 lg:mx-0 lg:w-full" />
                  </>
                ) : (
                  <p className="text-center mb-2 text-lg">Become a Seller</p>
                )}

                <label className="text-xs">
                  Email:
                  <p className="text-base truncate  ssm:w-80 lg:w-100 font-semibold">
                    {user.email}
                  </p>
                </label>

                <label className="text-xs">
                  Address:
                  <p className="text-base truncate  ssm:w-80 lg:w-100 font-semibold">
                    {user.address}
                  </p>
                </label>

                <label className="text-xs">
                  Username:
                  <p className="text-base truncate  ssm:w-80 lg:w-100 font-semibold">
                    {user.username}
                  </p>
                </label>

                <label className="text-xs">
                  Phone Number:
                  <p className="text-base truncate  ssm:w-80 lg:w-100 font-semibold">
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
                      className="text-base grid  truncate underline font-semibold"
                    >
                      <Button className=" ssm:w-80 ssm:mx-3 lg:mx-0 lg:w-full">
                        <FaFacebook />
                      </Button>
                    </a>
                  </label>
                </article>
              </figure>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </main>
    </div>
  );
}

export default FacultyAccount;
