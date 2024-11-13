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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { AiOutlineUpload } from "react-icons/ai";
function FacultyAddProducts() {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);

  const [isFaculty, setisFaculty] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState([]);
  const [products, setProducts] = useState({
    // sellerName: "",
    // prodName: "",
    // description: "",
    // stocks: "",
    // sellerEmail: "",
    // price: "",
    // sellerId: "",
    // categories: [],
    // accountType: "",
    // facebook: "",
    // marketType: "",
    // sellerPhoneNumber: "",
    // sellerGcashNumber: "",
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
    sellerPhoneNumber: "",
    sellerGcashNumber: "",
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
  const productHandler = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };
  const productHandlerFile = (e) => {
    setProductImage(Array.from(e.target.files));
  };

  console.log(productImage);

  const productSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    // formData.append("sellerName", products.sellerName);
    // formData.append("sellerEmail", products.sellerEmail);
    // formData.append("stocks", products.stocks);
    // formData.append("sellerId", products.sellerId);
    // formData.append("prodName", products.prodName);
    // formData.append("description", products.description);
    // formData.append("price", products.price);
    // formData.append("categories", products.categories);
    // formData.append("accountType", products.accountType);
    // formData.append("facebook", products.facebook);
    // formData.append("marketType", products.marketType);
    // formData.append("sellerPhoneNumber", products.sellerPhoneNumber);
    // formData.append("sellerGcashNumber", products.sellerGcashNumber);
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
    formData.append("sellerPhoneNumber", products.sellerPhoneNumber);
    formData.append("sellerGcashNumber", products.sellerGcashNumber);
    productImage.forEach((image) => {
      formData.append("image", image);
    });
    try {
      const response = await axios.post(`${baseUrl}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
        sellerPhoneNumber: "",
        sellerGcashNumber: "",
      });
      setProductImage([]);
      navigate("/Account");
    } catch (error) {
      console.log("Error uploading images", error);
    } finally {
      setIsLoading(false);
    }
    navigate("/Account");
  };
  const categoriesOption = [
    { value: "Fashion", label: "Fashion" },
    { value: "Furnitures", label: "Furnitures" },
    { value: "Health & Beauty", label: "Health & Beauty" },
    { value: "Books & Media", label: "Books & Media" },
    { value: "Art & Collectibles", label: "Art & Collectibles" },
    { value: "Mobiles & Gadgets", label: "Mobiles & Gadgets" },
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
    <figure className="max-w-full pt-2 max-h-full bg-gradient-to-tr from-[#00ffdd2d] via-[#0834f515] to-[#08ceff1a] text-center ">
      <figure className="max-w-full w-full ">
        <article className="  px-9 pt-5 mt-2 rounded-lg pb-5 lg:mx-9">
          <article className="grid justify-items-center">
            <h1 className="pt-5 font-bebas text-3xl">Add new product.</h1>

            <figure className="flex justify-center mb-8">
              <ol className="flex ssm:mx-5 ssm:text-xs lg:text-base gap-5">
                <li className="flex font-poppins">
                  <p className="pl-2   pr-2 border-[#077b8a] rounded-full  font-montserrat text-sm border-2 relative bottom-0 mr-2 bg-[#077b8a50] text-[#0b9fb3] font-bold text-center">
                    <p className="ssm:mt-1 lg:mt-0">1</p>
                  </p>{" "}
                  Input product
                </li>
                <p className="border-[#15a380] rounded-lg border-2 transform rotate-90  mr-2 ml-2"></p>
                <li className="flex font-poppins">
                  {" "}
                  <p className="pl-2 pr-2 border-[#077b8a] rounded-full  font-montserrat text-sm border-2 relative bottom-0 mr-2 bg-[#077b8a50] text-[#0b9fb3] font-bold text-center">
                    <p className="ssm:mt-1 lg:mt-0">2</p>
                  </p>{" "}
                  Inventory on Profile
                </li>
              </ol>
            </figure>
            <form className="mb-32 " onSubmit={productSubmit}>
              <figure className="grid ssm:grid-cols-1 lg:grid-cols-2 justify-items-center">
                <article className="grid font-quicksand ssm:w-80 lg:w-96">
                  <div>
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
                      type="number"
                      value={
                        (products.sellerPhoneNumber = isFaculty.phoneNumber)
                      }
                      name="phoneNumber"
                      onChange={productHandler}
                      hidden
                    />
                    <input
                      type="number"
                      value={
                        (products.sellerGcashNumber = isFaculty.gcashNumber)
                      }
                      name="gcashNumber"
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
                      value={(products.facebook = isFaculty.facebook)}
                      name="facebook"
                      onChange={productHandler}
                      hidden
                    />
                  </div>

                  <label className="grid mb-2">
                    <p className="justify-self-start text-xs">Product name</p>
                    <Input
                      border="1px"
                      borderColor="slate"
                      type="text"
                      borderBottom={"2px"}
                      borderLeft={"1px"}
                      borderRight={"1px"}
                      borderTop={"1px"}
                      value={products.prodName}
                      name="prodName"
                      placeholder="Product Name"
                      onChange={productHandler}
                      required
                    />
                  </label>

                  <label className="grid mb-2">
                    <p className="justify-self-start text-xs">Stocks</p>
                    <Input
                      borderBottom={"2px"}
                      borderLeft={"1px"}
                      borderRight={"1px"}
                      borderTop={"1px"}
                      borderColor="slate"
                      type="number"
                      value={products.stocks}
                      name="stocks"
                      placeholder="stocks"
                      onChange={productHandler}
                      required
                    />
                  </label>

                  <label className="grid mb-2">
                    <p className="justify-self-start text-xs">Price</p>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.100"
                        fontSize="1.2em"
                      >
                        ₱
                      </InputLeftElement>

                      <Input
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
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

                  <label className="grid mb-2">
                    <p className="justify-self-start text-xs">Market Type</p>
                    <select
                      className=" border-slate-400 border-t border-e border-x border-y px-3 rounded-md p-2  bg-transparent"
                      name="marketType"
                      value={products.marketType}
                      onChange={productHandler}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Trading" className="text-black">
                        Trading
                      </option>
                      <option value="Selling" className="text-black">
                        Selling
                      </option>
                    </select>
                  </label>

                  <label className="grid mb-2">
                    <p className="justify-self-start text-xs">Description</p>
                    <Textarea
                      borderBottom={"2px"}
                      borderLeft={"1px"}
                      borderRight={"1px"}
                      borderTop={"1px"}
                      type="text"
                      value={products.description}
                      name="description"
                      required
                      placeholder="Add Description"
                      onChange={productHandler}
                    />{" "}
                  </label>
                </article>

                <article className="ssm:border-l-0 lg:border-l-2 ssm:pl-0 lg:pl-5 w-80">
                  <label className="grid mb-2">
                    <p className="justify-self-start text-xs">Categories</p>
                    <Select
                      isMulti={true}
                      bg={"transparent"}
                      options={categoriesOption}
                      type="text"
                      borderBottom={"2px"}
                      borderLeft={"1px"}
                      borderRight={"1px"}
                      borderTop={"1px"}
                      name="categories"
                      className="  border-t border-e border-x border-y  rounded-md text-black  "
                      value={categoriesOption.filter((option) =>
                        products.categories.includes(option.value)
                      )}
                      placeholder="Categories"
                      onChange={categoriesOnChange}
                      required
                    />
                  </label>
                  <label className="flex items-center justify-center justify-self-center ">
                    <label className="flex  flex-col items-center justify-center ssm:w-80 lg:w-72 h-64 mb-5 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-[#eaf3fffa] hover:bg-[#c5d0f3fa] ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineUpload className="text-5xl text-gray-900" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 font-quicksand text-lg">
                            Item image (5 maximum)
                          </span>
                          <br />{" "}
                          <span className="font-semibold">Click to upload</span>{" "}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="text-black bg-transparent  relative top-5 mr-16 w-44"
                        value={productImage.image}
                        accept="image/"
                        name="image"
                        placeholder="image"
                        multiple
                        required
                        onChange={productHandlerFile}
                      />
                    </label>
                  </label>
                  {isLoading ? (
                    <>
                      <p className="bg-gray-800 w-full justify-center p-2 px-4 rounded-lg text-white font-quicksand font-semibold flex items-center  gap-1">
                        Product upload success
                        <Link to={`/Account`} className="underline">
                          View
                        </Link>
                      </p>
                    </>
                  ) : (
                    <center>
                      <button
                        type="submit"
                        className="bg-gray-800 w-full justify-center p-2 px-4 rounded-lg text-white font-quicksand font-semibold flex items-center hover:bg-gray-600"
                      >
                        Add Item <AddIcon className="ml-2 text-xs" />
                      </button>
                    </center>
                  )}
                </article>
              </figure>
            </form>
          </article>
        </article>
      </figure>
    </figure>
  );
}

export default FacultyAddProducts;
