/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Select from "react-select";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
function AddProducts() {
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [facultysData, setFacultyData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    sellerId: "",
    sellerName: "",
    stocks: "",
    sellerEmail: "",
    prodName: "",
    description: "",
    price: "",
    categories: [],
    accountType: "",
    facebook: "",
    marketType: "",
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
    formData.append("stocks", products.stocks);
    formData.append("sellerEmail", products.sellerEmail);
    formData.append("prodName", products.prodName);
    formData.append("description", products.description);
    formData.append("price", products.price);
    formData.append("categories", products.categories);
    formData.append("accountType", products.accountType);
    formData.append("facebook", products.facebook);
    formData.append("marketType", products.marketType);
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
        stocks: "",
        sellerEmail: "",
        prodName: "",
        description: "",
        price: "",
        categories: [],
        accountType: "",
        facebook: "",
        marketType: "",
      });
      setProductImage([]);
      navigate("/");
    } catch (error) {
      console.log("Error uploading images", error);
    }
    navigate("/");
  };

  const categoriesOption = [
    { value: "Fashion", label: "Fashion" },
    { value: "Furnitures", label: "Furnitures" },
    { value: "Health & Beauty", label: "Health & Beauty" },
    { value: "Books & Media", label: "Books & Media" },
    { value: "Art & Collectibles", label: "Art & Collectibles" },
    {
      value: "Mobiles CellPhone & Gadgets",
      label: "Mobiles CellPhone & Gadgets",
    },
    { value: "Laptops & Computers", label: "Laptops & Computers" },
    { value: "Camera & Photo", label: "Camera & Photo" },
    { value: "Electronic Parts", label: "Electronic Parts" },
    { value: "Crafts & DIY", label: "Crafts & DIY" },
    { value: "Pet Supplies", label: "Pet Supplies" },
    { value: "Jewelry & Accessories", label: "Jewelry & Accessories" },
    { value: "Clothings", label: "Clothings" },
    { value: "Men's Apparel", label: "Men's Apparel" },
    { value: "Men's Shoes", label: "Men's Shoes" },
    { value: "Women's Apparel", label: "Women's Apparel" },
    { value: "Women's Shoes", label: "Women's Shoes" },
    { value: "School Uniforms", label: "School Uniforms" },
    { value: "Lanyards", label: "Lanyards" },
    { value: "School Supplies", label: "School Supplies" },
    { value: "Foods", label: "Foods" },
    { value: "Second Hand Items", label: "Second Hand Items" },
    { value: "Valuable Items", label: "Valuable Items" },
    { value: "Mens Shoes", label: "Men's Shoes" },
    { value: "Womens Shoes", label: "Women's Shoes" },
    { value: "Other Items", label: "Other Items" },
  ];

  const categoriesOnChange = (select) => {
    const categoriesVar = select.map((option) => option.value);
    setProducts({ ...products, categories: categoriesVar });
  };
  return (
    <div className="rounded-md  pb-4 max-w-full max-h-full justify-items-center grid ">
      <figure className="max-w-full w-full ">
        <article className="border bg-[#807ee631] px-9 pt-5 mt-2 rounded-lg pb-5 lg:mx-9">
          <form onSubmit={productSubmit}>
            <p className=" text-lg font-bebas">Add a new Product</p>
            <article className="">
              <div>
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
                  value={(products.facebook = isUsers.facebook)}
                  name="facebook"
                  onChange={productHandler}
                  hidden
                />
              </div>

              <div className="grid mb-3 ">
                <label className="mb-1 mt-3 font-montserrat text-sm">
                  Product Name:{" "}
                </label>
                <Input
                  bg={"slate"}
                  border="1px"
                  borderColor="slate"
                  className=" border-slate-400 border-t border-e border-x border-y px-3 rounded-md p-2 text-black bg-[#eceeee]"
                  type="text"
                  value={products.prodName}
                  name="prodName"
                  placeholder="Product Name"
                  onChange={productHandler}
                  required
                />
              </div>

              <div className="grid grid-cols-2 items-start">
                <label className="mb-3 mt-3 font-montserrat text-sm grid">
                  Stocks:{" "}
                  <Input
                    bg={"slate"}
                    border="1px"
                    borderColor="slate"
                    className=" border-slate-400 border-t border-e border-x border-y px-3 rounded-md p-2  text-black bg-[#eceeee] mr-2"
                    type="number"
                    value={products.stocks}
                    name="stocks"
                    placeholder="stocks"
                    onChange={productHandler}
                    required
                  />
                </label>
                <label className="mb-3 ml-3  mt-3 font-montserrat text-sm grid">
                  <p className="px-2">Price: </p>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.900"
                      fontSize="1.2em"
                    >
                      ₱
                    </InputLeftElement>

                    <Input
                      bg={"slate"}
                      border="1px"
                      borderColor="slate"
                      ml={2}
                      className=" border-slate-400 border-t border-e border-x border-y px-3 rounded-md p-2 text-black bg-[#eceeee] "
                      type="number"
                      value={products.price}
                      name="price"
                      placeholder="Price"
                      onChange={productHandler}
                      required
                    />

                    <InputRightElement></InputRightElement>
                  </InputGroup>
                </label>
                <label className="mb-3  mt-3 font-montserrat text-sm grid">
                  Categories:{" "}
                  <Select
                    isMulti={true}
                    options={categoriesOption}
                    type="text"
                    name="categories"
                    className=" border-slate-400 border-t border-e border-x border-y  rounded-md text-black bg-[#eceeee] "
                    value={categoriesOption.filter((option) =>
                      products.categories.includes(option.value)
                    )}
                    placeholder="Categories"
                    onChange={categoriesOnChange}
                    required
                  />
                </label>
                <label className="mb-3 ml-3 mr-2 mt-3 font-montserrat text-sm grid">
                  <p className="px-2">Item Image: Up 5 files. </p>
                  <Input
                    pl={0}
                    p="6px"
                    mx={2}
                    bg={"slate"}
                    border="1px"
                    borderColor="slate"
                    type="file"
                    className=" border-slate-400 border-t border-e border-x border-y  rounded-md text-black bg-[#e1e4e4]"
                    value={productImage.image}
                    accept="image/"
                    name="image"
                    placeholder="image"
                    multiple
                    required
                    onChange={productHandlerFile}
                  />
                </label>
                <div className="grid mb-3 ">
                  <label className="mb-1  font-montserrat text-sm">
                    Select Option Market Type of:{" "}
                  </label>
                  <select
                    className="w-56 border-slate-400 border-t border-e border-x border-y px-3 rounded-md p-2 text-black bg-[#eceeee]"
                    name="marketType"
                    value={products.marketType}
                    onChange={productHandler}
                    required
                  >
                    <option value="Trading">Trading</option>
                    <option value="Selling">Selling</option>
                  </select>
                </div>
              </div>

              <label className="mb-3 mt-3 font-montserrat text-sm grid">
                Description:{" "}
                <Textarea
                  bg={"slate"}
                  border="1px"
                  borderColor="slate"
                  className=" border-slate-400 border-t border-e border-x border-y px-3 rounded-md p-2 text-black bg-[#eceeee] "
                  type="text"
                  value={products.description}
                  name="description"
                  required
                  placeholder="Add Description"
                  onChange={productHandler}
                />{" "}
              </label>
              <center>
                {" "}
                <button
                  type="submit"
                  className="bg-gray-800 p-2 px-4 rounded-lg text-white font-quicksand font-semibold flex items-center hover:bg-gray-600"
                >
                  Add Item <AddIcon className="ml-2 text-xs" />
                </button>
              </center>
            </article>
          </form>
        </article>
      </figure>
    </div>
  );
}

export default AddProducts;
