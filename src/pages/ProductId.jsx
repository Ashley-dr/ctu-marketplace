/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Flex,
  Center,
  Divider,
} from "@chakra-ui/react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { CgNametag } from "react-icons/cg";
import { MdArrowUpward, MdDelete, MdMessage } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { formatDate, formatDistanceToNow } from "date-fns";
import { AtSignIcon, CalendarIcon, LinkIcon } from "@chakra-ui/icons";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoPricetagOutline } from "react-icons/io5";
import { TbLetterT, TbSquareLetterS } from "react-icons/tb";
import { CiShoppingCart, CiShoppingTag } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "flowbite-react";
export const formatDateToNow = (date) => {
  const validDate = new Date(date);
  if (isNaN(validDate)) {
    return "Invalid date";
  }
  return formatDistanceToNow(validDate, { addSuffix: true });
};
import { LuDot } from "react-icons/lu";
import { initLightboxJS } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { SlideshowLightbox } from "lightbox.js-react";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import ChatPage from "../tabs/ChatPage";
import Products from "./Products";
function ProductId() {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);
  const [productData, setProductData] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComments] = useState("");
  const { id } = useParams();
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const [UserSelectedProduct, UsersetSelectedProduct] = useState("");
  const [FacultySelectedProduct, FacultysetSelectedProduct] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const [textToCopy, setTextToCopy] = useState(""); // The text you want to copy
  const [copyStatus, setCopyStatus] = useState(false);

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };
  const [quantity, setQuantity] = useState(1);
  const [purchasedSchema, setPurchasedSchema] = useState({
    sellerId: "",
    userId: "",
    productId: "",
    prodName: "",
    message: "",
    sellerEmail: "",
    accountType: "",
    buyerType: "",
    sellerName: "",
    quantity: "",
    price: "",
    buyerName: "",
    buyerEmail: "",
    status: "",
    total: "",
    types: "",
    marketType: "",
    image: "",
    sellerFacebook: "",
    buyerFacebook: "",
    sellerPhoneNumber: "",
    buyerPhoneNumber: "",
    sellerGcashNumber: "",
    buyerGcashNumber: "",
  });
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

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${baseUrl}/api/products/${id}`)
        .then((result) => {
          setProductData(result.data);
        })
        .catch((err) => {
          console.log("Error to fetch product");
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [baseUrl, id]);

  const handleUserModal = (products) => {
    UsersetSelectedProduct(products);
    onOpen();
  };
  const handleFacultyModal = (products) => {
    FacultysetSelectedProduct(products);
    onOpen();
  };
  const purchasedOnChange = (e) => {
    setPurchasedSchema({ ...purchasedSchema, [e.target.name]: e.target.value });
  };

  const productPurchased = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/api/purchasedItem`, purchasedSchema)
      .then((result) => {
        setPurchasedSchema({
          sellerId: "",
          userId: "",
          productId: "",
          prodName: "",
          message: "",
          sellerEmail: "",
          accountType: "",
          buyerType: "",
          sellerName: "",
          quantity: "",
          price: "",
          buyerName: "",
          buyerEmail: "",
          status: "",
          total: "",
          types: "",
          marketType: "",
          image: "",
          sellerFacebook: "",
          buyerFacebook: "",
          sellerPhoneNumber: "",
          buyerPhoneNumber: "",
          sellerGcashNumber: "",
          buyerGcashNumber: "",
        });
        navigate(`/Orders/${purchasedSchema.userId}`);
      })
      .catch((err) => {
        console.log("Error submitting:", err);
      });
  };
  const commentHandler = (e) => {
    e.preventDefault();

    let commenterName = "";
    let commenterImage = "";
    let commenterEmail = "";
    let commenterId = "";
    let commenterAccountType = "";
    if (isUsers) {
      commenterName = isUsers.fullname;
      commenterImage = isUsers.image;
      commenterAccountType = isUsers.isUser;
      commenterEmail = isUsers.email;
      commenterId = isUsers.id;
    } else if (isFaculty) {
      commenterName = isFaculty.fullname;
      commenterImage = isFaculty.image;
      commenterEmail = isFaculty.email;
      commenterAccountType = isFaculty.isFaculty;
      commenterId = isFaculty.id;
    }
    axios
      .post(`${baseUrl}/api/comments/${id}`, {
        comment: newComment,
        commenterImage: commenterImage,
        commenterEmail: commenterEmail,
        commenterAccountType: commenterAccountType,
        commenterId: commenterId,
        commenterName: commenterName,
      })
      .then((result) => {
        setComments([...comments, result.data]);
        setNewComments("");
      })
      .catch((err) => {
        console.log("Error posting comment: ", err);
      });
  };
  const commentDelete = (commentId) => {
    axios
      .delete(`${baseUrl}/api/comments/${id}/${commentId}`)
      .then((result) => {
        setComments(comments.filter((comment) => comment._id !== commentId));
      })
      .catch((err) => {
        console.log("Error deleting comment:", err);
      });
  };

  useEffect(() => {
    let intervalId;

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/comments/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    if (id) {
      // Fetch immediately and then start polling
      fetchComments();
      intervalId = setInterval(fetchComments, 1000); // Fetch every 1 second
    }

    // Cleanup on unmount or when selectedProductId changes
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [id]);

  const quantityHandler = (e) => {
    e.preventDefault();
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };
  const incrementQnty = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  const decrementQnty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Number of slides to show at once on small screens
        },
      },
    ],
  };
  const drawer = () => {
    onOpenDrawer();
  };
  const [open, setOpen] = useState(false); // Lightbox open state
  const [currentImage, setCurrentImage] = useState(0); // Track current image index

  const handleOpenLightbox = (index) => {
    setCurrentImage(index); // Set the clicked image index
    setOpen(true); // Open the lightbox
  };

  return (
    <div
      id="item"
      className="rounded-md  pb-4 max-w-full max-h-full lg:justify-items-center lg:grid mb-10  lg:mt-10"
    >
      <a
        href="#item"
        className="fixed  bg-[#8080804a] bottom-4 right-4 flex items-center justify-center  p-2 rounded-full z-10 shadow-lg hover:bg-[#bababad0] transition duration-300 ease-in-out"
      >
        <MdArrowUpward className="text-2xl" />
      </a>
      <figure className=" lg:justify-items-center lg:grid max-w-full w-full">
        <article>
          {productData ? (
            <div>
              <div className="mt-5    grid  ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 justify-items-center ">
                <div className="max-w-96    max-h-96 lg:mr-16 ssm:mb-20 lg:mb-0 lg:mt-5 rounded-lg">
                  {productData.image && productData.image.length > 0 && (
                    <>
                      <Carousel
                        infiniteLoop
                        stopOnHover
                        swipeable={true}
                        showThumbs={false}
                        autoPlay
                        emulateTouch={true}
                        className="bg-[#111827] relative rounded-lg"
                        showArrows={true}
                        slideInterval={5000}
                      >
                        {productData.image.map((image, index) => (
                          <div key={index}>
                            <img
                              className="shadow-inner hover:shadow-xl size-96 rounded-md cursor-pointer"
                              src={image}
                              alt={`Image ${index + 1}`}
                              onClick={() => handleOpenLightbox(index)} // Open lightbox on click
                            />
                            <button
                              className="relative bg-[#0c0a0a54] bottom-20 font-poppins p-1.5 text-white rounded-lg font-bold hover:bg-[#000000c4]"
                              onClick={() => handleOpenLightbox(index)} // Open lightbox on button click
                            >
                              Show Image ( {`${index + 1}`} )
                            </button>
                          </div>
                        ))}
                      </Carousel>

                      {/* Lightbox component */}
                      <Lightbox
                        open={open}
                        close={() => setOpen(false)} // Close lightbox
                        slides={productData.image.map((image) => ({
                          src: image,
                        }))} // Map images for lightbox
                        index={currentImage} // Start from the clicked image
                        plugins={[Zoom]}
                      />
                    </>
                  )}
                </div>
                <Card
                  mt={5}
                  shadow={"xl"}
                  w={{ base: "xs", md: "md", lg: "lg" }}
                >
                  <CardHeader>
                    <Heading size="md">
                      <p className="ssm:w-64 break-words lg:w-96 flex place-items-end gap-1 font-quicksand font-thin">
                        <CiShoppingTag /> {productData.prodName}
                      </p>
                      <p className="font-thin font-quicksand text-base mt-1">
                        {productData && productData.price
                          ? productData.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })
                          : "Loading price..."}
                      </p>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />}>
                      <Box>
                        <Heading size="xs">
                          {productData.accountType === "Student" && (
                            <>
                              {" "}
                              <Link
                                to={`/UserAccount/${productData.sellerEmail}`}
                              >
                                <p className="ssm:w-64 truncate lg:w-96  underline">
                                  {" "}
                                  <LinkIcon className="mr-1" />
                                  {productData.sellerName}
                                </p>
                                <p className="ssm:w-64 truncate lg:w-96 ">
                                  <AtSignIcon className="mr-1" />
                                  {productData.sellerEmail}
                                </p>
                              </Link>
                            </>
                          )}
                          {productData.accountType === "Faculty" && (
                            <>
                              {" "}
                              <Link
                                to={`/FacultyAccount/${productData.sellerEmail}`}
                              >
                                <p className="ssm:w-64 truncate lg:w-96  underline">
                                  {" "}
                                  <LinkIcon className="mr-1" />
                                  {productData.sellerName}
                                </p>
                                <p className="ssm:w-64 truncate lg:w-96">
                                  <AtSignIcon className="mr-1" />
                                  {productData.sellerEmail}
                                </p>
                              </Link>
                            </>
                          )}

                          <div className="mt-3 grid grid-cols-2">
                            <p className="flex  mr-4">
                              <RiAccountCircleLine className="mr-1" />{" "}
                              {productData.accountType}
                            </p>

                            {productData.marketType == "Selling" ? (
                              <>
                                {" "}
                                <p className="flex">
                                  {" "}
                                  <TbSquareLetterS className="mb-1 text-base mr-2" />{" "}
                                  {productData.marketType}
                                </p>
                              </>
                            ) : (
                              <></>
                            )}
                            {productData.marketType == "Trading" ? (
                              <>
                                {" "}
                                <p className="flex">
                                  {" "}
                                  <TbLetterT className="mb-1 text-base mr-2" />{" "}
                                  {productData.marketType}
                                </p>
                              </>
                            ) : (
                              <></>
                            )}

                            <p className="">
                              {" "}
                              <p className=" text-xs opacity-90  ">
                                <CalendarIcon className="mb-1" />{" "}
                                {formatDateToNow(productData.createdAt)}
                                <br />
                                <p className="text-[11px]">
                                  {new Date(
                                    productData.createdAt
                                  ).toLocaleTimeString("en-PH", {
                                    second: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    day: "2-digit",
                                    month: "long",
                                    hour12: true,
                                  })}
                                </p>
                              </p>
                            </p>
                            <p className="flex">
                              <BsBox2 className="mr-3" /> {productData.stocks}
                            </p>
                          </div>
                        </Heading>
                        <Text pt="2" fontSize="sm"></Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Categories
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          <p className="ssm:w-64  lg:w-96">
                            {productData.categories}
                          </p>
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Description
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          <p className="ssm:w-64 lg:w-96">
                            {productData.description}
                          </p>
                        </Text>
                      </Box>
                      <Box>
                        {" "}
                        {isUsers && (
                          <>
                            <div className="flex">
                              <button
                                className="flex w-full bg-gray-900  text-white text-center text-sm  rounded-sm p-2 justify-center hover:bg-gray-950"
                                onClick={() => handleUserModal(productData)}
                              >
                                Add to orders{" "}
                                <CiShoppingCart className="text-xl ml-2" />
                              </button>
                              <MdMessage
                                onClick={drawer}
                                className=" cursor-pointer mx-2  text-4xl flex  bg-gray-900  text-white text-center w-16  rounded-sm p-2 justify-center hover:bg-gray-950"
                              />
                            </div>
                          </>
                        )}
                        <div>
                          {isFaculty && (
                            <>
                              <div className="flex">
                                <button
                                  className="flex w-full bg-gray-900  text-white text-center text-sm  rounded-sm p-2 justify-center hover:bg-gray-950"
                                  onClick={() =>
                                    handleFacultyModal(productData)
                                  }
                                >
                                  Add to orders{" "}
                                  <CiShoppingCart className="text-xl ml-2" />
                                </button>
                                <MdMessage
                                  onClick={drawer}
                                  className=" cursor-pointer mx-2  text-4xl flex  bg-gray-900  text-white text-center w-16  rounded-sm p-2 justify-center hover:bg-gray-950"
                                />
                              </div>
                            </>
                          )}
                          {!isFaculty && !isUsers ? (
                            <>
                              {" "}
                              <div className="bg-gray-900  text-white text-center text-sm  rounded-sm p-2 grid hover:bg-gray-950">
                                <button className="flex w-full justify-center">
                                  Login first
                                </button>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <Drawer
                          isOpen={isOpenDrawer}
                          placement="right"
                          size={"sm"}
                          onClose={onCloseDrawer}
                        >
                          <DrawerOverlay />
                          <DrawerContent
                            rounded={"xl"}
                            m={{ base: "xs", md: "md", lg: "2" }}
                          >
                            <DrawerCloseButton />
                            <DrawerHeader>
                              <div className="flex gap-4 space-y-2">
                                <div>
                                  <p className="text-xs font-quicksand">
                                    Seller {productData.sellerName}
                                  </p>
                                  <p className="text-xs font-thin font-quicksand flex gap-1">
                                    <p>Item: </p>
                                    {productData.prodName}
                                  </p>
                                  <p className="text-xs font-thin font-poppins flex gap-1">
                                    <p>Price: </p>
                                    {productData && productData.price
                                      ? productData.price.toLocaleString(
                                          "en-PH",
                                          {
                                            style: "currency",
                                            currency: "PHP",
                                          }
                                        )
                                      : "Loading price..."}
                                  </p>
                                </div>
                              </div>
                            </DrawerHeader>

                            <DrawerBody>
                              <ChatPage userEmail={productData.sellerEmail} />
                            </DrawerBody>
                            {/* <DrawerFooter>
                              <div>
                                <Input
                                  value={textToCopy}
                                  onChange={(e) =>
                                    setTextToCopy(e.target.value)
                                  }
                                  placeholder="Type or paste text here..."
                                />
                                <CopyToClipboard
                                  text={textToCopy}
                                  onCopy={onCopyText}
                                >
                                  <button>Copy to Clipboard</button>
                                </CopyToClipboard>
                                {copyStatus && <p>Text copied to clipboard!</p>}
                              </div>
                            </DrawerFooter> */}
                          </DrawerContent>
                        </Drawer>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </div>

              {isUsers || isFaculty ? (
                <div className="bg-gray-900 mt-8 text-white  text-sm  rounded-sm p-2 grid ">
                  <form onSubmit={commentHandler} className="flex">
                    <textarea
                      className="text-black w-full rounded-sm px-2  font-quicksand bg-[#e4eaec]"
                      type="text"
                      value={newComment}
                      onChange={(event) => setNewComments(event.target.value)}
                      placeholder="Add a comment"
                    />

                    <button
                      className="flex float-right px-2 border rounded-md p-1 pl-4 pt-2 hover:bg-[#c1cec633] pr-3 h-10"
                      type="submit"
                    >
                      Comment{" "}
                      <RiSendPlane2Fill className="mt-0.5 ml-2 text-base" />
                    </button>
                  </form>
                </div>
              ) : (
                <></>
              )}

              <div className=" rounded-lg text-sm w-full p-1 grid mt-5">
                {productData.comments && productData.comments.length > 0 ? (
                  <div>
                    <p className="ml-5">Comments</p>
                    {productData.comments
                      .map((comment) => (
                        <article
                          key={comment._id}
                          className="grid mx-2 mt-2 mb-4  rounded-md font-poppins"
                        >
                          <div className="flex">
                            {comment.commenterAccountType === "Student" && (
                              <>
                                {" "}
                                <Link
                                  to={`/UserAccount/${comment.commenterEmail}`}
                                >
                                  <span className="flex underline font-extralight pt-1 mb-1 gap-4 mx-2 ">
                                    <Avatar
                                      size={"sm"}
                                      src={comment.commenterImage}
                                    />{" "}
                                    <Text>{comment.commenterName} </Text>
                                  </span>
                                </Link>
                              </>
                            )}
                            {comment.commenterAccountType === "Faculty" && (
                              <>
                                {" "}
                                <Link
                                  to={`/FacultyAccount/${comment.commenterEmail}`}
                                >
                                  <span className="flex underline font-extralight pt-1 mb-1 gap-4 mx-2 ">
                                    <Avatar
                                      size={"sm"}
                                      src={comment.commenterImage}
                                    />{" "}
                                    <Text>{comment.commenterName} </Text>
                                  </span>
                                </Link>
                              </>
                            )}

                            <span className=" text-xs mt-2 flex">
                              <LuDot className="mr-1 text-base" />{" "}
                              {formatDateToNow(comment.createdAt)}
                            </span>
                            {(isUsers?.id === comment.commenterId ||
                              isFaculty?.id === comment.commenterId) && (
                              <Flex justifyContent={"end"} mx={1}>
                                <Popover>
                                  <PopoverTrigger>
                                    <Button size="xs" bg="transparent">
                                      <Box as="span" flex="1" textAlign="right">
                                        <MdDelete className="text-base" />
                                      </Box>

                                      {/* <AccordionIcon /> */}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>
                                      <Text>
                                        Do you want to remove this comment?
                                      </Text>
                                    </PopoverHeader>
                                    <PopoverBody>
                                      <Button
                                        colorScheme="green"
                                        className="justify-self-center mb-1 flex"
                                        onClick={() =>
                                          commentDelete(comment._id)
                                        }
                                      >
                                        Confirm
                                      </Button>
                                    </PopoverBody>
                                  </PopoverContent>
                                </Popover>
                              </Flex>
                            )}
                          </div>

                          <p className="font-quicksand flex mb-2 px-6 ssm:w-72 lg:w-96">
                            <Divider
                              orientation="vertical"
                              height={4}
                              borderColor="purple.500"
                            />{" "}
                            <Divider
                              pt={4}
                              w={8}
                              mr={1}
                              orientation="horizontal"
                              borderColor="purple.500"
                            />
                            <p className="ssm:w-[300px] sm:w-[600px] md:w-[700px] lg:w-[1000px] ">
                              {comment.comment}
                            </p>
                          </p>
                        </article>
                      ))
                      .reverse()}
                  </div>
                ) : (
                  <p className="text-center">No comments available.</p>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </article>
      </figure>
      {UserSelectedProduct && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Item name: {UserSelectedProduct.prodName} <br />
              Price:{" "}
              {UserSelectedProduct.price.toLocaleString("en-PH", {
                style: "currency",
                currency: "PHP",
              })}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={productPurchased} className="grid">
                <div className="hidden">
                  <input
                    name="productId"
                    value={
                      (purchasedSchema.productId = UserSelectedProduct._id)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    name="sellerId"
                    value={
                      (purchasedSchema.sellerId = UserSelectedProduct.sellerId)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    name="status"
                    value={
                      (purchasedSchema.status = UserSelectedProduct.status)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    name="userId"
                    value={(purchasedSchema.userId = isUsers.id)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="prodName"
                    value={
                      (purchasedSchema.prodName = UserSelectedProduct.prodName)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="marketType"
                    value={
                      (purchasedSchema.marketType =
                        UserSelectedProduct.marketType)
                    }
                    onChange={purchasedOnChange}
                  />

                  <input
                    type="text"
                    name="prodName"
                    value={
                      (purchasedSchema.prodName = UserSelectedProduct.prodName)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="buyerName"
                    value={(purchasedSchema.buyerName = isUsers.fullname)}
                    onChange={purchasedOnChange}
                  />

                  <input
                    type="number"
                    name="buyerPhoneNumber"
                    value={
                      (purchasedSchema.buyerPhoneNumber = isUsers.phoneNumber)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="buyerGcashNumber"
                    value={
                      (purchasedSchema.buyerGcashNumber = isUsers.gcashNumber)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="sellerGcashNumber"
                    value={
                      (purchasedSchema.sellerGcashNumber =
                        UserSelectedProduct.sellerGcashNumber)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="sellerPhoneNumber"
                    value={
                      (purchasedSchema.sellerPhoneNumber =
                        UserSelectedProduct.sellerPhoneNumber)
                    }
                    onChange={purchasedOnChange}
                  />

                  <input
                    name="buyerFacebook"
                    className="bg-gray-200"
                    value={(purchasedSchema.buyerFacebook = isUsers.facebook)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    name="sellerFacebook"
                    value={
                      (purchasedSchema.sellerFacebook =
                        UserSelectedProduct.facebook)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="buyerEmail"
                    value={(purchasedSchema.buyerEmail = isUsers.email)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="sellerName"
                    value={
                      (purchasedSchema.sellerName =
                        UserSelectedProduct.sellerName)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="sellerEmail"
                    value={
                      (purchasedSchema.sellerEmail =
                        UserSelectedProduct.sellerEmail)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="accountType"
                    value={
                      (purchasedSchema.accountType =
                        UserSelectedProduct.accountType)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="buyerType"
                    value={(purchasedSchema.buyerType = isUsers.isUser)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="price"
                    value={(purchasedSchema.price = UserSelectedProduct.price)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="total"
                    value={
                      (purchasedSchema.total =
                        UserSelectedProduct.price * quantity)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="image"
                    value={
                      (purchasedSchema.image = UserSelectedProduct.image[0])
                    }
                    onChange={purchasedOnChange}
                    required
                  />
                </div>
                <div className=" space-y-3">
                  <label>Types:</label>
                  <Input
                    placeholder="Ex. Red Item. Blue Item, etc."
                    type="text"
                    name="types"
                    value={purchasedSchema.types}
                    onChange={purchasedOnChange}
                    required
                  />
                  {/* {isUsers.gcashNumber === null ? (
                    <>
                      <label>Input Gcash Number if online payment:</label>
                      <Input
                        placeholder="Gcash Number"
                        type="number"
                        name="buyerGcashNumber"
                        value={
                          (purchasedSchema.buyerGcashNumber =
                            isUsers.gcashNumber)
                        }
                        onChange={purchasedOnChange}
                      />
                    </>
                  ) : (
                    <></>
                  )} */}

                  <label>Quantity:</label>
                  <NumberInput
                    type="number"
                    min={1}
                    max={productData.stocks}
                    name="quantity"
                    value={(purchasedSchema.quantity = quantity)}
                    onChange={purchasedOnChange}
                    required
                  >
                    <NumberInputField required onChange={quantityHandler} />
                    <NumberInputStepper>
                      <NumberIncrementStepper onClick={incrementQnty} />
                      <NumberDecrementStepper onClick={decrementQnty} />
                    </NumberInputStepper>
                  </NumberInput>
                  <label>Message:</label>
                  <Textarea
                    placeholder="Input a message about the item."
                    type="text"
                    name="message"
                    value={purchasedSchema.message}
                    onChange={purchasedOnChange}
                    required
                  />
                  <p>
                    Total ₱
                    {
                      (purchasedSchema.total =
                        UserSelectedProduct.price * quantity)
                    }
                  </p>
                </div>
                <div className="bg-gray-900  text-white text-center text-sm  rounded-sm p-2 grid hover:bg-gray-950">
                  <button type="submit" className="flex w-full justify-center">
                    Add to orders <CiShoppingCart className="text-xl ml-2" />
                  </button>
                </div>
              </form>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {FacultySelectedProduct && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Item name: {FacultySelectedProduct.prodName} <br />
              Price:{" "}
              {FacultySelectedProduct.price.toLocaleString("en-PH", {
                style: "currency",
                currency: "PHP",
              })}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={productPurchased} className="grid">
                <div className="hidden">
                  <input
                    name="productId"
                    value={
                      (purchasedSchema.productId = FacultySelectedProduct._id)
                    }
                    onChange={purchasedOnChange}
                  />

                  <input
                    name="sellerId"
                    value={
                      (purchasedSchema.sellerId =
                        FacultySelectedProduct.sellerId)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    name="status"
                    value={
                      (purchasedSchema.status = FacultySelectedProduct.status)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="buyerType"
                    value={(purchasedSchema.buyerType = isFaculty.isFaculty)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="buyerPhoneNumber"
                    value={
                      (purchasedSchema.buyerPhoneNumber = isFaculty.phoneNumber)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="buyerGcashNumber"
                    value={
                      (purchasedSchema.buyerGcashNumber = isFaculty.gcashNumber)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="sellerGcashNumber"
                    value={
                      (purchasedSchema.sellerGcashNumber =
                        FacultySelectedProduct.sellerGcashNumber)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="sellerPhoneNumber"
                    value={
                      (purchasedSchema.sellerPhoneNumber =
                        FacultySelectedProduct.sellerPhoneNumber)
                    }
                    onChange={purchasedOnChange}
                  />

                  <input
                    name="userId"
                    value={(purchasedSchema.userId = isFaculty.id)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="prodName"
                    value={
                      (purchasedSchema.prodName =
                        FacultySelectedProduct.prodName)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="prodName"
                    value={
                      (purchasedSchema.prodName =
                        FacultySelectedProduct.prodName)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="buyerName"
                    value={(purchasedSchema.buyerName = isFaculty.fullname)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    name="buyerFacebook"
                    className="bg-gray-200"
                    value={(purchasedSchema.buyerFacebook = isFaculty.facebook)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    name="sellerFacebook"
                    className="bg-gray-200"
                    value={
                      (purchasedSchema.sellerFacebook =
                        FacultySelectedProduct.facebook)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="buyerEmail"
                    value={(purchasedSchema.buyerEmail = isFaculty.email)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="sellerName"
                    value={
                      (purchasedSchema.sellerName =
                        FacultySelectedProduct.sellerName)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="sellerEmail"
                    value={
                      (purchasedSchema.sellerEmail =
                        FacultySelectedProduct.sellerEmail)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="accountType"
                    value={
                      (purchasedSchema.accountType =
                        FacultySelectedProduct.accountType)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="price"
                    value={
                      (purchasedSchema.price = FacultySelectedProduct.price)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="number"
                    name="total"
                    value={
                      (purchasedSchema.total =
                        FacultySelectedProduct.price * quantity)
                    }
                    onChange={purchasedOnChange}
                  />
                  <input
                    type="text"
                    name="image"
                    value={
                      (purchasedSchema.image = FacultySelectedProduct.image[0])
                    }
                    onChange={purchasedOnChange}
                    required
                  />
                </div>
                <div className=" space-y-3">
                  <label>Types:</label>
                  <Input
                    placeholder="Ex. Red Item. Blue Item, etc."
                    type="text"
                    name="types"
                    value={purchasedSchema.types}
                    onChange={purchasedOnChange}
                    required
                  />

                  <label>Quantity:</label>
                  <NumberInput
                    type="number"
                    min={1}
                    max={productData.stocks}
                    name="quantity"
                    value={(purchasedSchema.quantity = quantity)}
                    onChange={purchasedOnChange}
                    required
                  >
                    <NumberInputField required onChange={quantityHandler} />
                    <NumberInputStepper>
                      <NumberIncrementStepper onClick={incrementQnty} />
                      <NumberDecrementStepper onClick={decrementQnty} />
                    </NumberInputStepper>
                  </NumberInput>
                  <label>Message:</label>
                  <Textarea
                    placeholder="Input a message about the item."
                    type="text"
                    name="message"
                    value={purchasedSchema.message}
                    onChange={purchasedOnChange}
                    required
                  />
                  <p>
                    Total ₱
                    {
                      (purchasedSchema.total =
                        FacultySelectedProduct.price * quantity)
                    }
                  </p>
                </div>
                <div className="bg-gray-900  text-white text-center text-sm  rounded-sm p-2 grid hover:bg-gray-950">
                  <button type="submit" className="flex w-full justify-center">
                    Add to orders <CiShoppingCart className="text-xl ml-2" />
                  </button>
                </div>
              </form>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Divider mt={4} mb={4} />

      <Products />
    </div>
  );
}

export default ProductId;
