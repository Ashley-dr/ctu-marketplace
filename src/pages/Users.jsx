/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Avatar,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import InventoryCounts from "../context/InventoryCount";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Search2Icon } from "@chakra-ui/icons";
import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";
function Users() {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [search, setSearch] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentLimit, setStudentLimit] = useState(7);
  const [facultyLimit, setFacultyLimit] = useState(7);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [studentsResponse, facultyResponse] = await Promise.all([
        axios.get(`${baseUrl}/api/users`),
        axios.get(`${baseUrl}/api/faculty`),
      ]);

      setStudentData(studentsResponse.data);
      setFacultyData(facultyResponse.data);

      setError(null);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchData();
    // const interval = setInterval(fetchData, 10000); // Update every second
    // return () => clearInterval(interval);
  }, [fetchData]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const loadMoreStudents = () => {
    setStudentLimit((prevLimit) => prevLimit + 10);
  };

  const loadMoreFaculty = () => {
    setFacultyLimit((prevLimit) => prevLimit + 10);
  };
  const filteredStudents = studentData
    .filter(
      (student) =>
        student.email.toLowerCase().includes(search.toLowerCase()) &&
        student.isSeller === true
    )
    .slice(0, studentLimit);

  const filteredFaculty = facultyData
    .filter(
      (faculty) =>
        faculty.email.toLowerCase().includes(search.toLowerCase()) &&
        faculty.isSeller === true
    )
    .slice(0, facultyLimit);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-7  mt-5 pb-4 justify-self-center ssm:w-[330px] md:w-[500px] lg:w-[1200px]">
      <figure className="flex align-middle ">
        <InputGroup mx={17}>
          <InputLeftElement>
            <Search2Icon />
          </InputLeftElement>{" "}
          <Input
            type="text"
            borderRadius={0}
            borderColor={"purple.700"}
            _placeholder={{
              opacity: 1,

              color: "purple.500",
            }}
            placeholder="Search sellers"
            value={search}
            onChange={handleSearchChange}
            className="w-full mb-6 px-4 py-2 "
          />
        </InputGroup>
      </figure>
      <div className="grid  gap-8">
        <div>
          <h2 className="text-sm font-thic font-quicksand mb-4">
            Student members
          </h2>
          {filteredStudents.length > 0 ? (
            <div className="grid ssm:grid-cols-3 lg:grid-cols-7 gap-2 ">
              {filteredStudents.map((student) => (
                <Link
                  to={`/UserAccount/${student.email}`}
                  key={student._id}
                  className="border transition ease-in-out  hover:-translate-y-1 hover:scale-100  pt-2 pb-2 border-purple-500 mb-2"
                >
                  <figure className="grid justify-items-center">
                    <Avatar src={student.image} />
                    <p className="text-xs w-20 mt-1 mb-1 truncate text-center font-quicksand font-thin">
                      {student.username}
                    </p>
                  </figure>
                  <p className="flex justify-center">
                    <p className=" text-teal-500">
                      <InventoryCounts id={student._id} />
                    </p>
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No students found.</p>
          )}{" "}
          {studentLimit < studentData.length && (
            <button
              onClick={loadMoreStudents}
              className="mt-4 flex items-center gap-1 text-center hover:underline"
            >
              See More <BiRightArrowAlt className="text-2xl" />
            </button>
          )}
        </div>

        <div>
          <h2 className="text-sm font-thic font-quicksand mb-4">
            Faculty members
          </h2>
          {filteredFaculty.length > 0 ? (
            <div className="grid ssm:grid-cols-3 lg:grid-cols-7 gap-2 mb-2">
              {filteredFaculty.map((faculty) => (
                <Link
                  to={`/FacultyAccount/${faculty.email}`}
                  key={faculty._id}
                  className="border transition ease-in-out  hover:-translate-y-1 hover:scale-100  pt-2 pb-2 border-purple-500 mb-2"
                >
                  <figure className="grid justify-items-center">
                    <Avatar src={faculty.image} />
                    <p className="text-xs w-20 mt-1 mb-1 truncate text-center font-quicksand font-thin">
                      {faculty.username}
                    </p>
                  </figure>
                  <p className="flex justify-center">
                    <p className=" text-teal-500">
                      <InventoryCounts id={faculty._id} />
                    </p>
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No Faculty found.</p>
          )}
          {facultyLimit < facultyData.length && (
            <button
              onClick={loadMoreFaculty}
              className="mt-4 flex items-center gap-1 text-center hover:underline"
            >
              See More <BiRightArrowAlt className="text-2xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
