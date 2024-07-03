/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [faculty, setFaculty] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("/users").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);
  useEffect(() => {
    if (!faculty) {
      axios.get("/faculty").then(({ data }) => {
        setFaculty(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, faculty, setFaculty }}>
      {children}
    </UserContext.Provider>
  );
}
