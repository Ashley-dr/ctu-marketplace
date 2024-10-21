/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { AppShell } from "@saas-ui/react";

function AdminDashboard() {
  const [usersData, setUsersData] = useState([]);
  const [facultysData, setFacultyData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users")
      .then((result) => {
        setUsersData(result.data);
      })
      .catch((err) => {
        console.log("Error fetching Users Data", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/faculty")
      .then((result) => {
        setFacultyData(result.data);
      })
      .catch((err) => {
        console.log("Error fetching Faculty Data", err);
      });
  }, []);

  const userDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/users/${id}`)
      .then(() => {
        setUsersData(usersData.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.log("Error removing user data", err);
      });
  };

  const facultyDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/faculty/${id}`)
      .then(() => {
        setFacultyData(facultysData.filter((faculty) => faculty._id !== id));
      })
      .catch((err) => {
        console.log("Error removing faculty data", err);
      });
  };

  return (
    <AppShell>
      <Box p={5} minHeight="100vh" className="text-xs font-quicksand">
        <Heading textAlign="center" mb={8}>
          <p className="text-base font-semibold font-quicksand">
            Students & Faculty Data
          </p>
        </Heading>

        <Card variant="outline" mb={8}>
          <CardHeader>
            <Heading size="xs">Student Data</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Email</Th>
                    <Th>Username</Th>
                    <Th>Fullname</Th>
                    <Th>Address</Th>
                    <Th>Gender</Th>
                    <Th>Department</Th>
                    <Th>Facebook</Th>
                    <Th>Course</Th>
                    <Th>Phone</Th>
                    <Th>Created At</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {usersData.map((user) => (
                    <Tr key={user._id}>
                      <Td>{user.email}</Td>
                      <Td>{user.username}</Td>
                      <Td>{user.fullname}</Td>
                      <Td>{user.address}</Td>
                      <Td>{user.gender}</Td>
                      <Td>{user.department}</Td>
                      <Td>{user.facebook}</Td>
                      <Td>{user.course}</Td>
                      <Td>{user.phoneNumber}</Td>
                      <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                      <Td>
                        <IconButton
                          colorScheme="red"
                          icon={<DeleteIcon />}
                          onClick={() => userDelete(user._id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>

        <Card variant="outline">
          <CardHeader>
            <Heading size="xs">Faculty Data</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Email</Th>
                    <Th>Username</Th>
                    <Th>Fullname</Th>
                    <Th>Address</Th>
                    <Th>Gender</Th>
                    <Th>Facebook</Th>
                    <Th>Phone</Th>
                    <Th>Created At</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {facultysData.map((faculty) => (
                    <Tr key={faculty._id}>
                      <Td>{faculty.email}</Td>
                      <Td>{faculty.username}</Td>
                      <Td>{faculty.fullname}</Td>
                      <Td>{faculty.address}</Td>
                      <Td>{faculty.gender}</Td>
                      <Td>{faculty.facebook}</Td>
                      <Td>{faculty.phoneNumber}</Td>
                      <Td>
                        {new Date(faculty.createdAt).toLocaleDateString()}
                      </Td>
                      <Td>
                        <IconButton
                          colorScheme="red"
                          icon={<DeleteIcon />}
                          onClick={() => facultyDelete(faculty._id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </AppShell>
  );
}

export default AdminDashboard;
