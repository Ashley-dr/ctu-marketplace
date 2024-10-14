/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
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
} from "@chakra-ui/react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { CgNametag } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { formatDate, formatDistanceToNow } from "date-fns";
import { AtSignIcon, CalendarIcon, LinkIcon } from "@chakra-ui/icons";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoPricetagOutline } from "react-icons/io5";
import { TbLetterT, TbSquareLetterS } from "react-icons/tb";
import { CiShoppingCart } from "react-icons/ci";
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
function ProductId() {
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
  const [quantity, setQuantity] = useState(1);
  const [purchasedSchema, setPurchasedSchema] = useState({
    sellerId: "",
    userId: "",
    productId: "",
    prodName: "",
    message: "",
    sellerEmail: "",
    accountType: "",
    sellerName: "",
    quantity: "",
    price: "",
    buyerName: "",
    buyerEmail: "",
    status: "",
    total: "",
    types: "",
    image: "",
    sellerFacebook: "",
    buyerFacebook: "",
  });
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

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`http://localhost:4000/api/products/${id}`)
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
  }, [id]);

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
      .post("http://localhost:4000/api/purchasedItem", purchasedSchema)
      .then((result) => {
        setPurchasedSchema({
          sellerId: "",
          userId: "",
          productId: "",
          prodName: "",
          message: "",
          sellerEmail: "",
          accountType: "",
          sellerName: "",
          quantity: "",
          price: "",
          buyerName: "",
          buyerEmail: "",
          status: "",
          total: "",
          types: "",
          image: "",
          sellerFacebook: "",
          buyerFacebook: "",
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
    let commenterId = "";
    if (isUsers) {
      commenterName = isUsers.fullname;
      commenterId = isUsers.id;
    } else if (isFaculty) {
      commenterName = isFaculty.fullname;
      commenterId = isFaculty.id;
    }
    axios
      .post(`http://localhost:4000/api/comments/${id}`, {
        comment: newComment,
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
      .delete(`http://localhost:4000/api/comments/${id}/${commentId}`)
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
        const response = await axios.get(
          `http://localhost:4000/api/comments/${id}`
        );
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
  return (
    <div className="rounded-md  pb-4 max-w-full max-h-full justify-items-center grid bg-gradient-to-tr from-[#0e0e2e2d] via-[#0834f523] to-[#087bff1a]">
      <figure className=" justify-items-center grid max-w-full w-full">
        <article>
          {productData ? (
            <div>
              <div className="mt-5   grid  ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center ">
                <div className="max-w-96 max-h-96 lg:mr-16 ssm:mb-20 lg:mb-0 mt-5 rounded-lg">
                  {productData.image && productData.image.length > 0 && (
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
                        <div key={index} className="">
                          <a
                            target="_blank"
                            href={image}
                            rel="noopener noreferrer"
                          >
                            <img
                              className="shadow-inner hover:shadow-xl size-96  rounded-md"
                              src={image}
                              alt={`Image ${index + 1}`}
                            />
                            <button className="relative bg-[#0c0a0a54] bottom-20 font-poppins p-1.5 text-white rounded-lg font-bold hover:bg-[#000000c4]">
                              Show Image ( {`${index + 1}`} )
                            </button>
                          </a>
                        </div>
                      ))}
                    </Carousel>
                  )}
                </div>
                <Card mt={5} shadow={"xl"}>
                  <CardHeader>
                    <Heading size="md">
                      <p className="w-96">{productData.prodName}</p>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs">
                          <p className="truncate  w-96">
                            {" "}
                            <LinkIcon className="mr-1" />
                            {productData.sellerName}
                          </p>
                          <p className="truncate w-96">
                            <AtSignIcon className="" />{" "}
                            {productData.sellerEmail}
                          </p>
                          <div className="mt-3 grid grid-cols-2">
                            <p className="flex  mr-5">
                              {productData && productData.price
                                ? productData.price.toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                  })
                                : "Loading price..."}
                            </p>
                            <p className="flex justify-self-center mr-4">
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

                            <p className="justify-self-center">
                              {" "}
                              <CalendarIcon className="mb-1" />{" "}
                              {formatDateToNow(productData.createdAt)}
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
                          <p className=" w-96">{productData.categories}</p>
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Description
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          <p className="ssm:w-96 lg:w-100">
                            {productData.description}
                          </p>
                        </Text>
                      </Box>
                      <Box>
                        {" "}
                        {isUsers && (
                          <>
                            <div className="bg-gray-900  text-white text-center text-sm  rounded-sm p-2 grid hover:bg-gray-950">
                              <button
                                className="flex w-full justify-center"
                                onClick={() => handleUserModal(productData)}
                              >
                                Add to orders{" "}
                                <CiShoppingCart className="text-xl ml-2" />
                              </button>
                            </div>
                          </>
                        )}
                        <div>
                          {isFaculty && (
                            <>
                              <div className="bg-gray-900  text-white text-center text-sm  rounded-sm p-2 grid hover:bg-gray-950">
                                <button
                                  className="flex w-full justify-center"
                                  onClick={() =>
                                    handleFacultyModal(productData)
                                  }
                                >
                                  Add to orders{" "}
                                  <CiShoppingCart className="text-xl ml-2" />
                                </button>
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

              <div className="bg-[#27262615] rounded-lg text-sm w-full p-1 grid">
                {productData.comments && productData.comments.length > 0 ? (
                  <div>
                    <p className="ml-5">Comments</p>
                    {productData.comments
                      .map((comment) => (
                        <article
                          key={comment._id}
                          className="grid mr-2 mt-2 mb-4 bg-[#554f4f33] rounded-md font-poppins"
                        >
                          <div className="flex">
                            <span className="flex underline font-extralight pt-1 mb-1">
                              <CgNametag className="mt-0.5 mr-1 text-base" />{" "}
                              {comment.commenterName}
                            </span>
                            <span className="ml-2 text-xs mt-1 flex">
                              <LuDot className="mr-1 text-base" />{" "}
                              {formatDateToNow(comment.createdAt)}
                            </span>
                          </div>
                          <p className="font-quicksand mb-2 pl-1 w-96">
                            {comment.comment}
                          </p>
                          {(isUsers?.id === comment.commenterId ||
                            isFaculty?.id === comment.commenterId) && (
                            <Accordion defaultIndex={[1]} allowMultiple>
                              <AccordionItem>
                                <h2>
                                  <AccordionButton>
                                    <Box as="span" flex="1" textAlign="right">
                                      <MdDelete className="text-base" />
                                    </Box>
                                    <AccordionIcon />
                                  </AccordionButton>
                                </h2>
                                <AccordionPanel textAlign={"center"} pb={4}>
                                  <p>Do you want to remove this comment?</p>
                                  <Button
                                    className="justify-self-start mb-1 flex"
                                    onClick={() => commentDelete(comment._id)}
                                  >
                                    Confirm
                                  </Button>
                                </AccordionPanel>
                              </AccordionItem>
                            </Accordion>
                          )}
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
                    name="buyerFacebook"
                    className="bg-gray-200"
                    value={(purchasedSchema.buyerFacebook = isUsers.facebook)}
                    onChange={purchasedOnChange}
                  />
                  <input
                    name="sellerFacebook"
                    className="bg-gray-200"
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
    </div>
  );
}

export default ProductId;
