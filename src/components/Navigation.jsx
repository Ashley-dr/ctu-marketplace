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
} from "@chakra-ui/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useCookies } from "react-cookie";
import { UserContext } from "../../backend/Context/userContext";
import { CiLogout } from "react-icons/ci";
function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const [userData, setUserData] = useState(null);
  const signupModal = useDisclosure();
  const loginModal = useDisclosure();
  const selectModal = useDisclosure();
  const facultysignupModal = useDisclosure();
  const [isAdmin, setIsAdmin] = useState();
  const navigate = useNavigate();

  const [SignupInputValue, setSignUpInputValue] = useState({
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
    shopImage: "",
    shopDescription: "",
    gcashNumber: "",
  });
  const [FacultySignupInputValue, setFacultySignupInputValue] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
    facebook: "",
    gender: "",
    phoneNumber: "",
    validId: "",
    shopImage: "",
    shopDescription: "",
    gcashNumber: "",
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
      .post("http://localhost:4000/signup", SignupInputValue)
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
          gcashNumber: "",
        });
        const { success, message } = result;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {}, 2000);
        } else {
          handleError(message);
        }
        window.location.reload();
        navigate("/");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleFacultySignupSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/facultysignup", FacultySignupInputValue)
      .then((result) => {
        setFacultySignupInputValue({
          email: "",
          password: "",
          username: "",
          fullname: "",
          facebook: "",
          gender: "",

          phoneNumber: "",
          validId: "",
          shopDescription: "",
          shopImage: "",
          gcashNumber: "",
        });
        const { success, message } = result;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {}, 2000);
        } else {
          handleError(message);
        }
        window.location.reload();
        navigate("/");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const loginInput = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
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

  const logout = () => {
    removeCookies("token");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="max-w-full">
      <ToastContainer />
      <Box
        className="max-w-full "
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link to="/">
            <Box className="">
              {" "}
              <Avatar size={"sm"} />
            </Box>
          </Link>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode} className="mt-1">
                {" "}
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {!isUsers && !isFaculty ? (
                <>
                  {" "}
                  <Box className="">
                    <Button onClick={loginModal.onOpen}>
                      {/* <Link to="/login">LOGIN</Link> */}
                      Login
                    </Button>
                    <Button onClick={selectModal.onOpen}>
                      {/* <Link to="/Signup">SIGN UP</Link> */}
                      Signup
                    </Button>
                  </Box>
                </>
              ) : (
                <></>
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
                    <Avatar size={"md"} src={isUsers.image} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar showBorder size={"2xl"} src={isUsers.image} />
                    </Center>
                    <br />
                    <Center>
                      <p>Welcome</p>
                    </Center>
                    <Center>
                      <p>
                        {isUsers.fullname}
                        {isUsers.isAdmin}
                      </p>
                    </Center>
                    <Center>
                      <p>Logged as Student Member</p>
                    </Center>
                    <MenuDivider />

                    <Link to={`/Orders/${isUsers.id}`}>
                      {" "}
                      <MenuItem>Orders</MenuItem>
                    </Link>

                    <MenuItem>
                      {" "}
                      <Link to="/Account">Account Settings</Link>
                    </MenuItem>
                    {isUsers.isSeller === true ? (
                      <div>
                        <Link to={`/AddProducts/${isUsers.id}`}>
                          <MenuItem> Add Products</MenuItem>
                        </Link>
                        <Link to={`/Inventory/${isUsers.id}`}>
                          <MenuItem>Inventory</MenuItem>
                        </Link>
                        <Link to={`/Transactions/${isUsers.id}`}>
                          <MenuItem>Transactions</MenuItem>
                        </Link>
                      </div>
                    ) : (
                      <MenuItem>
                        {" "}
                        <Link to={`/BecomeSeller/${isUsers.id}`}>
                          Become a Seller
                        </Link>
                      </MenuItem>
                    )}
                    {isUsers.isAdmin === true ? (
                      <MenuItem>
                        <Link to="/AdminDash">Admin Dashboard</Link>
                      </MenuItem>
                    ) : (
                      <></>
                    )}
                    <MenuItem>
                      <Button onClick={logout}>
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
                    <Avatar size={"sm"} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} />
                    </Center>
                    <br />
                    <Center>
                      <p>Welcome</p>
                    </Center>
                    <Center>
                      <p>{isFaculty.fullname}</p>
                    </Center>
                    <Center>
                      <p>Logged as Faculty Member</p>
                    </Center>
                    <MenuDivider />
                    <Link to={`/Orders/${isFaculty.id}`}>
                      {" "}
                      <MenuItem>Orders</MenuItem>
                    </Link>

                    <MenuItem>
                      {" "}
                      <Link to="/Account">Account Settings</Link>
                    </MenuItem>
                    {isFaculty.isSeller === true ? (
                      <div>
                        <MenuItem>
                          <Link to={`/FacultyAddProducts/${isFaculty.id}`}>
                            Add Products
                          </Link>
                        </MenuItem>
                        <Link to={`/Inventory/${isFaculty.id}`}>
                          <MenuItem>Inventory</MenuItem>
                        </Link>
                        <Link to={`/Transactions/${isFaculty.id}`}>
                          <MenuItem>Transactions</MenuItem>
                        </Link>
                        <MenuItem>
                          <Button onClick={logout}>
                            <CiLogout />
                          </Button>
                        </MenuItem>
                      </div>
                    ) : (
                      <MenuItem>
                        {" "}
                        <Link to={`/BecomeSeller/${isFaculty.id}`}>
                          Become a Seller
                        </Link>
                      </MenuItem>
                    )}
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
      <Modal
        blockScrollOnMount={false}
        isOpen={signupModal.isOpen}
        onClose={signupModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSignupSubmit}>
              <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input
                  placeholder="email@"
                  type="email"
                  name="email"
                  value={SignupInputValue.email}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Username:</FormLabel>
                <Input
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={SignupInputValue.username}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password:</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={SignupInputValue.password}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Fullname:</FormLabel>
                <Input
                  placeholder="Fullname"
                  type="text"
                  name="fullname"
                  value={SignupInputValue.fullname}
                  onChange={(e) => {
                    setSignUpInputValue({
                      ...SignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>

              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={signupModal.onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Student Sign up Modal */}

      {/* Faculty Member Sign up Modal */}
      <Modal
        blockScrollOnMount={false}
        isOpen={facultysignupModal.isOpen}
        onClose={facultysignupModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Faculty Members Registration</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleFacultySignupSubmit}>
              <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input
                  placeholder="email@"
                  type="email"
                  name="email"
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
                <FormLabel>Username:</FormLabel>
                <Input
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={FacultySignupInputValue.username}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password:</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={FacultySignupInputValue.password}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Fullname:</FormLabel>
                <Input
                  placeholder="Fullname"
                  type="text"
                  name="fullname"
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
                <FormLabel>Facebook Link:</FormLabel>
                <Input
                  placeholder="Facebook"
                  type="text"
                  name="facebook"
                  value={FacultySignupInputValue.facebook}
                  onChange={(e) => {
                    setFacultySignupInputValue({
                      ...FacultySignupInputValue,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Faculty Member Sign up Modal */}

      {/* Log in Modal */}
      <Modal
        blockScrollOnMount={false}
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign in</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={loginInput}>
              <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input
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
              <FormControl>
                <FormLabel>Password:</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={inputLogin.password}
                  onChange={(e) => {
                    setInputLogin({
                      ...inputLogin,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </FormControl>

              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Save
                </Button>
              </ModalFooter>
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
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Are you a Student or Faculty Member
            </Text>
            <Button onClick={facultysignupModal.onOpen}>
              <Avatar>Fac</Avatar>
            </Button>
            <Button onClick={signupModal.onOpen}>
              <Avatar>Stu</Avatar>
            </Button>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      {/* Selector Modal */}
    </div>
  );
}

export default Navigation;
