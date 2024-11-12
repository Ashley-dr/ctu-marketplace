/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
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
  Alert,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading,
  VStack,
  useToast,
  Container,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  useBreakpointValue,
  Divider,
  RadioGroup,
} from "@chakra-ui/react";
import logo from "../assets/ctu-logo.jpg";
import logomarket from "../assets/ctu-logo-marketplace.jpg";
import { FiEye } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { FiEyeOff } from "react-icons/fi";
import { FaSignInAlt, FaUserCheck } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useCookies } from "react-cookie";
import {
  MdAccountBox,
  MdAddBox,
  MdContactPage,
  MdDashboard,
  MdHome,
  MdMenu,
  MdNotifications,
  MdOutlineAlternateEmail,
} from "react-icons/md";
import { UserContext } from "../../backend/Context/userContext";
import { CiLogout } from "react-icons/ci";
import { PiPasswordBold, PiShoppingCartDuotone } from "react-icons/pi";
import { AiOutlineUpload } from "react-icons/ai";
import OrdersCount from "../context/OrdersCount";
import TransactionCount from "../context/TransactionCount";
import UsersMessage from "../pages/UsersMessage";
import Orders from "../tabs/Orders";
import OrdersDrawer from "../tabs/OrdersDrawer";
function Navigation() {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const [userData, setUserData] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const signupModal = useDisclosure();
  const loginModal = useDisclosure();
  const forgotPasswordModal = useDisclosure();
  const selectModal = useDisclosure();
  const facultysignupModal = useDisclosure();
  const [isAdmin, setIsAdmin] = useState();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [token, setToken] = useState("");

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
          zIndex: 40,
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
          zIndex: 40,
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
          zIndex: 40,
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
        zIndex: 40,
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
        zIndex: 40,
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
        zIndex: 40,
        isClosable: true,
      });
    }
  };

  const [SignupInputValue, setSignUpInputValue] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
    department: "",
    facebook: "",
    address: "",
    gender: "",
    course: "",
    phoneNumber: "",
    validId: "",
    shopImage: "",
    shopDescription: "",
    gcashNumber: "",
    idNumber: "",
    image: "",
    isBuyer: false,
  });
  const [FacultySignupInputValue, setFacultySignupInputValue] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
    address: "",
    facebook: "",
    gender: "",
    phoneNumber: "",
    validId: "",
    shopImage: "",
    shopDescription: "",
    gcashNumber: "",
    isBuyer: false,
  });

  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const handleError = (err) =>
    toast.error(err, {
      position: "top-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}/signup`, SignupInputValue)
      .then((result) => {
        setSignUpInputValue({
          email: "",
          password: "",
          username: "",
          fullname: "",
          department: "",
          facebook: "",
          gender: "",
          course: "",
          phoneNumber: "",
          validId: "",
          shopDescription: "",
          shopImage: "",
          image: "",
          gcashNumber: "",
          idNumber: "",
          address: "",
          isBuyer: "",
        });
        if (result.data.success) {
          toast.success(result.data.message);
          navigate("/");

          signupModal.onClose();
          selectModal.onClose();
        }
      })
      .catch((err) => {
        console.log("Error", err);
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };

  const handleFacultySignupSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}/facultysignup`, FacultySignupInputValue)
      .then((result) => {
        setFacultySignupInputValue({
          email: "",
          password: "",
          username: "",
          fullname: "",
          facebook: "",
          gender: "",
          image: "",
          phoneNumber: "",
          validId: "",
          shopDescription: "",
          shopImage: "",
          address: "",
          isBuyer: "",
          gcashNumber: "",
        });

        if (result.data.success) {
          toast.success(result.data.message);
          navigate("/");
          facultysignupModal.onClose();
          selectModal.onClose();
        }
        // window.location.reload();
      })
      .catch((err) => {
        console.log("Error", err);
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };

  const loginInput = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseUrl}/login`,
        {
          ...inputLogin,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          window.location.reload();
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputLogin({
      ...inputLogin,
      email: "",
      password: "",
    });
  };

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
  }, [baseUrl, cookies, navigate, removeCookies]);

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
  }, [baseUrl, cookies, navigate, removeCookies]);

  const logout = () => {
    removeCookies("token");

    navigate("/");

    window.location.reload();
  };
  const handleLogout = async () => {
    try {
      // Send logout request to backend
      await axios.post(
        `${baseUrl}/logout`,
        {},
        { withCredentials: true } // Ensure the cookie is sent with the request
      );

      // Remove the token cookie from client-side storage (optional but recommended)
      removeCookies("token", { path: "/" });

      // Redirect to login or home page
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="max-w-full font-quicksand text-sm fixed w-screen z-20">
      <ToastContainer />
      <Box
        className=""
        bg={useColorModeValue("brand.light", "brand.dark")}
        px={4}
      >
        <Flex
          h={16}
          className=""
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Link to="/" className="flex space-x-4 font-poppins">
            <Box className="">
              {" "}
              <Avatar size={"md"} src={logomarket} />
            </Box>
            <Text className="text-xs mt-1.5">
              CTU DANAO <hr /> MARKETPLACE
            </Text>
          </Link>

          <Flex zIndex={10} alignItems={"center"}>
            <Stack direction={"row"} spacing={1}>
              <Button onClick={toggleColorMode} className="mt-1" mr={2}>
                {" "}
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {isMobile ? (
                <>
                  {!isUsers && !isFaculty ? (
                    <>
                      <Menu>
                        <MenuButton mt={1} as={Button}>
                          <MdMenu />
                        </MenuButton>
                        <MenuList>
                          <MenuItem>
                            <Button
                              onClick={loginModal.onOpen}
                              className="transition ease-in-out shadow-sm w-full  hover:scale-105"
                            >
                              <p className="text-xs">Login</p>
                            </Button>
                          </MenuItem>
                          <MenuItem>
                            <Button
                              onClick={selectModal.onOpen}
                              className="transition ease-in-out shadow-sm w-full hover:scale-105"
                            >
                              <p className="text-xs">Get Started</p>
                            </Button>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  {" "}
                  {!isUsers && !isFaculty ? (
                    <>
                      {" "}
                      <Box className="space-x-2 m-1 ">
                        <Button
                          onClick={loginModal.onOpen}
                          className="transition ease-in-out shadow-sm  hover:scale-105"
                        >
                          <p className="text-xs">Login</p>
                        </Button>
                        <Button
                          onClick={selectModal.onOpen}
                          className="transition ease-in-out shadow-sm  hover:scale-105"
                        >
                          <p className="text-xs">Get Started</p>
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
              {/*  Users Data */}
              {isUsers ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"md"}
                      className="border-green-600"
                      src={isUsers.image}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar showBorder size={"2xl"} src={isUsers.image} />
                    </Center>
                    <br />
                    <Center>
                      <p className="">Welcome</p>
                    </Center>
                    <Center>
                      <p>
                        {isUsers.fullname}
                        {isUsers.isAdmin}
                      </p>
                    </Center>
                    <Center>
                      <p>Student Member</p>
                    </Center>
                    <MenuDivider />{" "}
                    <MenuItem className="gap-2 " onClick={onOpen}>
                      <MdContactPage /> Contacts
                    </MenuItem>
                    <Drawer
                      isOpen={isOpen}
                      placement="left"
                      size={"sm"}
                      onClose={onClose}
                    >
                      <DrawerOverlay />
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader></DrawerHeader>
                        <DrawerBody>
                          {/* Load the UsersMessage Component within the Drawer */}
                          <UsersMessage email={isUsers.email} />
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                    <Link to="/">
                      {" "}
                      <MenuItem className="gap-2 ">
                        <MdHome /> Home
                      </MenuItem>
                    </Link>
                    <Link to="/Account">
                      {" "}
                      <MenuItem className="gap-2 ">
                        <MdAccountBox /> Account Settings
                      </MenuItem>
                    </Link>
                    {/* <Link to={`/Orders/${isUsers.id}`}> */}{" "}
                    <MenuItem className="gap-2.5 " onClick={onOpenDrawer}>
                      <PiShoppingCartDuotone /> Orders
                      <OrdersCount id={isUsers.id} />
                    </MenuItem>
                    <Drawer
                      isOpen={isOpenDrawer}
                      placement="right"
                      size={"sm"}
                      onClose={onCloseDrawer}
                    >
                      <DrawerOverlay />
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader className="flex items-center gap-2">
                          <Text>Cart</Text>
                          <Text className="flex items-cente gap-2 font-thin">
                            [ Item
                            <OrdersCount id={isUsers.id} />]
                          </Text>
                        </DrawerHeader>
                        <DrawerBody>
                          <Divider />
                          <OrdersDrawer id={isUsers.id} />
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                    {/* </Link> */}
                    {isUsers.isSeller === true ? (
                      <div>
                        <Link to={`/Transactions/${isUsers.id}`}>
                          <MenuItem className="gap-2 ">
                            {" "}
                            <GrTransaction /> Transactions
                            <TransactionCount id={isUsers.id} />
                          </MenuItem>
                        </Link>
                        <Link to={`/AddProducts/${isUsers.id}`}>
                          <MenuItem className="gap-2 ">
                            {" "}
                            <MdAddBox /> Add Products
                          </MenuItem>
                        </Link>
                      </div>
                    ) : (
                      <Link to={`/BecomeSeller/${isUsers.id}`}>
                        <MenuItem className="gap-2">
                          {" "}
                          <FaUserCheck /> Become a Seller
                        </MenuItem>
                      </Link>
                    )}
                    {isUsers.isAdmin === true ? (
                      <Link to="/MainAdmDash">
                        <MenuItem className="gap-2">
                          {" "}
                          <MdDashboard /> Admin Dashboard
                        </MenuItem>
                      </Link>
                    ) : (
                      <></>
                    )}
                    <MenuItem>
                      <Button className="w-full gap-2" onClick={handleLogout}>
                        <p className="text-xs">Sign out</p>
                        <CiLogout />
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <></>
              )}
              {/*  Users Data */}
              {/* Faculty Users Data */}
              {isFaculty ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"md"} src={isFaculty.image} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar showBorder size={"2xl"} src={isFaculty.image} />
                    </Center>
                    <br />
                    <Center>
                      <p>Welcome</p>
                    </Center>
                    <Center>
                      <p>{isFaculty.fullname}</p>
                    </Center>
                    <Center>
                      <p>Faculty Member</p>
                    </Center>
                    <MenuDivider />
                    <MenuItem className="gap-2 " onClick={onOpen}>
                      <MdContactPage /> Contacts
                    </MenuItem>
                    <Drawer
                      isOpen={isOpen}
                      placement="left"
                      size={"full"}
                      onClose={onClose}
                    >
                      <DrawerOverlay />
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader></DrawerHeader>
                        <DrawerBody>
                          {/* Load the UsersMessage Component within the Drawer */}
                          <UsersMessage email={isFaculty.email} />
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                    <Link to="/">
                      {" "}
                      <MenuItem className="gap-2 ">
                        <MdHome /> Home
                      </MenuItem>
                    </Link>

                    <Link to="/Account">
                      <MenuItem className="gap-2 ">
                        <MdAccountBox />
                        Account Settings
                      </MenuItem>
                    </Link>
                    <MenuItem className="gap-2.5 " onClick={onOpenDrawer}>
                      <PiShoppingCartDuotone /> Orders
                      <OrdersCount id={isFaculty.id} />
                    </MenuItem>
                    <Drawer
                      isOpen={isOpenDrawer}
                      placement="right"
                      size={"sm"}
                      onClose={onCloseDrawer}
                    >
                      <DrawerOverlay />
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader className="flex items-center gap-2">
                          <Text>Cart</Text>
                          <Text className="flex items-cente gap-2 font-thin">
                            [ Item
                            <OrdersCount id={isFaculty.id} />]
                          </Text>
                        </DrawerHeader>
                        <DrawerBody>
                          <Divider />
                          <OrdersDrawer id={isFaculty.id} />
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                    {isFaculty.isSeller === true ? (
                      <div>
                        <Link to={`/Transactions/${isFaculty.id}`}>
                          <MenuItem className="gap-2 ">
                            {" "}
                            <GrTransaction />
                            Transactions
                            <TransactionCount id={isFaculty.id} />
                          </MenuItem>
                        </Link>
                        <Link to={`/FacultyAddProducts/${isFaculty.id}`}>
                          <MenuItem className="gap-2 ">
                            <MdAddBox /> Add Products
                          </MenuItem>
                        </Link>
                      </div>
                    ) : (
                      <Link to={`/BecomeSeller/${isFaculty.id}`}>
                        <MenuItem className="gap-2 ">
                          <FaUserCheck /> Become a Seller
                        </MenuItem>
                      </Link>
                    )}
                    <MenuItem>
                      <Button className="w-full gap-2" onClick={handleLogout}>
                        <p className="text-xs">Sign out</p>
                        <CiLogout />
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <></>
              )}
              {/* Faculty Users Data */}
            </Stack>
          </Flex>
        </Flex>
      </Box>

      {/* Student Sign up Modal */}
      <Drawer
        blockScrollOnMount={false}
        placement="left"
        isOpen={signupModal.isOpen}
        onClose={signupModal.onClose}
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <p className="text-center mt-16 text-2xl font-bold font-poppins">
            Create new Account as Student
          </p>
          <p className="text-center text-sm font-thin mt-2">
            Already Registered?{" "}
            <button className=" font-normal" onClick={loginModal.onOpen}>
              Login
            </button>
          </p>
          <DrawerCloseButton />
          <DrawerBody pb={6} className="grid justify-items-center ">
            <form onSubmit={handleSignupSubmit} className="ssm:w-64 lg:w-96">
              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest  text-sm">
                  Fullname
                </label>
                <Input
                  placeholder="FULLNAME"
                  type="text"
                  mt={2}
                  mb={2}
                  name="fullname"
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={SignupInputValue.fullname}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  email
                </label>
                <Input
                  placeholder="email"
                  type="email"
                  name="email"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={SignupInputValue.email}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  Username
                </label>
                <Input
                  placeholder="Username"
                  type="text"
                  name="username"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={SignupInputValue.username}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  password
                </label>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={SignupInputValue.password}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  address
                </label>
                <Input
                  placeholder="Address"
                  type="text"
                  name="address"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={SignupInputValue.address}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  ctu id number
                </label>
                <Input
                  placeholder="id #"
                  type="number"
                  name="idNumber"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={SignupInputValue.idNumber}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  Phone Number
                </label>
                <Input
                  placeholder="Phone #"
                  type="number"
                  name="phoneNumber"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={SignupInputValue.phoneNumber}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  Department
                </label>
                <Select
                  type="text"
                  name="department"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={SignupInputValue.department}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                >
                  <option value="">Select</option>
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

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  Sex
                </label>
                <Select
                  type="text"
                  name="gender"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={SignupInputValue.gender}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                >
                  <option value="">Select</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </Select>
              </FormControl>
              {/* <FormControl>
              <label className=" font-poppins font-thick uppercase tracking-widest text-sm">Profile Picture</label>
               
              <label className="flex items-center justify-center w-full">
            <label className="flex  flex-col items-center justify-center w-96 h-64 mb-5 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-[#eaf3fffa] hover:bg-[#c5d0f3fa] ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineUpload className="text-5xl text-gray-900" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 font-quicksand text-lg">
                            Profile Image
                          </span>
                          <br />{" "}
                          <span className="font-semibold">Click to upload</span>{" "}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG
                        </p>
                      </div>
                      <Input        
              type="file"
              name="image"
              accept="image/*"
              mt={2}
              mb={2}
              rounded={"none"}
              borderBottom={"1px"}
              borderLeft={"1px"}
              borderRight={"1px"}
              borderTop={"1px"}
              value={SignupInputValue.image}
              onChange={(e) => {
                setSignUpInputValue({
                  ...SignupInputValue,
                  [e.target.name]: e.target.value,
                });
              }}
            />
                  </label>
                </label>
              </FormControl> */}

              <DrawerFooter className="grid">
                <Button
                  rounded={"none"}
                  className="w-full rounded-none self-center justify-self-center"
                  type="submit"
                >
                  Sign up
                </Button>
              </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Student Sign up Modal */}

      {/* Faculty Member Sign up Modal */}
      <Drawer
        blockScrollOnMount={false}
        isOpen={facultysignupModal.isOpen}
        onClose={facultysignupModal.onClose}
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <p className="text-center mt-16 text-2xl font-bold font-poppins">
            Create new Account as Faculty Member
          </p>
          <p className="text-center text-sm font-thin mt-2">
            Already Registered?{" "}
            <button className=" font-normal" onClick={loginModal.onOpen}>
              Login
            </button>
          </p>
          <DrawerCloseButton />
          <DrawerBody pb={6} className="grid justify-items-center ">
            <form
              onSubmit={handleFacultySignupSubmit}
              className="ssm:w-64 lg:w-96"
            >
              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  Full name
                </label>

                <Input
                  placeholder="FULLNAME"
                  type="text"
                  name="fullname"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={FacultySignupInputValue.fullname}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  email
                </label>

                <Input
                  placeholder="email@"
                  type="email"
                  name="email"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={FacultySignupInputValue.email}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  Username
                </label>
                <Input
                  placeholder="Username"
                  type="text"
                  name="username"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={FacultySignupInputValue.username}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  password
                </label>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={FacultySignupInputValue.password}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  address
                </label>
                <Input
                  placeholder="Address"
                  type="text"
                  name="address"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={FacultySignupInputValue.address}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  Phone Number
                </label>
                <Input
                  placeholder="Phone #"
                  type="number"
                  name="phoneNumber"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={FacultySignupInputValue.phoneNumber}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  Facebook
                </label>
                <Input
                  placeholder="Facebook"
                  type="text"
                  name="facebook"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={FacultySignupInputValue.facebook}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <label className=" font-poppins font-thick uppercase tracking-widest text-sm">
                  Sex
                </label>
                <Select
                  type="text"
                  name="gender"
                  mt={2}
                  mb={2}
                  rounded={"none"}
                  borderBottom={"1px"}
                  borderLeft={"1px"}
                  borderRight={"1px"}
                  borderTop={"1px"}
                  value={FacultySignupInputValue.gender}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <option value="">Select</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </Select>
              </FormControl>

              <DrawerFooter className="grid">
                <Button
                  rounded={"none"}
                  className="w-full rounded-none self-center justify-self-center"
                  type="submit"
                >
                  Sign up
                </Button>
              </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Faculty Member Sign up Modal */}

      {/* Log in Modal */}
      <Modal
        blockScrollOnMount={false}
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        size={{ base: "xs", md: "md", lg: "lg" }}
      >
        <ModalOverlay />
        <ModalContent className="border-r-8   border-[#111827]">
          <p className="ssm:text-sm  mt-10 w-80 uppercase px-7 mb-3 lg:text-xl font-poppins font-bold">
            Sign in with CTU - Danao Marketplace
          </p>

          <ModalCloseButton />
          <ModalBody pb={7}>
            <form onSubmit={loginInput}>
              <FormControl className="flex mb-8 mt-4">
                <FormLabel className="pt-1.5 border bg-[#142138] rounded-md">
                  <p className="text-xl mr-1 mb-2 pt-0.5 pl-2 text-white pr-1">
                    <MdOutlineAlternateEmail />
                  </p>
                </FormLabel>

                <input
                  className="mb-2  w-full bg-transparent pt-1 pl-1 border-b-4 border-gray-900"
                  placeholder="email@"
                  type="email"
                  name="email"
                  value={inputLogin.email}
                  onChange={(e) => {
                    setInputLogin({
                      ...inputLogin,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl className="flex mb-1 mt-10">
                <FormLabel className="pt-1.5 border bg-[#142138] rounded-md">
                  <p className="text-xl mr-1 mb-2 pt-0.5 pl-2 text-white pr-1">
                    <PiPasswordBold />
                  </p>
                </FormLabel>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      bg={"transparent"}
                      _hover={"none"}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={showPassword ? <FiEyeOff /> : <FiEye />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                  <input
                    className="mb-2  w-full bg-transparent pt-1 pl-1 border-b-4 border-gray-900"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={inputLogin.password}
                    onChange={(e) => {
                      setInputLogin({
                        ...inputLogin,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </InputGroup>
              </FormControl>

              <Button
                bg={"none"}
                className=""
                onClick={forgotPasswordModal.onOpen}
              >
                Forgot Password ?
              </Button>

              <div className="bg-gray-900 mt-5 rounded-lg text-white text-center text-sm  p-3 font-quicksand grid hover:bg-gray-950">
                <button type="submit" className="flex w-full justify-center">
                  Sign in <FaSignInAlt className="text-lg mt-0.5 ml-2" />
                </button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Log in Modal */}

      {/* Selector Modal */}
      <Modal
        blockScrollOnMount={false}
        isOpen={selectModal.isOpen}
        onClose={selectModal.onClose}
        size={{ base: "xs", sm: "md", lg: "lg" }} // Set responsive sizes for modal
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <p className="font-poppins">Create Account</p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text className="text-center font-poppins font-thin" mb="1rem">
              Are you a Student or Faculty Member
            </Text>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Student Registration Card */}
              <div className="relative h-72 rounded-lg bg-gradient-to-tl from-[#213261fb] via-[#2f617e] to-[#3f35cc] flex items-center justify-center">
                <button
                  className="h-full w-full sm:w-56 z-10 hover:bg-[#ffffff09] absolute inset-0"
                  onClick={signupModal.onOpen}
                ></button>
                <p className="text-xs font-poppins text-[#d5f4f5] absolute top-4 text-center uppercase">
                  Click here
                </p>
                <p className="text-2xl font-extrabold font-poppins text-[#dcf9fa] absolute bottom-16 px-4 text-center mb-10 sm:text-left">
                  Student Registration
                </p>
                <p className="text-xs sm:text-sm font-poppins text-[#a5e9fa] absolute bottom-4 px-4 text-center sm:text-left">
                  Create account as a Student Member here. You can sell, trade,
                  and buy items.
                </p>
              </div>

              {/* Faculty Registration Card */}
              <div className="relative h-72 rounded-lg bg-gradient-to-tr from-[#0d889efb] via-[#4260c4] to-[#be4daf] flex items-center justify-center">
                <button
                  className="h-full w-full sm:w-56 z-10 hover:bg-[#ffffff09] absolute inset-0"
                  onClick={facultysignupModal.onOpen}
                ></button>
                <p className="text-xs font-poppins text-[#d5f4f5] absolute top-4 text-center uppercase">
                  Click here
                </p>
                <p className="text-2xl font-extrabold font-poppins text-[#dcf9fa] absolute bottom-16 px-4 text-center mb-10 sm:text-right">
                  Faculty Registration
                </p>
                <p className="text-xs sm:text-sm font-poppins text-[#f7e2ff] absolute bottom-4 px-4 text-center sm:text-right">
                  Create account as a Faculty Member here. You can sell, trade,
                  and buy items.
                </p>
              </div>
            </div>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>

      {/* Selector Modal */}

      {/* Forgot Password reset password */}
      <Modal
        blockScrollOnMount={false}
        isOpen={forgotPasswordModal.isOpen}
        onClose={forgotPasswordModal.onClose}
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={6} rounded="lg" boxShadow="md">
              <VStack spacing={4} align="stretch">
                <Heading as="h2" size="lg" textAlign="center" mb={2}>
                  Reset Account
                </Heading>
                <Text fontSize="md" textAlign="center">
                  Forgot password? Input your email and check the reset code
                  from your email.
                </Text>

                {!done ? (
                  <>
                    <Input
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      bg="#efdbbb4f"
                      color="#AD9C8E"
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
                          icon={showPassword ? <FiEyeOff /> : <FiEye />}
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
                        onChange={(e) => setNewConfirmPassword(e.target.value)}
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
                          icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
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
      {/* Forgot Password reset password */}
    </div>
  );
}

export default Navigation;
