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
        console.log("Error to fetch all Users Data", err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/faculty")
      .then((result) => {
        setFacultyData(result.data);
      })
      .catch((err) => {
        console.log("Error to fetch all Faculty Data", err);
      });
  }, []);
  return (
    <div>
      <figure className="mx-5 max-w-full bg-gray-600 p-5 mt-5 mb-5 rounded-md">
        <h1 className="text-center">Sellers confirmation</h1>
        <h1 className="text-center">Students</h1>
        <article className=" bg-emerald-500 p-2 rounded-sm">
          {usersData.map((item) => (
            <div key={item._id} className="flex">
              <table className=" border-collapse w-full">
                {item.isSeller === false && (
                  <>
                    <p>Users want to become a seller</p>{" "}
                    <tr className=" ">
                      <th>Valid Id</th>

                      <th>Email</th>
                      <th>Username</th>
                      <th>Fullname</th>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <a href={item.validId} target="_blank">
                          <img
                            className="max-w-full max-h-full w-32 rounded-md"
                            src={item.validId}
                            alt="valid Id"
                          />
                        </a>
                      </td>

                      <td>
                        <p>{item.email}</p>
                      </td>
                      <td>
                        <p>{item.username}</p>
                      </td>
                      <td>
                        <p>{item.fullname}</p>
                      </td>

                      <Link to={`/SellerApproval/${item._id}`}>
                        <button className=" bg-emerald-800 p-1 pl-2 pr-2 rounded-md">
                          Confirm this user
                        </button>
                      </Link>
                    </tr>
                  </>
                )}
              </table>
            </div>
          ))}
        </article>
        <h1 className="text-center">Faculty Members</h1>
        <article className=" bg-emerald-500 p-2 rounded-sm">
          {facultysData.map((item) => (
            <div key={item._id} className="flex">
              <table className=" border-collapse w-full">
                {item.isSeller === false && (
                  <>
                    <p>Faculty want to become a seller</p>{" "}
                    <tr className=" ">
                      <th>Valid Id</th>

                      <th>Email</th>
                      <th>Username</th>
                      <th>Fullname</th>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <a href={item.validId} target="_blank">
                          <img
                            className="max-w-full max-h-full w-32 rounded-md"
                            src={item.validId}
                            alt="valid Id"
                          />
                        </a>
                      </td>

                      <td>
                        <p>{item.email}</p>
                      </td>
                      <td>
                        <p>{item.username}</p>
                      </td>
                      <td>
                        <p>{item.fullname}</p>
                      </td>

                      <Link to={`/SellerFacultyApproval/${item._id}`}>
                        <button className=" bg-emerald-800 p-1 pl-2 pr-2 rounded-md">
                          Confirm this user
                        </button>
                      </Link>
                    </tr>
                  </>
                )}
              </table>
            </div>
          ))}
        </article>
        <article className=" bg-emerald-500 p-2 rounded-sm mt-5">
          {usersData.map((item) => (
            <div key={item._id} className="flex">
              <table className=" border-collapse w-full">
                {item.isSeller === true && (
                  <>
                    <p>Student Sellers </p>{" "}
                    <tr className=" ">
                      <th>Email</th>
                      <th>Username</th>
                      <th>Fullname</th>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <p>{item.email}</p>
                      </td>
                      <td>
                        <p>{item.username}</p>
                      </td>
                      <td>
                        <p>{item.fullname}</p>
                      </td>

                      <Link to={`/SellerApproval/${item._id}`}>
                        <button className=" bg-emerald-800 p-1 pl-2 pr-2 rounded-md">
                          Update
                        </button>
                      </Link>
                    </tr>
                  </>
                )}
              </table>
            </div>
          ))}
        </article>
        <h1 className="text-center">Facultys</h1>
        <article className=" bg-emerald-500 p-2 rounded-sm">
          {facultysData.map((item) => (
            <div key={item._id} className="flex">
              <table className=" border-collapse w-full">
                {item.isSeller === false && (
                  <>
                    <p>Faculty Seller</p>{" "}
                    <tr className=" ">
                      <th>Email</th>
                      <th>Username</th>
                      <th>Fullname</th>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <p>{item.email}</p>
                      </td>
                      <td>
                        <p>{item.username}</p>
                      </td>
                      <td>
                        <p>{item.fullname}</p>
                      </td>

                      <Link to={`/SellerFacultyApproval/${item._id}`}>
                        <button className=" bg-emerald-800 p-1 pl-2 pr-2 rounded-md">
                          Update
                        </button>
                      </Link>
                    </tr>
                  </>
                )}
              </table>
            </div>
          ))}
        </article>
        <article className=" bg-emerald-500 p-2 rounded-sm mt-5">
          {facultysData.map((item) => (
            <div key={item._id} className="flex">
              <table className=" border-collapse w-full">
                {item.isSeller === true && (
                  <>
                    <p>Sellers </p>{" "}
                    <tr className=" ">
                      <th>Email</th>
                      <th>Username</th>
                      <th>Fullname</th>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <p>{item.email}</p>
                      </td>
                      <td>
                        <p>{item.username}</p>
                      </td>
                      <td>
                        <p>{item.fullname}</p>
                      </td>

                      <Link to={`/SellerFacultyApproval/${item._id}`}>
                        <button className=" bg-emerald-800 p-1 pl-2 pr-2 rounded-md">
                          Update
                        </button>
                      </Link>
                    </tr>
                  </>
                )}
              </table>
            </div>
          ))}
        </article>
      </figure>
    </div>
  );
}

export default AccountsToBeSeller;
