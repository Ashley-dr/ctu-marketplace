/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { formatDateToNow } from "../pages/ProductId";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Image,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Img,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import { LuDot } from "react-icons/lu";
import { CiBacon, CiShoppingCart } from "react-icons/ci";
import { CgNametag } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { formatDate, formatDistanceToNow } from "date-fns";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MdOutlineModeComment } from "react-icons/md";
import ProductId from "../pages/ProductId";
import { FiDelete } from "react-icons/fi";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IoChevronBack } from "react-icons/io5";
import logo from "../assets/ctu-logo.jpg";
function Inventory({ userId }) {
  const [cookies, removeCookies] = useCookies([]);
  const [myProducts, setMyProducts] = useState([]);
  const [viewModal, setViewModal] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComments] = useState("");
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [stocks, setStocks] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const commentHandler = (e) => {
    e.preventDefault();

    let commenterName = "";
    if (isUsers) {
      commenterName = isUsers.fullname;
    } else if (isFaculty) {
      commenterName = isFaculty.fullname;
    }
    axios
      .post(`http://localhost:4000/api/comments/${viewModal._id}`, {
        comment: newComment,
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
      .delete(
        `http://localhost:4000/api/comments/${viewModal._id}/${commentId}`
      )
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
          `http://localhost:4000/api/comments/${selectedProductId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    if (selectedProductId) {
      // Fetch immediately and then start polling
      fetchComments();
      intervalId = setInterval(fetchComments, 1000); // Fetch every 1 second
    }

    // Cleanup on unmount or when selectedProductId changes
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [selectedProductId]);

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
    try {
      if (userId) {
        const interval = setInterval(() => {
          axios
            .get(`http://localhost:4000/api/inventory/${userId}`)
            .then((result) => {
              setMyProducts(result.data);
              setLoading(false);
              setError(null);
            })
            .catch((err) => {
              console.log("Error fetching your products", err);
            });
        }, 1000); // 1000 milliseconds = 1 second

        // Clear interval on component unmount
        return () => clearInterval(interval);
      }
    } catch (error) {
      setError("Error fetching products data");
      console.error("Error fetching products data:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/inventory/${viewModal._id}`
      );

      onClose();
    } catch (error) {
      console.error("Error deleting product:", error);
      // Optionally, display an error message to the user
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/inventory/${viewModal._id}`,
        { stocks, price },
        { headers: { "Content-Type": "application/json" } }
      );

      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      // Optionally, display an error message to the user
    }
  };

  const handleModal = (item) => {
    setViewModal(item);
    setSelectedProductId(item._id);
    onOpen();
  };
  return (
    <div className="max-w-full max-h-full ">
      <div>
        <ul className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {loading && myProducts.length === 0 ? (
            <div className="flex text-center justify-center mb-10 relative md:left-28 lg:left-52 mt-10">
              <div className="animate-pulse rounded-full  bg-gray-900  border-gray-900">
                <Img src={logo} className="rounded-full " />
              </div>
            </div>
          ) : (
            <>
              {myProducts.length === 0 ? (
                <main className="w-64 ">
                  <p className="text-center">No item</p>
                </main>
              ) : (
                myProducts.map((item) => (
                  <Card
                    maxW="xs"
                    rounded={"lg"}
                    mx={3}
                    mt={5}
                    shadow={"2xl"}
                    mb={5}
                    className="grid ssm:w-96 lg:w-64"
                    key={item._id}
                  >
                    <CardHeader>
                      <Flex spacing="4" className="text-xs" isTruncated>
                        <Flex
                          flex="1"
                          gap="2"
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <Avatar src={userId.image} size={"sm"} />

                          <Box>
                            <Text className="">{item.accountType}</Text>
                            <Heading size="xss" isTruncated>
                              {item.sellerName}
                            </Heading>
                            <Text>{item.sellerEmail}</Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </CardHeader>
                    <Text ml={5} className="font-bold  relative bottom-3">
                      {item.prodName}
                    </Text>
                    <Text ml={5} className="  relative bottom-3">
                      Stocks: {item.stocks}
                    </Text>
                    <Text
                      ml={5}
                      className="font-semibold text-xs relative bottom-3"
                    >
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(viewModal.price)}
                    </Text>
                    <Text
                      ml={5}
                      className="font-semibold text-xs relative bottom-3"
                    >
                      {item.marketType === "Selling" && "Trading" ? (
                        <p className="text-green-200">{item.marketType}</p>
                      ) : (
                        <p className="text-orange-200">{item.marketType}</p>
                      )}
                    </Text>

                    <CardBody pt={1}>
                      <Text
                        overflowY={"scroll"}
                        className="h-12 mb-4 shadow-inner  w-full px-1"
                      >
                        {item.description}
                      </Text>
                    </CardBody>

                    {item.image && item.image.length > 0 && (
                      <div className="">
                        {item.image.slice(0, 1).map((image, index) => (
                          <a
                            key={index}
                            target="_blank"
                            href={image}
                            rel="noreferrer"
                          >
                            <Image
                              objectFit="cover"
                              className="w-full h-64"
                              src={image}
                              alt={`Image ${index + 1}`}
                            />
                          </a>
                        ))}
                      </div>
                    )}
                    <div className="bg-gray-900  text-white text-center text-sm  rounded-sm p-2 grid hover:bg-gray-950">
                      <button
                        className="flex w-full justify-center"
                        onClick={() => handleModal(item)}
                      >
                        View <CiShoppingCart className="text-lg mt-0.5 mx-2" />
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </>
          )}
        </ul>
      </div>
      {viewModal && (
        <Modal
          blockScrollOnMount={false}
          size={"lg"}
          isOpen={isOpen}
          onClose={() => {
            setIsEditing(false);
            onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Flex spacing="4" className="text-xs" isTruncated>
                <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
                  <Avatar src={userId.image} size={"sm"} />
                  <Box>
                    <Text className="font-thin">
                      {viewModal.accountType} Member
                    </Text>
                    <Heading size="xss" isTruncated>
                      {viewModal.sellerName}
                    </Heading>
                    <Text className="font-thin">{viewModal.sellerEmail}</Text>
                  </Box>
                </Flex>
              </Flex>
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody className="space-y-1">
              {isEditing ? (
                <form onSubmit={handleEditSubmit}>
                  <Box mb={4}>
                    <Text fontWeight="bold" mb={2}>
                      Product Name:
                    </Text>
                    <Input type="text" value={viewModal.prodName} disabled />
                  </Box>
                  <Box mb={4}>
                    <Text fontWeight="bold" mb={2}>
                      Stocks:
                    </Text>
                    {/* <NumberInputField
                      type="number"
                      value={stocks}
                      onChange={(e) => setStocks(e.target.value)}
                      required
                    /> */}
                    <NumberInput
                      defaultValue={viewModal.stocks}
                      onChange={(value) => setStocks(value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  <Box mb={4}>
                    <Text fontWeight="bold" mb={2}>
                      Price:
                    </Text>
                    {/* <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    /> */}
                    <NumberInput
                      defaultValue={viewModal.price}
                      onChange={(value) => setPrice(value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  {/* Add other editable fields as necessary */}
                  <Box className="text-center">
                    <Button type="submit" mr={3}>
                      Update
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="ghost"
                      colorScheme="red"
                    >
                      <IoChevronBack />
                    </Button>
                  </Box>
                </form>
              ) : (
                <>
                  {" "}
                  <Accordion allowToggle className="justify-self-end">
                    <AccordionItem>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Text ml={2} className="font-bold grid">
                            <label className="font-thin text-xs">
                              <Text className="text-xs font-thin">
                                {formatDateToNow(viewModal.createdAt)}
                              </Text>
                            </label>
                            {viewModal.prodName}
                          </Text>
                        </Box>

                        <DeleteIcon />
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel
                        pb={4}
                        className="grid grid-cols-2 w-full"
                      >
                        <p className="text-sm justify-center">
                          {" "}
                          Do you want to remove this item?
                        </p>
                        <Button
                          className="justify-self-end"
                          onClick={() => deleteProduct(viewModal._id)}
                        >
                          Confirm
                        </Button>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <figure className="grid grid-cols-2 pt-2 font-quicksand pb-2">
                    <Text ml={2} className="font-semibold ">
                      <label className="text-sm font-thin">Stocks:</label>{" "}
                      {viewModal.stocks}
                    </Text>

                    <button
                      className="justify-self-end"
                      onClick={() => setIsEditing(true)}
                    >
                      <EditIcon />
                    </button>
                    <Text ml={2} className="font-semibold text-xs ">
                      {new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(viewModal.price)}
                    </Text>
                  </figure>
                  <hr />
                  <br />
                  <Text
                    ml={2}
                    className="font-semibold text-xs relative bottom-3"
                  >
                    {viewModal.marketType === "Selling" && "Trading" ? (
                      <p className="text-green-200">{viewModal.marketType}</p>
                    ) : (
                      <p className="text-orange-200">{viewModal.marketType}</p>
                    )}
                  </Text>
                  <Text
                    ml={2}
                    className="font-semibold text-xs relative bottom-3"
                  >
                    {viewModal.categories.join(", ")}
                  </Text>
                  <Text
                    overflowY={"scroll"}
                    className="h-20 mb-4 shadow-inner   w-full px-1"
                  >
                    {viewModal.description}
                  </Text>
                  {viewModal.image && viewModal.image.length > 0 && (
                    <Carousel
                      infiniteLoop
                      showThumbs={false}
                      stopOnHover
                      swipeable={true}
                      autoPlay
                      emulateTouch={true}
                      className="pt-5 relative rounded-lg"
                      showArrows={true}
                      slideInterval={5000}
                    >
                      {viewModal.image.map((image, index) => (
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
                  {/* Comment Section */}
                  {isUsers || isFaculty ? (
                    <div className="    text-sm  rounded-sm p-2 grid ">
                      <form onSubmit={commentHandler} className="flex">
                        <textarea
                          className=" w-full text-black rounded-sm px-2  font-quicksand bg-[#e4eaec]"
                          type="text"
                          value={newComment}
                          onChange={(event) =>
                            setNewComments(event.target.value)
                          }
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
                  ) : null}
                </>
              )}
            </ModalBody>

            <ModalFooter>
              {/* Comments Section */}
              <div className="bg-[#27262615] rounded-lg text-sm w-full p-1 grid">
                {comments && comments.length > 0 ? (
                  <div>
                    <p className="ml-5">Comments</p>
                    {comments
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
                          <button
                            className="justify-self-start mb-1"
                            onClick={() => commentDelete(comment._id)}
                          >
                            <MdDelete className="text-base" />
                          </button>
                        </article>
                      ))
                      .reverse()}
                  </div>
                ) : (
                  <p className="text-center">No comments available.</p>
                )}
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default Inventory;
