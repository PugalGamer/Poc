import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";

export default function User() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);
  console.log(loggedInUser);
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
