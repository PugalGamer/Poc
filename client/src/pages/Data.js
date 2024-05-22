// Data.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Data() {
  const location = useLocation();
  const { rowData } = location.state || {};
  console.log(rowData);

  const navigate = useNavigate();

  useEffect(() => {
    const tok = Cookies.get("tok");
    if (!tok) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Data</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {rowData ? (
          <div
            className="e-card"
            style={{
              width: 300,
              height: 300,
              borderRadius: 5,
              backgroundColor: "oldlace",
            }}
          >
            <p>
              <strong>User Type:</strong> {rowData.userType}
            </p>
            <p>
              <strong>Username:</strong> {rowData.username}
            </p>
            <p>
              <strong>Email:</strong> {rowData.email}
            </p>
            <p>
              <strong>Password:</strong> {rowData.password}
            </p>
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
