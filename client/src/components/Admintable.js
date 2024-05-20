import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { Link, useNavigate } from "react-router-dom";

export default function Admintable() {
  const [store, setStore] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:2000/user`).then((res) => {
      setStore(res.data);
      console.log(res.data);
    });
  }, []);

  const toolbarOptions = ["Search", "Print"];

  const handleDelete = (id) => {
    axios.delete(`http://localhost:2000/user/${id}`).then((res) => {
      console.log(res); //deleted data
      alert("Deleted!");
      setStore((e) => e.filter((item) => item._id !== id)); // then reterived other datas
      console.log("deleted");
    });
  };

  const navigate = useNavigate();

  const handleGet = (rowData) => {
    // Create a copy of rowData with only serializable properties
    const serializableData = {
      _id: rowData._id,
      username: rowData.username,
      email: rowData.email,
      password: rowData.password,
      userType: rowData.userType,
    };
    navigate("/data", { state: { rowData: serializableData } });
  };

  // actionButtons
  const actionButton = (rowData) => (
    <div>
      <button className="e-btn e-info" onClick={() => handleGet(rowData)}>
        <span className="e-icons e-edit e-medium"></span>
      </button>
      <Link to={`/updatepage`}>
        <button className="e-btn e-warning" style={{ marginLeft: 20 }}>
          <span className="e-icons e-rename-3 e-medium"></span>
        </button>
      </Link>
      <button
        className="e-btn e-danger"
        onClick={() => handleDelete(rowData._id)}
        style={{ marginLeft: 20 }}
      >
        <span className="e-icons e-delete-1 e-medium"></span>
      </button>
    </div>
  );

  return (
    <div>
      <div style={{ margin: 20 }}>
        <GridComponent dataSource={store} toolbar={toolbarOptions}>
          <ColumnsDirective>
            <ColumnDirective field="_id" width="100" textAlign="Center" />
            <ColumnDirective
              field="username"
              headerText="Username"
              width="100"
              textAlign="Center"
            />
            <ColumnDirective
              field="email"
              headerText="Email"
              width="100"
              textAlign="Center"
            />
            <ColumnDirective
              field="password"
              headerText="Password"
              width="100"
              textAlign="Center"
            />
            <ColumnDirective
              field="userType"
              headerText="User Type"
              width="100"
              textAlign="Center"
            />
            <ColumnDirective
              headerText="Actions"
              width="100"
              textAlign="Center"
              template={(rowData) => actionButton(rowData)} // Pass rowData to actionButton
            />
          </ColumnsDirective>
          <Inject services={[Toolbar]} />
        </GridComponent>
      </div>
    </div>
  );
}
