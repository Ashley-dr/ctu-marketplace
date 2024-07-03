/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

function FacultyAddProducts() {
  const [cookies, removeCookies] = useCookies([]);

  const [isFaculty, setisFaculty] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState([]);
  const [products, setProducts] = useState({
    sellerName: "",
    prodName: "",
    description: "",
    sellerEmail: "",
    price: "",
    sellerId: "",
    categories: "",
    accountType: "",
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
    formData.append("sellerName", products.sellerName);
    formData.append("sellerEmail", products.sellerEmail);
    formData.append("sellerId", products.sellerId);
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
        sellerName: "",
        sellerEmail: "",
        sellerId: "",
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
              value={(products.sellerName = isFaculty.fullname)}
              name="sellerName"
              onChange={productHandler}
              hidden
            />
            <input
              type="text"
              value={(products.sellerEmail = isFaculty.email)}
              name="sellerEmail"
              onChange={productHandler}
              hidden
            />
            <input
              type="text"
              value={(products.sellerId = isFaculty.id)}
              name="sellerId"
              onChange={productHandler}
              hidden
            />
            <input
              type="text"
              value={(products.accountType = isFaculty.isFaculty)}
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

export default FacultyAddProducts;
