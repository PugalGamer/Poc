// Data.js
import React from "react";
import { useLocation } from "react-router-dom";

export default function Data() {
  const location = useLocation();
  const { rowData } = location.state || {};
  console.log(rowData);

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
