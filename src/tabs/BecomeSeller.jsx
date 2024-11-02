/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoRemoveOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import {
  Button,
  Checkbox,
  Input,
  Select,
  Stack,
  Textarea,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from "@chakra-ui/react";
import { AiOutlineUpload } from "react-icons/ai";
function BecomeSeller(props) {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [cookies, removeCookies] = useCookies([]);
  const [isUsers, setisUser] = useState("");
  const [isFaculty, setisFaculty] = useState("");
  const [users, setUsers] = useState({
    email: "",
    username: "",
    fullname: "",
    gender: "",
    department: "",
    facebook: "",
    course: "",
    phoneNumber: "",
    shopDescription: "",
    gcashNumber: "",
    isSeller: false,
    address: "",
  });
  const [usersFileImage, setUsersFileImage] = useState({
    image: null,
    validId: null,
    shopImage: null,
  });
  const [facultyFileImage, setFacultyFileImage] = useState({
    image: null,
    validId: null,
    shopImage: null,
  });
  const [userFileData, setUserFileData] = useState();
  const [faculty, setFaculty] = useState({
    email: "",
    username: "",
    fullname: "",
    image: "",
    gender: "",
    facebook: "",
    phoneNumber: "",
    validId: "",
    shopImage: "",
    shopDescription: "",
    gcashNumber: "",
    isSeller: false,
    address: "",
  });
  const [facultyFileData, setFacultyFileData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/");
      }
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
      if (!cookies.token) {
        navigate("/");
      }
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
    axios
      .get(`${baseUrl}/api/users/${id}`)
      .then((result) => {
        setUsers({
          email: result.data.email,
          username: result.data.username,
          fullname: result.data.fullname,
          image: result.data.image,
          gender: result.data.gender,
          department: result.data.department,
          facebook: result.data.facebook,
          course: result.data.course,
          phoneNumber: result.data.phoneNumber,
          validId: result.data.validId,
          shopImage: result.data.shopImage,
          shopDescription: result.data.shopDescription,
          gcashNumber: result.data.gcashNumber,
          isSeller: result.data.isSeller,
          address: result.data.address,
        });
        // setUsers(result.data);
      })
      .catch((err) => {
        console.log("Error to fetch information.", err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/faculty/${id}`)
      .then((result) => {
        setFaculty({
          email: result.data.email,
          username: result.data.username,
          fullname: result.data.fullname,
          image: result.data.image,
          gender: result.data.gender,
          facebook: result.data.facebook,
          phoneNumber: result.data.phoneNumber,
          validId: result.data.validId,
          shopImage: result.data.shopImage,
          shopDescription: result.data.shopDescription,
          gcashNumber: result.data.gcashNumber,
          isSeller: result.data.isSeller,
          address: result.data.address,
        });
        // setUsers(result.data);
      })
      .catch((err) => {
        console.log("Error to fetch information.", err);
      });
  }, [id]);

  const userOnChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };
  const userOnChangeFileImage = (e) => {
    const { name, files } = e.target;
    setUsersFileImage({ ...usersFileImage, [name]: files[0] });
  };
  const facultyOnChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };
  const FacultyOnChangeFileImage = (e) => {
    const { name, files } = e.target;
    setFacultyFileImage({ ...facultyFileImage, [name]: files[0] });
  };

  const usersOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", users.email);
    formData.append("username", users.username);
    formData.append("fullname", users.fullname);
    formData.append("image", usersFileImage.image); // Append the file directly
    formData.append("gender", users.gender);
    formData.append("department", users.department);
    formData.append("facebook", users.facebook);
    formData.append("course", users.course);
    formData.append("phoneNumber", users.phoneNumber);
    formData.append("validId", usersFileImage.validId); // Append the file directly
    formData.append("shopImage", usersFileImage.shopImage); // Append the file directly
    formData.append("shopDescription", users.shopDescription);
    formData.append("gcashNumber", users.gcashNumber);
    formData.append("isSeller", users.isSeller);
    formData.append("address", users.address);

    axios
      .put(`${baseUrl}/api/users/${isUsers.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        // navigate("/");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  const facultyOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", faculty.email);
    formData.append("username", faculty.username);
    formData.append("fullname", faculty.fullname);
    formData.append("image", facultyFileImage.image);
    formData.append("gender", faculty.gender);
    formData.append("facebook", faculty.facebook);
    formData.append("phoneNumber", faculty.phoneNumber);
    formData.append("validId", facultyFileImage.validId);
    formData.append("shopImage", facultyFileImage.shopImage);
    formData.append("shopDescription", faculty.shopDescription);
    formData.append("gcashNumber", faculty.gcashNumber);
    formData.append("isSeller", faculty.isSeller);
    formData.append("address", faculty.address);
    axios
      .put(`${baseUrl}/api/faculty/${isFaculty.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Error");
      });
  };
  const steps = [
    { title: "First", description: "General Details" },
    { title: "Second", description: "Wait for approval" },
  ];
  return (
    <div>
      {isUsers ? (
        <figure className="max-w-full max-h-full bg-gradient-to-tr from-[#00ffdd2d] via-[#0834f515] to-[#08ceff1a] text-center">
          <article className="grid justify-items-center ">
            <h1 className="pt-5 font-bebas text-3xl ">
              Let's get you Started!
            </h1>
            <h1 className="mb-5 font-bebos ssm:text-sm lg:text-md">
              Become a seller, must input the following details.
            </h1>

            <Stepper>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <form onSubmit={usersOnSubmit} className="">
              <br />

              <figure className="grid ssm:grid-cols-1 lg:grid-cols-2 justify-items-center">
                <article className="grid font-quicksand ">
                  <article className="grid font-quicksand justify-items-start mb-4 ">
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Email:</p>
                      <input
                        className=" bg-transparent"
                        type="text"
                        name="email"
                        placeholder={isUsers.email}
                        value={users.email}
                        onChange={userOnChange}
                        disabled
                      />
                    </label>
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Username:</p>
                      <input
                        className="bg-transparent"
                        type="text"
                        name="username"
                        placeholder={isUsers.username}
                        value={users.username}
                        onChange={userOnChange}
                        disabled
                      />
                    </label>
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Fullname:</p>
                      <input
                        className="bg-transparent w-72"
                        type="text"
                        name="fullname"
                        placeholder={isUsers.fullname}
                        value={users.fullname}
                        onChange={userOnChange}
                        disabled
                      />
                    </label>
                  </article>
                  <figure className="w-80 ">
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Gender</p>
                      <Select
                        type="text"
                        name="gender"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        value={users.gender}
                        onChange={userOnChange}
                        required
                      >
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Select>
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Department</p>
                      <Select
                        type="text"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        name="department"
                        value={users.department}
                        onChange={userOnChange}
                        required
                      >
                        <option value=""></option>
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
                      <p className="justify-self-start text-xs">
                        What department are you in CTU Danao campus
                      </p>
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Facebook</p>
                      <Input
                        type="text"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        name="facebook"
                        placeholder="Input facebook Link"
                        value={users.facebook}
                        onChange={userOnChange}
                      />
                      <p className="justify-self-start text-xs">
                        Ex. (https://www.facebook.com/ashleydiligwapo/)
                      </p>
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Address</p>
                      <Input
                        type="text"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        name="address"
                        placeholder="Input address"
                        value={users.address}
                        onChange={userOnChange}
                      />
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">
                        Major & Course
                      </p>
                      <Input
                        type="text"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        name="course"
                        placeholder="Input Major and Course"
                        value={users.course}
                        onChange={userOnChange}
                      />
                      <p className="justify-self-start text-xs">
                        Ex. (BSIT - Programming, etc.)
                      </p>
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Phone number</p>
                      <Input
                        type="number"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        name="phoneNumber"
                        placeholder="Phone #"
                        value={users.phoneNumber}
                        onChange={userOnChange}
                      />
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Gcash Number</p>
                      <Input
                        type="number"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        name="gcashNumber"
                        placeholder="Gcash #"
                        value={users.gcashNumber}
                        onChange={userOnChange}
                      />
                      <p className="justify-self-start text-xs">
                        Please make sure to use verified (GCASH) Number.
                      </p>
                      <p className="justify-self-start text-xs">
                        This is used for online transaction. (Required)
                      </p>
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">
                        Shop Description
                      </p>
                      <Textarea
                        type="text"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        name="shopDescription"
                        placeholder="Shop Description"
                        value={users.shopDescription}
                        onChange={userOnChange}
                      />
                      <p className="justify-self-start text-xs">
                        Input your profile or shop description.
                      </p>
                    </label>
                  </figure>
                  <br />
                </article>

                <article className=" ssm:border-l-0 lg:border-l-2 ssm:pl-0 lg:pl-5 ">
                  {/* Image here */}

                  <div className="flex items-center justify-center w-full">
                    <label className="flex  flex-col items-center justify-center ssm:w-80 lg:w-96 h-64 mb-5 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-[#eaf3fffa] hover:bg-[#c5d0f3fa] ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineUpload className="text-5xl text-gray-900" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 font-quicksand text-lg">
                            Valid Id
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
                        className="text-black bg-transparent ssm:w-60 lg:w-80  relative top-5 mr-16"
                        name="validId"
                        accept="image/*"
                        required
                        onChange={userOnChangeFileImage}
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-center w-full">
                    <label className="flex  flex-col items-center justify-center ssm:w-80 lg:w-96 h-64 mb-5 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-[#eaf3fffa] hover:bg-[#c5d0f3fa] ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineUpload className="text-5xl text-gray-900" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 font-quicksand text-lg">
                            Shop Cover Image (Instrinsic image size: 1920 x 1080
                            px)
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
                        className="text-black bg-transparent ssm:w-60 lg:w-80 relative top-5 mr-16"
                        name="shopImage"
                        accept="image/*"
                        required
                        onChange={userOnChangeFileImage}
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-center w-full">
                    <label className="flex  flex-col items-center justify-center ssm:w-80 lg:w-96 h-64 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-[#eaf3fffa] hover:bg-[#c5d0f3fa] ">
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
                      <input
                        id="dropzone-file"
                        type="file"
                        className="text-black bg-transparent ssm:w-60 lg:w-80  relative top-5 mr-16"
                        name="image"
                        accept="image/*"
                        required
                        onChange={userOnChangeFileImage}
                      />
                    </label>
                  </div>

                  <br />

                  <Checkbox
                    w={{ base: 80, md: 96, lg: 96 }}
                    className="mb-5 p-2 rounded-md bg-[#06ffa008]   grid text-center "
                    type="checkbox"
                    name="isSeller"
                    colorScheme="teal"
                    border={"black"}
                    value={false}
                    onChange={userOnChange}
                    required
                  >
                    {" "}
                    <label className="  ">
                      {" "}
                      <p className="font-poppins text-sm  ssm:w-64 lg:w-80 ">
                        {" "}
                        To confirm this account, please click the checkbox and
                        wait for the review for the confirmation of your account
                        to be a seller.{" "}
                      </p>
                    </label>
                  </Checkbox>

                  <br />
                  <Button
                    className="mb-10 uppercase"
                    w={{ base: 80, md: 96, lg: 96 }}
                    bgColor={"#06ff9f48"}
                    type="submit"
                  >
                    Submit
                  </Button>

                  {/* Image here */}
                </article>
              </figure>
            </form>
          </article>
        </figure>
      ) : (
        <></>
      )}
      {isFaculty ? (
        <figure className="max-w-full max-h-full bg-gradient-to-tr from-[#00ffdd2d] via-[#0834f515] to-[#08ceff1a] text-center">
          <article className="grid justify-items-center ">
            <h1 className="pt-5 font-bebas text-3xl ">
              Let's get you Started!
            </h1>
            <h1 className="mb-5 font-bebos ssm:text-sm lg:text-md">
              Become a seller, must input the following details.
            </h1>
            <Stepper>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <form onSubmit={facultyOnSubmit} className="">
              <br />

              <figure className="grid ssm:grid-cols-1 lg:grid-cols-2 justify-items-center">
                <article className="grid font-quicksand ">
                  <article className="grid font-quicksand justify-items-start mb-4 ">
                    {" "}
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Email:</p>
                      <input
                        className=" bg-transparent"
                        type="text"
                        name="email"
                        placeholder={faculty.email}
                        value={faculty.email}
                        onChange={facultyOnChange}
                        disabled
                      />
                    </label>
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Username:</p>
                      <input
                        className=" bg-transparent"
                        type="text"
                        name="username"
                        placeholder={faculty.username}
                        value={faculty.username}
                        onChange={facultyOnChange}
                        disabled
                      />
                    </label>
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Fullname:</p>
                      <input
                        type="text"
                        className="bg-transparent w-72"
                        name="fullname"
                        placeholder={faculty.fullname}
                        value={faculty.fullname}
                        onChange={facultyOnChange}
                        disabled
                      />
                    </label>
                  </article>
                  <figure className="w-80 ">
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Gender</p>
                      <Select
                        type="text"
                        name="gender"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        value={faculty.gender}
                        onChange={facultyOnChange}
                        required
                      >
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Select>
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Facebook</p>
                      <Input
                        type="text"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        name="facebook"
                        placeholder="Input facebook Link"
                        value={faculty.facebook}
                        onChange={facultyOnChange}
                      />
                      <p className="justify-self-start text-xs">
                        Ex. (https://www.facebook.com/ashleydiligwapo/)
                      </p>
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Address</p>
                      <Input
                        type="text"
                        name="address"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        placeholder="Input address"
                        value={faculty.address}
                        onChange={facultyOnChange}
                      />
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Phone number</p>
                      <Input
                        type="number"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        name="phoneNumber"
                        placeholder="Phone #"
                        value={faculty.phoneNumber}
                        onChange={facultyOnChange}
                      />
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">Gcash Number</p>
                      <Input
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        type="number"
                        name="gcashNumber"
                        placeholder="Gcash #"
                        value={faculty.gcashNumber}
                        onChange={facultyOnChange}
                      />
                      <p className="justify-self-start text-xs">
                        Please make sure to use verified (GCASH) Number.
                      </p>
                      <p className="justify-self-start text-xs">
                        This is used for online transaction. (Required)
                      </p>
                    </label>
                    <br />
                    <label className="grid mb-2">
                      <p className="justify-self-start text-xs">
                        Shop Description
                      </p>
                      <Textarea
                        type="text"
                        borderBottom={"2px"}
                        borderLeft={"1px"}
                        borderRight={"1px"}
                        borderTop={"1px"}
                        name="shopDescription"
                        placeholder="Shop Description"
                        value={faculty.shopDescription}
                        onChange={facultyOnChange}
                      />
                      <p className="justify-self-start text-xs">
                        Input your profile or shop description.
                      </p>
                    </label>
                  </figure>
                  <br />
                </article>
                <article className=" ssm:border-l-0 lg:border-l-2 ssm:pl-0 lg:pl-5 ">
                  {" "}
                  {/* Image here */}
                  <div className="flex items-center justify-center w-full">
                    <label className="flex  flex-col items-center justify-center ssm:w-80 lg:w-96 h-64 mb-5 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-[#eaf3fffa] hover:bg-[#c5d0f3fa] ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineUpload className="text-5xl text-gray-900" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 font-quicksand text-lg">
                            Valid Id
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
                        className="text-black bg-transparent ssm:w-60 lg:w-80  relative top-5 mr-16"
                        name="validId"
                        accept="image/*"
                        required
                        onChange={FacultyOnChangeFileImage}
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex  flex-col items-center justify-center ssm:w-80 lg:w-96 h-64 mb-5 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-[#eaf3fffa] hover:bg-[#c5d0f3fa] ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineUpload className="text-5xl text-gray-900" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 font-quicksand text-lg">
                            Shop Cover Image
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
                        className="text-black bg-transparent ssm:w-60 lg:w-80 relative top-5 mr-16"
                        name="shopImage"
                        accept="image/*"
                        required
                        onChange={FacultyOnChangeFileImage}
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex  flex-col items-center justify-center ssm:w-80 lg:w-96  h-64 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-[#eaf3fffa] hover:bg-[#c5d0f3fa] ">
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
                      <input
                        id="dropzone-file"
                        type="file"
                        className="text-black bg-transparent ssm:w-60 lg:w-80  relative top-5 mr-16"
                        name="image"
                        accept="image/*"
                        required
                        onChange={FacultyOnChangeFileImage}
                      />
                    </label>
                  </div>
                  {/* Image here */}
                  <br />
                  <Checkbox
                    w={{ base: 80, md: 96, lg: 96 }}
                    className="mb-5 p-2 rounded-md bg-[#06ffa008]   grid text-center "
                    type="checkbox"
                    name="isSeller"
                    colorScheme="teal"
                    border={"black"}
                    value={false}
                    onChange={facultyOnChange}
                    required
                  >
                    <label className="  ">
                      {" "}
                      <p className="font-poppins text-sm  ssm:w-64 lg:w-80 ">
                        {" "}
                        To confirm this account, please click the checkbox and
                        wait for the review for the confirmation of your account
                        to be a seller.{" "}
                      </p>
                    </label>
                  </Checkbox>
                  <br />
                  <Button
                    className="mb-10 uppercase"
                    w={{ base: 80, md: 96, lg: 96 }}
                    bgColor={"#06ff9f48"}
                    type="submit"
                  >
                    Submit
                  </Button>
                </article>
              </figure>
            </form>
          </article>
        </figure>
      ) : (
        <></>
      )}
    </div>
  );
}

export default BecomeSeller;
