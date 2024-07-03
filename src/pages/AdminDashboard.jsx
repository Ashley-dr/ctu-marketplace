/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";
import {
  AppShell,
  Sidebar,
  SidebarSection,
  SidebarToggleButton,
  NavItem,
} from "@saas-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import AccountsToBeSeller from "./AccountsToBeSeller";
function AdminDashboard() {
  const [usersData, setUsersData] = useState([]);
  const [facultysData, setFacultyData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  const userDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/users/${id}`)
      .then((result) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Error to remove this user data", err);
      });
  };
  const facultyDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/faculty/${id}`)
      .then((result) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Error to remove this faculty data", err);
      });
  };
  return (
    <div>
      <AppShell
        sidebar={
          <Sidebar
            className="mx-4 p-5 mt-5 bg-slate-500 rounded-md"
            variant="compact"
            width="200px"
            toggleBreakpoint="sm"
          >
            <SidebarSection>
              <NavItem icon={<FiUsers size="1.2em" />} size="md">
                <Link to="/AccountsToBeSeller">Sellers Approval</Link>
              </NavItem>
              <NavItem icon={<FiSettings size="1.2em" />} size="md">
                Settings
              </NavItem>
            </SidebarSection>
          </Sidebar>
        }
      >
        <figure className="mx-5 p-5 mt-5 bg-slate-500 rounded-md">
          <h1 className="text-center text-xl">Students data & Facultys Data</h1>
          <table>
            <thead>
              <tr className=" ">
                <th>Email</th>
                <th>Username</th>
                <th>Fullname</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Fb Link</th>
                <th>Course</th>
                <th>Phone #</th>
                <th>Stamp</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((item) => (
                <tr key={item._id}>
                  <td>
                    <p>{item.email}</p>
                  </td>
                  <td>
                    <p>{item.username}</p>
                  </td>
                  <td>
                    <p>{item.fullname}</p>
                  </td>

                  <td>
                    <p>{item.address}</p>
                  </td>
                  <td>
                    <p>{item.gender}</p>
                  </td>
                  <td>
                    {" "}
                    <p>{item.department}</p>
                  </td>
                  <td>
                    <p>{item.facebook}</p>
                  </td>
                  <td>
                    <p>{item.course}</p>
                  </td>
                  <td>
                    {" "}
                    <p>{item.phoneNumber}</p>
                  </td>
                  <td>
                    {" "}
                    <p>{item.createdAt}</p>
                  </td>

                  <button
                    onClick={() => {
                      userDelete(item._id);
                    }}
                  >
                    delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
          <figure>
            <table>
              <thead>
                <tr className=" ">
                  <th>Email</th>
                  <th>Username</th>
                  <th>Fullname</th>
                  <th>Address</th>
                  <th>Gender</th>

                  <th>Fb Link</th>

                  <th>Phone #</th>
                  <th>Stamp</th>
                </tr>
              </thead>
              <tbody>
                {facultysData.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <p>{item.email}</p>
                    </td>
                    <td>
                      {" "}
                      <p>{item.username}</p>
                    </td>
                    <td>
                      {" "}
                      <p>{item.address}</p>
                    </td>
                    <td>
                      {" "}
                      <p>{item.gender}</p>
                    </td>
                    <td>
                      <p>{item.facebook}</p>
                    </td>
                    <td>
                      <p>{item.phoneNumber}</p>
                    </td>
                    <td>
                      <p>{item.createdAt}</p>
                    </td>
                    <button
                      onClick={() => {
                        facultyDelete(item._id);
                      }}
                    >
                      delete
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </figure>
        </figure>
      </AppShell>
    </div>
  );
}

export default AdminDashboard;
