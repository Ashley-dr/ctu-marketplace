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
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
function Account() {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const [facultyData, setFacultyData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gcashNumber, setGcashNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const forgotPasswordModal = useDisclosure();

  const [users, setUsers] = useState({
    email: "",
    username: "",
    fullname: "",
    gender: "",
    department: "",
    facebook: "",
    course: "",
    phoneNumber: "",
    shopDescription: "",
    gcashNumber: "",
    isSeller: false,
    address: "",
  });

  const [usersFileImage, setUsersFileImage] = useState({
    image: null,
    validId: null,
    shopImage: null,
  });

  const [facultyFileImage, setFacultyFileImage] = useState({
    image: null,
    validId: null,
    shopImage: null,
  });

  const [userFileData, setUserFileData] = useState();

  const [faculty, setFaculty] = useState({
    email: "",
    username: "",
    fullname: "",
    image: "",
    gender: "",
    facebook: "",
    phoneNumber: "",
    validId: "",
    shopImage: "",
    shopDescription: "",
    gcashNumber: "",
    isSeller: false,
    address: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch Faculty User
  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/");
      // }
      try {
        const { data } = await axios.post(
          `${baseUrl}/facultypost`,
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setisFaculty(user);
      } catch (error) {
        console.error("Error verifying faculty cookie:", error);
      }
    };
    verifyCookie();
  }, [baseUrl, cookies, navigate, removeCookies]);

  // Fetch Regular User
  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/");
      // }
      try {
        const { data } = await axios.post(
          `${baseUrl}/userspost`,
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setisUser(user);
      } catch (error) {
        console.error("Error verifying user cookie:", error);
      }
    };
    verifyCookie();
  }, [baseUrl, cookies, navigate, removeCookies]);

  // Handle Input Changes
  const userOnChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const userOnChangeFileImage = (e) => {
    const { name, files } = e.target;
    setUsersFileImage({ ...usersFileImage, [name]: files[0] });
  };

  const facultyOnChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const FacultyOnChangeFileImage = (e) => {
    const { name, files } = e.target;
    setFacultyFileImage({ ...facultyFileImage, [name]: files[0] });
  };

  // Handle Update Button Click
  const handleUpdateAccount = (user) => {
    setUsers(user);
    setFaculty(user);
    // setUsersFileImage({
    //   image: null,
    //   validId: null,
    //   shopImage: null,
    // }); // Reset file inputs
    onOpen(); // Open the modal
  };

  // Handle Form Submission for Users
  const usersOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", users.email);
    formData.append("username", users.username);
    formData.append("fullname", users.fullname);
    formData.append("image", usersFileImage.image || users.image || ""); // Handle optional files
    formData.append("gender", users.gender);
    formData.append("department", users.department);
    formData.append("facebook", users.facebook);
    formData.append("course", users.course);
    formData.append("phoneNumber", users.phoneNumber);
    formData.append("validId", usersFileImage.validId || users.validId || "");
    formData.append(
      "shopImage",
      usersFileImage.shopImage || users.shopImage || ""
    );
    formData.append("shopDescription", users.shopDescription);
    formData.append("gcashNumber", users.gcashNumber);
    formData.append("isSeller", users.isSeller);
    formData.append("address", users.address);

    try {
      const result = await axios.put(
        `${baseUrl}/api/users/${users._id || users.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleSuccess("User updated successfully!");
      window.location.reload();
      onClose(); // Close the modal
      setisUser(result.data); // Update the user state with new data
    } catch (err) {
      handleError("Error updating user");

      console.log("Error", err);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUserNumbersChange = (e) => {
    setGcashNumber(e.target.value);
    setPhoneNumber(e.target.value);
  };
  const handleCtuIdNumber = (e) => {
    setIdNumber(e.target.value);
  };
  const usersEmailOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(
        `${baseUrl}/api/userEmail/${users._id || users.id}`,
        { email }, // Wrap email in an object
        {
          headers: {
            "Content-Type": "application/json", // Change content type
          },
        }
      );

      handleSuccess("User updated successfully!");
      window.location.reload();
    } catch (err) {
      handleError("Error updating user");

      console.log("Error", err);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const usersPhoneGcashOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(
        `${baseUrl}/api/userNumbers/${users._id || users.id}`,
        { phoneNumber, gcashNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleSuccess("Phone Number and Gcash Number updated successfully!");
      window.location.reload();
    } catch (err) {
      handleError("Error updating user");
      console.log("Error:", err);
      console.log("Error", err);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const usersIdnumberOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(
        `${baseUrl}/api/ctuId/${users._id || users.id}`,
        { idNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleSuccess("Id number updated successfully!");
      window.location.reload();
      onClose();
    } catch (err) {
      handleError("Error updating user");
      console.log("Error:", err);
      console.log("Error", err);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Handle Form Submission for Faculty (if needed)
  const facultyOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", faculty.email);
    formData.append("username", faculty.username);
    formData.append("fullname", faculty.fullname);
    formData.append("image", facultyFileImage.image || faculty.image || "");
    formData.append("gender", faculty.gender);
    formData.append("facebook", faculty.facebook);
    formData.append("phoneNumber", faculty.phoneNumber);
    formData.append(
      "validId",
      facultyFileImage.validId || faculty.validId || ""
    );
    formData.append(
      "shopImage",
      facultyFileImage.shopImage || faculty.shopImage || ""
    );
    formData.append("shopDescription", faculty.shopDescription);
    formData.append("gcashNumber", faculty.gcashNumber);
    formData.append("isSeller", faculty.isSeller);
    formData.append("address", faculty.address);

    try {
      const result = await axios.put(
        `${baseUrl}/api/faculty/${isFaculty._id || isFaculty.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleSuccess("Faculty updated successfully!");
      window.location.reload();
      onClose(); // Close the modal
      setisFaculty(result.data); // Update the user state with new data
    } catch (err) {
      handleError("Error updating user");

      console.log("Error", err);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const facultyEmailOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(
        `${baseUrl}/api/facultyEmail/${users._id || users.id}`,
        { email }, // Wrap email in an object
        {
          headers: {
            "Content-Type": "application/json", // Change content type
          },
        }
      );

      handleSuccess("User updated successfully!");
      window.location.reload();
    } catch (err) {
      handleError("Error updating user");

      console.log("Error", err);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const facultyPhoneGcashOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(
        `${baseUrl}/api/facultyNumbers/${users._id || users.id}`,
        { phoneNumber, gcashNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleSuccess("Phone Number and Gcash Number updated successfully!");
      window.location.reload();
    } catch (err) {
      handleError("Error updating user");
      console.log("Error:", err);
      console.log("Error", err);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Toast Handlers
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/userForgotPassword`,
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        toast({
          title: "Success",
          description: `Password reset code sent to ${email}. Check your inbox.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log("Email sent");
        setDone(true);
      }
    } catch (error) {
      console.error(
        "Error in forgot password:",
        error.response?.data?.message || error.message
      );
      if (error.response?.status === 404) {
        toast({
          title: "Error",
          description:
            "Email not found. Please check the email address and try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (password !== newConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!token || !password) {
      toast({
        title: "Error",
        description: "Please enter both the reset token and new password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/userResetPassword`,
        { token, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Password reset:", response.data);
      // toast({
      //   title: "Success",
      //   description: "Your password has been reset successfully.",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      // });
      // // Optionally, redirect the user to the login page or another page
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div>
      {/* Toast Container for Notifications */}
      <ToastContainer />

      {/* Faculty Information (if applicable) */}
      {isFaculty && (
        <main className="grid justify-items-center max-w-full font-quicksand max-h-full">
          <figure className="grid justify-items-center mb-5">
            {isFaculty.shopImage === null ? (
              <>
                {" "}
                <img
                  src="https://i.pinimg.com/originals/75/51/d8/7551d8249f7048d3159a1abf8d0e257d.jpg"
                  alt="Cover"
                  className="bg-cover bg-center object-cover lg:h-72 w-screen"
                />
              </>
            ) : (
              <>
                {" "}
                <img
                  src={isFaculty.shopImage}
                  alt="Cover"
                  className="bg-cover bg-center object-cover lg:h-72 w-screen"
                />
              </>
            )}

            <Avatar
              className="relative bottom-16 cursor-pointer transition hover:scale-105"
              zIndex={1}
              borderRadius="full"
              boxSize="135px"
              border={"solid"}
              onClick={() => {
                setOpen(true);
                setCurrentImage(isFaculty.image);
              }}
              src={isFaculty.image}
            />
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={[{ src: currentImage }]}
              plugins={[Zoom]}
            />
            {/* Edit Button to Open Modal */}

            <p className="mt-2 relative bottom-16 flex font-quicksand font-bold">
              {isFaculty.fullname}
            </p>

            <label className="text-xs relative bottom-16 mt-1">
              {isFaculty.isSeller && (
                <p className="bg-green-300 text-gray-950 px-2 rounded-md text-xs truncate font-semibold">
                  Verified Seller
                </p>
              )}
            </label>
          </figure>

          <figure className="flex gap-16 relative bottom-16 mb-5 text-center">
            <label className="grid">
              <InventoryCounts id={isFaculty.id} />
              <p>ITEM SELL</p>
            </label>
            <label className="grid">
              <p>
                {" "}
                <p>
                  <ItemSold id={isFaculty.id} />
                </p>
              </p>
              <p>ITEM SOLD</p>
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
                <Inventory userId={isFaculty.id} />
              </TabPanel>
              <TabPanel>
                <Box
                  w={{ base: "xs", md: "md", lg: "lg" }}
                  className="font-poppins shadow-2xl space-y-2 border bg-[#ebe6e60a] grid mb-16 p-5 text-sm rounded-2xl"
                >
                  <button
                    onClick={() => handleUpdateAccount(isFaculty)}
                    className="text-2xl justify-self-end px-4"
                  >
                    <FiEdit3 />
                  </button>
                  {isFaculty.isSeller ? (
                    <>
                      <p className="ssm:w-72 lg:w-full text-center mb-2 text-lg">
                        {isFaculty.shopDescription}
                      </p>
                      <hr className=" w-full mx-auto" />
                    </>
                  ) : (
                    <p className="text-center mb-2 text-lg">Become a Seller</p>
                  )}
                  <label className="text-xs">
                    Email:
                    <p className="text-base ssm:w-72 lg:w-full truncate font-semibold w-full">
                      {isFaculty.email}
                    </p>
                  </label>

                  <label className="text-xs">
                    Address:
                    <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                      {isFaculty.address}
                    </p>
                  </label>

                  <label className="text-xs">
                    Username:
                    <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                      {isFaculty.username}
                    </p>
                  </label>

                  <label className="text-xs">
                    Phone Number:
                    <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                      {isFaculty.phoneNumber}
                    </p>
                  </label>
                  <label className="text-xs">
                    Gender:
                    <p className="text-base truncate font-semibold w-full">
                      {isFaculty.gender}
                    </p>
                  </label>
                  <label className="text-xs">
                    <p className="text-base truncate  font-semibold">
                      {isFaculty.isFaculty} Member
                    </p>
                  </label>
                  <article>
                    <label className="text-xs grid">
                      <a
                        href={isFaculty.facebook}
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
            </TabPanels>
          </Tabs>

          {/* Update Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={facultyEmailOnSubmit}>
                  <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder={faculty.email}
                      required
                    />
                    <Button className="w-full" mr={1} type="submit">
                      Update Email
                    </Button>
                  </FormControl>
                </form>

                <form className=" text-xs" onSubmit={facultyPhoneGcashOnSubmit}>
                  <Box className="flex">
                    <FormControl mb={4}>
                      <FormLabel>GCASH Number:</FormLabel>
                      <Input
                        type="number"
                        name="gcashNumber"
                        value={gcashNumber}
                        onChange={handleUserNumbersChange}
                        placeholder={faculty.gcashNumber}
                        required
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Phone Number:</FormLabel>
                      <Input
                        type="number"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleUserNumbersChange}
                        placeholder={faculty.phoneNumber}
                        required
                      />
                    </FormControl>
                  </Box>
                  <Button className="w-full" mr={1} type="submit">
                    Update Numbers
                  </Button>
                </form>
              </ModalBody>
              <form onSubmit={facultyOnSubmit}>
                <ModalBody>
                  <FormControl mb={4}>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      type="text"
                      name="fullname"
                      value={faculty.fullname}
                      onChange={facultyOnChange}
                      placeholder="Full Name"
                      required
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      name="username"
                      value={faculty.username}
                      onChange={facultyOnChange}
                      placeholder="Username"
                      required
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="text"
                      name="address"
                      value={faculty.address}
                      onChange={facultyOnChange}
                      placeholder="Address"
                      required
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      type="text"
                      name="gender"
                      value={faculty.gender}
                      onChange={facultyOnChange}
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Select>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Facebook Link:</FormLabel>
                    <Input
                      type="text"
                      name="facebook"
                      value={faculty.facebook}
                      onChange={facultyOnChange}
                      placeholder="facebook link"
                      required
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Shop Description:</FormLabel>
                    <Textarea
                      type="text"
                      name="shopDescription"
                      value={faculty.shopDescription}
                      onChange={facultyOnChange}
                      placeholder="Shop Description"
                      required
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Profile Image</FormLabel>
                    <Input
                      id="dropzone-file"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={FacultyOnChangeFileImage}
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>
                      Shop Image (Instrinsic Size 1920 x 1080) required.
                    </FormLabel>
                    <Input
                      id="dropzone-file"
                      type="file"
                      name="shopImage"
                      accept="image/*"
                      onChange={FacultyOnChangeFileImage}
                    />
                  </FormControl>
                </ModalBody>
                <Button
                  bg={"none"}
                  className="text-center w-full "
                  onClick={forgotPasswordModal.onOpen}
                >
                  Change Password
                </Button>
                <ModalFooter>
                  <Button className="w-full" mr={1} type="submit">
                    Update
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          {/* Forgot Password reset password */}
          <Modal
            blockScrollOnMount={false}
            isOpen={forgotPasswordModal.isOpen}
            onClose={forgotPasswordModal.onClose}
            size={{ base: "xs", md: "md", lg: "lg" }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box p={6} rounded="lg" boxShadow="md">
                  <VStack spacing={4} align="stretch">
                    <Heading as="h2" size="lg" textAlign="center" mb={2}>
                      Change Password
                    </Heading>
                    <Text fontSize="md" textAlign="center">
                      To change a password input your email.
                    </Text>

                    {!done ? (
                      <>
                        <Input
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          fontSize="12px"
                          rounded="md"
                          mb={4}
                        />
                        <Button
                          colorScheme="orange"
                          bg="#DFC4A4"
                          color="#4f3a3a"
                          size="md"
                          onClick={handleForgotPassword}
                          isLoading={loading}
                          loadingText="Processing..."
                        >
                          Change Password
                        </Button>
                      </>
                    ) : (
                      <>
                        <Box>
                          <Text
                            textAlign="center"
                            bg="transparent"
                            mt={5}
                            mb={2}
                            rounded="xl"
                            width="100%"
                          >
                            {email}
                          </Text>
                          <Text fontSize="sm" textAlign="center" px={2} my={2}>
                            Reset code is valid for 1 hour.
                          </Text>
                        </Box>
                      </>
                    )}

                    {done && (
                      <>
                        <Input
                          placeholder="Reset Code"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          fontSize="12px"
                          rounded="md"
                          mb={4}
                        />
                        <InputGroup size="md" mb={4}>
                          <Input
                            pr="4.5rem"
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setNewPassword(e.target.value)}
                            color="#AD9C8E"
                            fontSize="12px"
                            rounded="md"
                          />
                          <InputRightElement width="3rem">
                            <IconButton
                              variant="ghost"
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                              icon={showPassword ? <FiEyeOff /> : <FiEyeOff />}
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          </InputRightElement>
                        </InputGroup>

                        <InputGroup size="md" mb={4}>
                          <Input
                            pr="4.5rem"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={newConfirmPassword}
                            onChange={(e) =>
                              setNewConfirmPassword(e.target.value)
                            }
                            color="#AD9C8E"
                            fontSize="12px"
                            rounded="md"
                          />
                          <InputRightElement width="3rem">
                            <IconButton
                              variant="ghost"
                              aria-label={
                                showConfirmPassword
                                  ? "Hide password"
                                  : "Show password"
                              }
                              icon={
                                showConfirmPassword ? (
                                  <FiEyeOff />
                                ) : (
                                  <FiEyeOff />
                                )
                              }
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            />
                          </InputRightElement>
                        </InputGroup>

                        <Button
                          colorScheme="orange"
                          bg="#DFC4A4"
                          color="#4f3a3a"
                          size="md"
                          onClick={changePassword}
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  </VStack>
                </Box>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </main>
      )}

      {/* User Information */}
      {isUsers && (
        <main className="grid justify-items-center max-w-full font-quicksand max-h-full">
          <figure className="grid justify-items-center mb-5">
            {isUsers.shopImage === null ? (
              <>
                {" "}
                <img
                  src="https://i.pinimg.com/originals/75/51/d8/7551d8249f7048d3159a1abf8d0e257d.jpg"
                  alt="Cover"
                  className="bg-cover bg-center object-cover lg:h-72 w-screen"
                />
              </>
            ) : (
              <>
                {" "}
                <img
                  src={isUsers.shopImage}
                  alt="Cover"
                  className="bg-cover bg-center object-cover lg:h-72 w-screen"
                />
              </>
            )}

            <Avatar
              className="relative bottom-16 cursor-pointer transition hover:scale-105"
              zIndex={1}
              borderRadius="full"
              boxSize="135px"
              border={"solid"}
              onClick={() => {
                setOpen(true);
                setCurrentImage(isUsers.image);
              }}
              src={isUsers.image}
            />
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={[{ src: currentImage }]}
              plugins={[Zoom]}
            />

            {/* Edit Button to Open Modal */}

            <p className="mt-2 relative bottom-16 flex font-quicksand font-bold">
              {isUsers.fullname}
            </p>

            <label className="text-xs relative bottom-16 mt-1">
              {isUsers.isSeller && (
                <p className="bg-green-300 text-gray-950 px-2 rounded-md text-xs truncate font-semibold">
                  Verified Seller
                </p>
              )}
            </label>
          </figure>

          <figure className="flex gap-16 relative bottom-16 mb-5 text-center">
            <label className="grid">
              <p>
                <InventoryCounts id={isUsers.id} />
              </p>
              <p>ITEM SELL</p>
            </label>
            <label className="grid">
              <p>
                <ItemSold id={isUsers.id} />
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
            </TabList>
            <TabPanels>
              <TabPanel>
                <Inventory userImage={isUsers.image} userId={isUsers.id} />
              </TabPanel>
              <TabPanel>
                <Box
                  w={{ base: "xs", md: "md", lg: "lg" }}
                  className="font-poppins shadow-2xl space-y-2 border bg-[#ebe6e60a] grid mb-16 p-5 text-sm rounded-2xl"
                >
                  <button
                    onClick={() => handleUpdateAccount(isUsers)}
                    className="text-2xl  justify-self-end px-4"
                  >
                    <FiEdit3 />
                  </button>
                  {isUsers.isSeller ? (
                    <>
                      <p className="ssm:w-72 lg:w-full text-center mb-2 text-lg">
                        {isUsers.shopDescription}
                      </p>
                      <hr className="w-full mx-auto" />
                    </>
                  ) : (
                    <p className="text-center mb-2 text-lg">Become a Seller</p>
                  )}

                  <label className="text-xs">
                    Email:
                    <p className="text-base ssm:w-72 lg:w-full truncate font-semibold w-full">
                      {isUsers.email}
                    </p>
                  </label>

                  <label className="text-xs">
                    Address:
                    <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                      {isUsers.address}
                    </p>
                  </label>

                  <label className="text-xs">
                    CTU ID:
                    <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                      {isUsers.idNumber}
                    </p>
                  </label>

                  <label className="ssm:w-72 lg:w-full text-xs">
                    Username:
                    <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                      {isUsers.username}
                    </p>
                  </label>

                  <label className="text-xs">
                    Department:
                    <p className=" text-base truncate font-semibold w-full">
                      {isUsers.department}
                    </p>
                  </label>

                  <label className="text-xs">
                    Course:
                    <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                      {isUsers.course}
                    </p>
                  </label>

                  <label className="text-xs">
                    Phone Number:
                    <p className="ssm:w-72 lg:w-full text-base truncate font-semibold w-full">
                      {isUsers.phoneNumber}
                    </p>
                  </label>

                  <label className="text-xs">
                    Gender:
                    <p className="text-base truncate font-semibold w-full">
                      {isUsers.gender}
                    </p>
                  </label>

                  <label className="text-xs">
                    <p className="text-base truncate font-semibold w-full">
                      {isUsers.isUser} Member
                    </p>
                  </label>

                  <article>
                    <label className="text-xs grid">
                      <a
                        href={isUsers.facebook}
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
            </TabPanels>
          </Tabs>

          {/* Update Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={usersEmailOnSubmit}>
                  <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder={users.email}
                      required
                    />
                    <Button className="w-full" mr={1} type="submit">
                      Update Email
                    </Button>
                  </FormControl>
                </form>
                <form onSubmit={usersIdnumberOnSubmit}>
                  <FormControl mb={4}>
                    <FormLabel>CTU ID:</FormLabel>
                    <Input
                      type="number"
                      name="idNumber"
                      value={idNumber}
                      onChange={handleCtuIdNumber}
                      placeholder={users.idNumber}
                      required
                    />
                    <Button className="w-full" mr={1} type="submit">
                      Update CTU ID
                    </Button>
                  </FormControl>
                </form>
                <form className=" text-xs" onSubmit={usersPhoneGcashOnSubmit}>
                  <Box className="flex">
                    <FormControl mb={4}>
                      <FormLabel>GCASH Number:</FormLabel>
                      <Input
                        type="number"
                        name="gcashNumber"
                        value={gcashNumber}
                        onChange={handleUserNumbersChange}
                        placeholder={users.gcashNumber}
                        required
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Phone Number:</FormLabel>
                      <Input
                        type="number"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleUserNumbersChange}
                        placeholder={users.gcashNumber}
                        required
                      />
                    </FormControl>
                  </Box>
                  <Button className="w-full" mr={1} type="submit">
                    Update Numbers
                  </Button>
                </form>
              </ModalBody>
              <form onSubmit={usersOnSubmit}>
                <ModalBody>
                  <FormControl mb={4}>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      type="text"
                      name="fullname"
                      value={users.fullname}
                      onChange={userOnChange}
                      placeholder="Full Name"
                      required
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      name="username"
                      value={users.username}
                      onChange={userOnChange}
                      placeholder="Username"
                      required
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="text"
                      name="address"
                      value={users.address}
                      onChange={userOnChange}
                      placeholder="Address"
                      required
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      type="text"
                      name="gender"
                      value={users.gender}
                      onChange={userOnChange}
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Select>
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Department</FormLabel>
                    <Select
                      type="text"
                      name="department"
                      value={users.department}
                      onChange={userOnChange}
                      required
                    >
                      <option value=""></option>
                      <option value="COLLEGE OF TECHNOLOGY">
                        COLLEGE OF TECHNOLOGY
                      </option>
                      <option value="COLLEGE OF ENGINEERING">
                        COLLEGE OF ENGINEERING
                      </option>
                      <option value="COLLEGE OF EDUCATION">
                        COLLEGE OF EDUCATION
                      </option>
                      <option value="COLLEGE OF MANAGEMENT ENTREPRENEURSHIP">
                        COLLEGE OF MANAGEMENT ENTREPRENEURSHIP
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Course:</FormLabel>
                    <Input
                      type="text"
                      name="course"
                      value={users.course}
                      onChange={userOnChange}
                      placeholder="Course"
                      required
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Facebook Link:</FormLabel>
                    <Input
                      type="text"
                      name="facebook"
                      value={users.facebook}
                      onChange={userOnChange}
                      placeholder="facebook link"
                      required
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Shop Description:</FormLabel>
                    <Textarea
                      type="text"
                      name="shopDescription"
                      value={users.shopDescription}
                      onChange={userOnChange}
                      placeholder="Shop Description"
                      required
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Profile Image</FormLabel>
                    <Input
                      id="dropzone-file"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={userOnChangeFileImage}
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>
                      Shop Image (Instrinsic Size 1920 x 1080) required.
                    </FormLabel>
                    <Input
                      id="dropzone-file"
                      type="file"
                      name="shopImage"
                      accept="image/*"
                      onChange={userOnChangeFileImage}
                    />
                  </FormControl>
                </ModalBody>
                <Button
                  bg={"none"}
                  className="text-center w-full "
                  onClick={forgotPasswordModal.onOpen}
                >
                  Change Password
                </Button>
                <ModalFooter>
                  <Button className="w-full" mr={1} type="submit">
                    Update
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          {/* Forgot Password reset password */}
          <Modal
            blockScrollOnMount={false}
            isOpen={forgotPasswordModal.isOpen}
            onClose={forgotPasswordModal.onClose}
            size={{ base: "xs", md: "md", lg: "lg" }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box p={6} rounded="lg" boxShadow="md">
                  <VStack spacing={4} align="stretch">
                    <Heading as="h2" size="lg" textAlign="center" mb={2}>
                      Change Password
                    </Heading>
                    <Text fontSize="md" textAlign="center">
                      To change a password input your email.
                    </Text>

                    {!done ? (
                      <>
                        <Input
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          fontSize="12px"
                          rounded="md"
                          mb={4}
                        />
                        <Button
                          colorScheme="orange"
                          bg="#DFC4A4"
                          color="#4f3a3a"
                          size="md"
                          onClick={handleForgotPassword}
                          isLoading={loading}
                          loadingText="Processing..."
                        >
                          Change Password
                        </Button>
                      </>
                    ) : (
                      <>
                        <Box>
                          <Text
                            textAlign="center"
                            bg="transparent"
                            mt={5}
                            mb={2}
                            rounded="xl"
                            width="100%"
                          >
                            {email}
                          </Text>
                          <Text fontSize="sm" textAlign="center" px={2} my={2}>
                            Reset code is valid for 1 hour.
                          </Text>
                        </Box>
                      </>
                    )}

                    {done && (
                      <>
                        <Input
                          placeholder="Reset Code"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          fontSize="12px"
                          rounded="md"
                          mb={4}
                        />
                        <InputGroup size="md" mb={4}>
                          <Input
                            pr="4.5rem"
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setNewPassword(e.target.value)}
                            color="#AD9C8E"
                            fontSize="12px"
                            rounded="md"
                          />
                          <InputRightElement width="3rem">
                            <IconButton
                              variant="ghost"
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                              icon={showPassword ? <FiEyeOff /> : <FiEyeOff />}
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          </InputRightElement>
                        </InputGroup>

                        <InputGroup size="md" mb={4}>
                          <Input
                            pr="4.5rem"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={newConfirmPassword}
                            onChange={(e) =>
                              setNewConfirmPassword(e.target.value)
                            }
                            color="#AD9C8E"
                            fontSize="12px"
                            rounded="md"
                          />
                          <InputRightElement width="3rem">
                            <IconButton
                              variant="ghost"
                              aria-label={
                                showConfirmPassword
                                  ? "Hide password"
                                  : "Show password"
                              }
                              icon={
                                showConfirmPassword ? (
                                  <FiEyeOff />
                                ) : (
                                  <FiEyeOff />
                                )
                              }
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            />
                          </InputRightElement>
                        </InputGroup>

                        <Button
                          colorScheme="orange"
                          bg="#DFC4A4"
                          color="#4f3a3a"
                          size="md"
                          onClick={changePassword}
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  </VStack>
                </Box>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </main>
      )}
    </div>
  );
}

export default Account;
