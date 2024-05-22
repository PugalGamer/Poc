import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function User() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);
  console.log(loggedInUser);

  const navigate = useNavigate();

  useEffect(() => {
    const tok = Cookies.get("tok");
    if (!tok) {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <div>
      <Header />
      <h1>User Page</h1>
      {loggedInUser && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="e-card"
            style={{
              width: 300,
              height: 300,
              borderRadius: 5,
              backgroundColor: "whitesmoke",
            }}
          >
            <p>{loggedInUser._id}</p>
            <p>{loggedInUser.email}</p>
            <p>{loggedInUser.password}</p>
          </div>
        </div>
      )}
    </div>
  );
}
