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
} from "@chakra-ui/react";
import { FaFacebookSquare } from "react-icons/fa";
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
    axios
      .get(`http://localhost:4000/api/products/${id}`)
      .then((result) => {
        setProductData(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log("Error to fetch product");
      });
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
        });
        navigate("/");
      })
      .catch((err) => {
        console.log("Error submitting:", err);
      });
  };
  const commentHandler = (e) => {
    e.preventDefault();

    let commenterName = "";
    if (isUsers) {
      commenterName = isUsers.fullname;
    } else if (isFaculty) {
      commenterName = isFaculty.fullname;
    }
    axios
      .post(`http://localhost:4000/api/comments/${id}`, {
        comment: newComment,
        commenterName: commenterName,
      })
      .then((result) => {
        setComments([...comments, result.data]);
        setNewComments("");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error posting comment: ", err);
      });
  };
  const commentDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/commentDelete/${id}`)
      .then((result) => {
        // navigate("/");
      })
      .catch((err) => {
        console.log("Error to delete this comment", err);
      });
  };
  // to do next is to make the schema and input types of this and Aggregate
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
  return (
    <div>
      <figure>
        <article>
          {productData ? (
            <div>
              <div className="md:shrink-0 grid grid-cols-1 ssm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
                {productData.image && productData.image.length > 0 && (
                  <div className="flex ">
                    {productData.image.slice(0, 1).map((image, index) => (
                      <a key={index} target="_blank" href={image}>
                        <img
                          className=" h-96 w-11/12 mx-16 mt-5 rounded-md"
                          key={index}
                          src={image}
                          alt={`Image ${index + 1}`}
                        />
                      </a>
                    ))}
                  </div>
                )}
                <div className="grid mx-2  px-5  justify-start content-center">
                  <p className="flex mb-2">
                    <p className="mx-1">Seller Name: </p>
                    {productData.sellerName}
                  </p>
                  <p className="flex mb-2">
                    <p className="mx-1">Product Name: </p>
                    {productData.prodName}
                  </p>
                  <p className="flex mb-10">
                    <p className="mx-1">Description: </p>
                    {productData.description}
                  </p>
                  <p className="flex mb-2">
                    <p className="mx-1">Price: </p>
                    {productData.price}
                  </p>
                  <p className="flex mb-2">
                    <p className="mx-1">Category:</p>
                    {productData.categories}
                  </p>
                  <p className="flex mb-2">
                    <p className="mx-1">Post Date: </p>
                    {productData.createdAt}
                  </p>

                  <div className="">
                    {isUsers ? (
                      <>
                        <button
                          className="mt-10 bg-teal-500 rounded-md w-40  h-10 "
                          onClick={() => handleUserModal(productData)}
                        >
                          Add to Orders +
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {isFaculty ? (
                    <>
                      <button
                        className="mt-10 bg-teal-500 rounded-md w-40  h-10 "
                        onClick={() => handleFacultyModal(productData)}
                      >
                        Add to Orders +
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className=" max-w-full w-full">
                {productData.image && productData.image.length > 0 && (
                  <div className="flex relative left-16 gap-3 mt-4 mb-6 ">
                    {productData.image.map((image, index) => (
                      <a key={index} target="_blank" href={image}>
                        <img
                          className="rounded-md h-64  w-96 "
                          key={index}
                          src={image}
                          alt={`Image ${index + 1}`}
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {productData.comments && productData.comments.length > 0 && (
                <div className="">
                  {productData.comments.map((comment) => (
                    <p key={comment._id}>
                      <article className="flex bg-slate-400 mx-5 px-4 mb-1">
                        <strong>{comment.commenterName}</strong>
                        <p>{comment.comment}</p>
                      </article>
                      {/* <button
                        onClick={() => {
                          commentDelete(comment._id);
                        }}
                      >
                        Delete
                      </button> */}
                    </p>
                  ))}
                </div>
              )}
              {isUsers && (
                <div className="">
                  <form onSubmit={commentHandler}>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(event) => setNewComments(event.target.value)}
                      placeholder="Add a comment"
                    />
                    {/* <input
                    type="text"
                    name="comment"
                    value={newComment.comment}
                    onChange={commentOnChange}
                  /> */}
                    <button type="submit">Comment</button>
                  </form>
                </div>
              )}
              {isFaculty && (
                <div className="">
                  <form onSubmit={commentHandler}>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(event) => setNewComments(event.target.value)}
                      placeholder="Add a comment"
                    />
                    {/* <input
                    type="text"
                    name="comment"
                    value={newComment.comment}
                    onChange={commentOnChange}
                  /> */}
                    <button type="submit">Comment</button>
                  </form>
                </div>
              )}
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
              Item name: {UserSelectedProduct.prodName} <br />s
              {UserSelectedProduct.sellerEmail}
              Price: {UserSelectedProduct.price}
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
                    max={10}
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
                <button
                  type="submit"
                  className="mr-5 bg-teal-500 mx-2 m-3 p-2 rounded-md"
                >
                  Add to cart +
                </button>
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
              Price: {FacultySelectedProduct.price}
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
                    max={10}
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
                <button
                  type="submit"
                  className="mr-5 bg-teal-500 mx-2 m-3 p-2 rounded-md"
                >
                  Add to cart +
                </button>
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
