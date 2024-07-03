/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
function BecomeSeller(props) {
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
    image: "",
    validId: "",
    shopImage: "",
    shopDescription: "",
    gcashNumber: "",
    isSeller: false,
    address: "",
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
      .get(`http://localhost:4000/api/users/${id}`)
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
      .get(`http://localhost:4000/api/faculty/${id}`)
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
  const facultyOnChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const usersOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", users.email);
    formData.append("username", users.username);
    formData.append("fullname", users.fullname);
    formData.append("image", users.image); // Append the file directly
    formData.append("gender", users.gender);
    formData.append("department", users.department);
    formData.append("facebook", users.facebook);
    formData.append("course", users.course);
    formData.append("phoneNumber", users.phoneNumber);
    formData.append("validId", users.validId); // Append the file directly
    formData.append("shopImage", users.shopImage); // Append the file directly
    formData.append("shopDescription", users.shopDescription);
    formData.append("gcashNumber", users.gcashNumber);
    formData.append("isSeller", users.isSeller);
    formData.append("address", users.address);

    axios
      .put(`http://localhost:4000/api/users/${isUsers.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        navigate("/");
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
    formData.append("image", faculty.image);
    formData.append("gender", faculty.gender);
    formData.append("facebook", faculty.facebook);
    formData.append("phoneNumber", faculty.phoneNumber);
    formData.append("validId", faculty.validId);
    formData.append("shopImage", faculty.shopImage);
    formData.append("shopDescription", faculty.shopDescription);
    formData.append("gcashNumber", faculty.gcashNumber);
    formData.append("isSeller", faculty.isSeller);
    formData.append("address", faculty.address);
    axios
      .put(`http://localhost:4000/api/faculty/${isFaculty.id}`, formData, {
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

  return (
    <div>
      {isUsers ? (
        <figure className="max-w-full max-h-full m-5 bg-gray-700 text-center p-5 rounded-md">
          <article>
            <h1></h1>
            <form onSubmit={usersOnSubmit}>
              <article className="">
                <input
                  type="text"
                  name="email"
                  placeholder={isUsers.email}
                  value={users.email}
                  onChange={userOnChange}
                  disabled
                />

                <input
                  type="text"
                  name="username"
                  placeholder={isUsers.username}
                  value={users.username}
                  onChange={userOnChange}
                  disabled
                />

                <input
                  type="text"
                  name="fullname"
                  placeholder={isUsers.fullname}
                  value={users.fullname}
                  onChange={userOnChange}
                  disabled
                />
              </article>
              <br />
              {/* Image here */}
              <input
                type="file"
                name="validId"
                accept="image/*"
                onChange={(e) =>
                  setUsers({ ...users, validId: e.target.files[0] })
                }
              />
              <br />
              <input
                type="file"
                name="shopImage"
                accept="image/*"
                onChange={(e) =>
                  setUsers({ ...users, shopImage: e.target.files[0] })
                }
              />
              <br />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setUsers({ ...users, image: e.target.files[0] })
                }
              />
              <br />

              {/* Image here */}
              <select
                type="text"
                name="gender"
                value={users.gender}
                onChange={userOnChange}
                required
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <br />
              <select
                type="text"
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
              </select>
              <br />
              <input
                type="text"
                name="facebook"
                placeholder="Input facebook Link"
                value={users.facebook}
                onChange={userOnChange}
              />
              <br />
              <input
                type="text"
                name="address"
                placeholder="Input address"
                value={users.address}
                onChange={userOnChange}
              />
              <br />
              <input
                type="text"
                name="course"
                placeholder="Input Major and Course"
                value={users.course}
                onChange={userOnChange}
              />
              <br />
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone #"
                value={users.phoneNumber}
                onChange={userOnChange}
              />
              <br />
              <input
                type="number"
                name="gcashNumber"
                placeholder="Gcash #"
                value={users.gcashNumber}
                onChange={userOnChange}
              />
              <br />

              <input
                type="text"
                name="shopDescription"
                placeholder="Shop Description"
                value={users.shopDescription}
                onChange={userOnChange}
              />
              <br />

              <input
                type="checkbox"
                name="isSeller"
                value={false}
                onChange={userOnChange}
                required
              />
              <label>
                To confirm this account, please click the checkbox and wait for
                the review for the confirmation of your account to be a seller.
              </label>
              <br />
              <button type="submit">Save</button>
            </form>
          </article>
        </figure>
      ) : (
        <></>
      )}
      {isFaculty ? (
        <figure>
          <article>
            <form onSubmit={facultyOnSubmit}>
              <input
                type="text"
                name="email"
                placeholder={faculty.email}
                value={faculty.email}
                onChange={facultyOnChange}
                disabled
              />
              <br />
              <input
                type="text"
                name="username"
                placeholder={faculty.username}
                value={faculty.username}
                onChange={facultyOnChange}
                disabled
              />
              <br />
              <input
                type="text"
                name="fullname"
                placeholder={faculty.fullname}
                value={faculty.fullname}
                onChange={facultyOnChange}
                disabled
              />
              <br />
              <select
                type="text"
                name="gender"
                value={faculty.gender}
                onChange={facultyOnChange}
                required
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <br />
              <input
                type="text"
                name="facebook"
                placeholder="Input facebook Link"
                value={faculty.facebook}
                onChange={facultyOnChange}
              />
              <br />
              <input
                type="text"
                name="address"
                placeholder="Input address"
                value={faculty.address}
                onChange={facultyOnChange}
              />
              <br />

              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone #"
                value={faculty.phoneNumber}
                onChange={facultyOnChange}
              />
              <br />
              <input
                type="number"
                name="gcashNumber"
                placeholder="Gcash #"
                value={faculty.gcashNumber}
                onChange={facultyOnChange}
              />
              <br />

              {/* Image here */}
              <input
                type="file"
                accept="image/*"
                name="validId"
                onChange={(e) =>
                  setFaculty({ ...faculty, validId: e.target.files[0] })
                }
              />
              <br />
              <input
                type="file"
                accept="image/*"
                name="shopImage"
                onChange={(e) =>
                  setFaculty({ ...faculty, shopImage: e.target.files[0] })
                }
              />
              <br />
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) =>
                  setFaculty({ ...faculty, image: e.target.files[0] })
                }
              />
              <br />
              {/* Image here */}

              <input
                type="text"
                name="shopDescription"
                placeholder="Shop Description"
                value={faculty.shopDescription}
                onChange={facultyOnChange}
              />
              <br />
              <input
                type="checkbox"
                name="isSeller"
                value={false}
                onChange={facultyOnChange}
              />
              <label>
                To confirm this account, please click the checkbox and wait for
                the review for the confirmation of your account to be a seller.
              </label>
              <br />

              <button type="submit">Save</button>
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
