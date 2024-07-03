/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
function AddProducts() {
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [facultysData, setFacultyData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    sellerId: "",
    sellerName: "",
    sellerEmail: "",
    prodName: "",
    description: "",
    price: "",
    categories: "",
    accountType: "",
  });
  const [productImage, setProductImage] = useState([]);

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

  const productHandler = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };
  const productHandlerFile = (e) => {
    setProductImage(Array.from(e.target.files));
  };

  console.log(productImage);

  const productSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sellerId", products.sellerId);
    formData.append("sellerName", products.sellerName);
    formData.append("sellerEmail", products.sellerEmail);
    formData.append("prodName", products.prodName);
    formData.append("description", products.description);
    formData.append("price", products.price);
    formData.append("categories", products.categories);
    formData.append("accountType", products.accountType);
    productImage.forEach((image) => {
      formData.append("image", image);
    });
    try {
      const response = await axios.post(
        "http://localhost:4000/api/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Image Uploaded", response.data.image);
      setProducts({
        sellerId: "",
        sellerName: "",
        sellerEmail: "",
        prodName: "",
        description: "",
        price: "",
        categories: "",
        accountType: "",
      });
      setProductImage([]);
    } catch (error) {
      console.log("Error uploading images", error);
    }
    navigate("/");
  };
  return (
    <div>
      <figure>
        <article>
          <form onSubmit={productSubmit}>
            <input
              type="text"
              value={(products.sellerName = isUsers.fullname)}
              name="sellerName"
              onChange={productHandler}
              hidden
            />
            <input
              type="text"
              value={(products.sellerEmail = isUsers.email)}
              name="sellerEmail"
              onChange={productHandler}
              hidden
            />
            <input
              type="text"
              value={(products.sellerId = isUsers.id)}
              name="sellerId"
              onChange={productHandler}
              hidden
            />
            <input
              type="text"
              value={(products.accountType = isUsers.isUser)}
              name="accountType"
              onChange={productHandler}
              hidden
            />
            <input
              type="text"
              value={products.prodName}
              name="prodName"
              placeholder="Product Name"
              onChange={productHandler}
            />
            <input
              type="text"
              value={products.description}
              name="description"
              placeholder="Add Description"
              onChange={productHandler}
            />
            <input
              type="number"
              value={products.price}
              name="price"
              placeholder="Price"
              onChange={productHandler}
            />
            <input
              type="text"
              value={products.categories}
              name="categories"
              placeholder="Categories"
              onChange={productHandler}
            />
            <input
              type="file"
              value={productImage.image}
              accept="image/"
              name="image"
              placeholder="image"
              multiple
              onChange={productHandlerFile}
            />
            <button type="submit">Post</button>
          </form>
        </article>
      </figure>
    </div>
  );
}

export default AddProducts;
