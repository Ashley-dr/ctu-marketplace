/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-image-lightbox/style.css"; // Lightbox styles

import { Radio, RadioGroup, Select } from "@chakra-ui/react";
import { initLightboxJS } from "lightbox.js-react";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

function SellerFacultyApproval() {
  const [facultyData, setFacultyData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // For image lightbox
  const [currentImage, setCurrentImage] = useState(""); // Track current image
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/faculty/${id}`)
      .then((result) => {
        setFacultyData(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log("Error to fetch");
      });
  }, [id]);

  const FacultyOnchange = (e) => {
    setFacultyData({ ...facultyData, [e.target.name]: e.target.value });
  };

  const FacultySubmit = (e) => {
    e.preventDefault();
    const data = {
      isFaculty: facultyData.isFaculty,
      isSeller: facultyData.isSeller,
    };
    axios
      .put(`http://localhost:4000/api/facultySellerUpdate/${id}`, data)
      .then((result) => {
        navigate("/MainAdmDash/AccountToBeSeller");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="flex  justify-center items-center min-h-screen max-w-full font-poppins">
        <div className="bg-white  text-gray-900 shadow-lg rounded-lg p-6 m-5 max-w-5xl w-full">
          <h2 className="text-xl font-semibold text-center mb-6">
            Seller Approval
          </h2>
          {facultyData ? (
            <div className="space-y-4 grid ssm:grid-1 lg:grid-cols-2 w-full gap-10">
              <div className="space-y-2 mx-16">
                <img
                  src={facultyData.validId}
                  alt="Valid ID"
                  className="w-80 h-64 rounded-lg cursor-pointer border-dashed border-2 border-gray-500"
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentImage(facultyData.validId);
                  }}
                />
                <img
                  src={facultyData.image}
                  alt="User"
                  className="w-80 h-64 rounded-lg cursor-pointer border-dashed border-2 border-gray-500"
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentImage(facultyData.image);
                  }}
                />
                <Lightbox
                  open={isOpen}
                  close={() => setIsOpen(false)}
                  slides={[{ src: currentImage }]}
                  plugins={[Zoom]}
                />
              </div>
              <figure className="w-full text-sm space-y-5 font-quicksand">
                <p className="">Email: {facultyData.email}</p>
                <p className="">Username: {facultyData.username}</p>
                <p className="">Full Name: {facultyData.fullname}</p>
                <p className="">Address: {facultyData.address}</p>
                <p className="">Gender: {facultyData.gender}</p>

                <p className="">Facebook: {facultyData.facebook}</p>

                <p className="">Phone Number: {facultyData.phoneNumber}</p>
                <p className="">
                  Shop Description: {facultyData.shopDescription}
                </p>
                <p className="">Gcash Number: {facultyData.gcashNumber}</p>

                <form onSubmit={FacultySubmit} className="mt-6">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Seller Status
                    </label>
                    <Select
                      type="text"
                      value={facultyData.isSeller}
                      name="isSeller"
                      onChange={FacultyOnchange}
                      className="shadow-xl text-center appearance-none border rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option className="text-red-500" value={false}>
                        Decline
                      </option>
                      <option className="text-green-500 " value={true}>
                        Cofirm
                      </option>
                    </Select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                </form>
              </figure>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerFacultyApproval;
