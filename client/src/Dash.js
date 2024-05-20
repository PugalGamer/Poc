import React from "react";
import "./App.css";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { AppBarComponent } from "@syncfusion/ej2-react-navigations";
import { useState, useEffect } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
// registerLicense(
//   "ORg4AjUWIQA/Gnt2UFhhQlJBfVldWHxLflFyVWFTel96dFZWESFaRnZdRl1mSXhTdEBiXHpdeHNT"
// );

export default function Dash() {
  const [store, setStore] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const tool = ["Search", "Print"];

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/`)
      .then((res) => {
        setStore(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let push = {
      username: username,
      email: email,
      password: password,
    };
    if (username && email && password) {
      axios
        .post(`http://localhost:4000/users/`, push)
        .then((res) => {
          console.log(res);
          toast.success("User Added Successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error", {
            theme: "colored",
            position: "top-left",
          });
        });
    } else {
      toast.warning("Please fill all the fields");
    }
  };
  console.log(store?.map((e) => e._id));
  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:4000/users/${_id}`)
      .then((res) => {
        console.log(res);
        toast.success("Deleted", {
          theme: "dark",
          position: "top-right",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = (_id) => {
    let put = {
      username: username,
      email: email,
      password: password,
    };
    if (username && email && password) {
      axios
        .put(`http://localhost:4000/users/${_id}`, put)
        .then((res) => {
          console.log(res);
          toast.success("Updated", {
            theme: "light",
            position: "top-center",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error");
        });
    } else {
      toast.warning("Please fill all the fields", {
        theme: "dark",
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="App">
      <div className="control-container">
        <AppBarComponent colorMode="">
          <ButtonComponent
            cssClass="e-inherit menu"
            iconCss="e-icons e-menu"
          ></ButtonComponent>
          <span>CRUD</span>
          <div className="e-appbar-spacer"></div>
          <Link to={"/home"}>
            <button className="e-btn e-link" style={{ margin: 5 }}>
              Home
            </button>
          </Link>

          <button className="e-btn e-link" style={{ margin: 5 }}>
            About
          </button>
          <button className="e-btn e-link" style={{ margin: 5 }}>
            service
          </button>
          <button className="e-btn e-link" style={{ margin: 5 }}>
            contact
          </button>
          <Link to={"/"}>
            <button className="e-btn e-link" style={{ margin: 5 }}>
              log out
            </button>
          </Link>
        </AppBarComponent>
      </div>
      {/* <marquee>
        {" "}
        CRUD APPLICATION USING syncfusion Ui front-end, json-server back-end{" "}
      </marquee> */}
      <form
        style={{
          backgroundColor: "whitesmoke",
          textAlign: "center",
          margin: 50,
        }}
        onSubmit={handleSubmit}
      >
        {/* <TextBoxComponent
          type="number"
          placeholder="Id"
          floatLabelType="auto"
          width={300}
          onChange={(e) => setId(e.target.value)}
        />
        <br /> */}
        <TextBoxComponent
          type="text"
          placeholder="username"
          floatLabelType="auto"
          width={300}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <TextBoxComponent
          type="email"
          placeholder="Email"
          floatLabelType="auto"
          width={300}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextBoxComponent
          type="password"
          placeholder="Password"
          floatLabelType="auto"
          width={300}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          type="submit"
          className="e-btn e-primary"
          style={{ margin: 10 }}
        >
          Create
        </button>
        <ToastContainer />
      </form>
      <div style={{ display: "flex", margin: 40, flexWrap: "wrap" }}>
        {store?.map((e) => (
          <div
            key={e._id}
            className="e-card"
            style={{
              backgroundColor: "whitesmoke",
              width: 290,
              height: 370,
              margin: 25,
              padding: 10,
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            <h5>{e._id}</h5>
            <p>{e.username}</p>
            <p>{e.email}</p>
            <p>{e.password}</p>
            <button
              className="e-btn e-info  "
              style={{ margin: 5 }}
              onClick={() => handleUpdate(e._id)}
            >
              Update
            </button>
            <ToastContainer />
            <button
              className="e-btn e-danger"
              style={{ margin: 5 }}
              onClick={() => handleDelete(e._id)}
            >
              Delete
            </button>
            <ToastContainer />
          </div>
        ))}
      </div>
      <GridComponent dataSource={store} toolbar={tool} style={{ margin: 50 }}>
        <ColumnsDirective>
          <ColumnDirective field="_id" width="100" textAlign="Center" />
          <ColumnDirective field="Email" width="100" textAlign="Center" />
          <ColumnDirective field="Password" width="100" textAlign="Center" />
        </ColumnsDirective>
        <Inject services={[Toolbar]} />
      </GridComponent>
    </div>
  );
}
