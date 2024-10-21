/* eslint-disable no-unused-vars */
import { useState, React, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function AccountsToBeSeller() {
  const [usersData, setUsersData] = useState([]);
  const [facultysData, setFacultyData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users")
      .then((result) => {
        setUsersData(result.data);
      })
      .catch((err) => {
        console.log("Error fetching all Users Data", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/faculty")
      .then((result) => {
        setFacultyData(result.data);
      })
      .catch((err) => {
        console.log("Error fetching all Faculty Data", err);
      });
  }, []);

  return (
    <div className="container mx-auto p-5 text-xs max-w-full">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-5">
          Sellers Confirmation
        </h1>

        {/* Student Sellers Table */}
        <div className="mb-10">
          <h2 className="text-base text-white mb-3 ">
            Students Requesting to Become Sellers
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-gray-900 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4 text-left">Valid ID</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Username</th>
                  <th className="py-2 px-4 text-left">Fullname</th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {usersData.filter((item) => item.isSeller === false).length ===
                0 ? (
                  <p className="text-gray-700  text-center m-2 ">
                    No Student Member is requesting yet.
                  </p>
                ) : (
                  <>
                    {usersData
                      .filter((item) => item.isSeller === false)
                      .map((item) => (
                        <tr
                          key={item._id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-2 px-4">
                            <a
                              href={item.validId}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="w-16 h-16 object-cover rounded-md"
                                src={item.validId}
                                alt="Valid ID"
                              />
                            </a>
                          </td>
                          <td className="py-2 px-4">{item.email}</td>
                          <td className="py-2 px-4">{item.username}</td>
                          <td className="py-2 px-4">{item.fullname}</td>
                          <td className="py-2 px-4 text-center">
                            <Link
                              to={`/MainAdmDash/SellerApproval/${item._id}`}
                            >
                              <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded">
                                Confirm User
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Faculty Sellers Table */}
        <div className="mb-10">
          <h2 className="text-base text-white mb-3">
            Faculty Requesting to Become Sellers
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-gray-900 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4 text-left">Valid ID</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Username</th>
                  <th className="py-2 px-4 text-left">Fullname</th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {facultysData.filter((item) => item.isSeller === false)
                  .length === 0 ? (
                  <p className="text-gray-700  text-center m-2 ">
                    No Faculty Member is requesting yet.
                  </p>
                ) : (
                  <>
                    {facultysData
                      .filter((item) => item.isSeller === false)
                      .map((item) => (
                        <tr
                          key={item._id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-2 px-4">
                            <a
                              href={item.validId}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="w-16 h-16 object-cover rounded-md"
                                src={item.validId}
                                alt="Valid ID"
                              />
                            </a>
                          </td>
                          <td className="py-2 px-4">{item.email}</td>
                          <td className="py-2 px-4">{item.username}</td>
                          <td className="py-2 px-4">{item.fullname}</td>
                          <td className="py-2 px-4 text-center">
                            <Link
                              to={`/MainAdmDash/SellerFacultyApproval/${item._id}`}
                            >
                              <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded">
                                Confirm User
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Student Sellers */}
        <div className="mb-10">
          <h2 className="text-base text-white mb-3">Current Student Sellers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-gray-900 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Username</th>
                  <th className="py-2 px-4 text-left">Fullname</th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {usersData.filter((item) => item.isSeller === true).length ===
                0 ? (
                  <>
                    {" "}
                    <p className="text-gray-700  text-center m-2 ">
                      No Student is a seller yet.
                    </p>
                  </>
                ) : (
                  <>
                    {usersData
                      .filter((item) => item.isSeller === true)
                      .map((item) => (
                        <tr
                          key={item._id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-2 px-4">{item.email}</td>
                          <td className="py-2 px-4">{item.username}</td>
                          <td className="py-2 px-4">{item.fullname}</td>
                          <td className="py-2 px-4 text-center">
                            <Link
                              to={`/MainAdmDash/SellerApproval/${item._id}`}
                            >
                              <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                                Update
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Faculty Sellers */}
        <div className="mb-10">
          <h2 className="text-base text-white mb-3">Current Faculty Sellers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-gray-900 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Username</th>
                  <th className="py-2 px-4 text-left">Fullname</th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {facultysData.filter((item) => item.isSeller === true)
                  .length === 0 ? (
                  <>
                    <p className="text-gray-700  text-center m-2 ">
                      No Faculty is a seller yet.
                    </p>
                  </>
                ) : (
                  <>
                    {facultysData
                      .filter((item) => item.isSeller === true)
                      .map((item) => (
                        <tr
                          key={item._id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-2 px-4">{item.email}</td>
                          <td className="py-2 px-4">{item.username}</td>
                          <td className="py-2 px-4">{item.fullname}</td>
                          <td className="py-2 px-4 text-center">
                            <Link
                              to={`/MainAdmDash/SellerFacultyApproval/${item._id}`}
                            >
                              <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                                Update
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountsToBeSeller;
