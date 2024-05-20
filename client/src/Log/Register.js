import React, { useEffect, useState } from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [store, setStore] = useState([]);
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:2000/user`).then((res) => {
      setStore(res.data);
      console.log(res.data);
    });
  }, []);

  const navigate = useNavigate();
  const type = ["User", "Admin"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the email and password combination already exists
    const userExists = store.find((user) => user.email === email);
    if (userExists) {
      toast.error("User with the same email already exists.");
      console.log("User email already exists!");
      return; // Exit function if user already exists
    }
    let post = {
      userType: userType,
      username: username,
      email: email,
      password: password,
    };
    if (userType && username && email && password) {
      axios
        .post(`http://localhost:2000/user`, post)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log("Registered Successfully");
          toast.success("Registered Successfully");
          alert("Registered Successfully");
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err);
          console.log(err);
        });
    } else {
      toast.error("please fill all the fields");
    }
  };
  return (
    <div>
      <h1>Registeration</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          style={{
            backgroundColor: "whitesmoke",
            textAlign: "center",
            margin: 10,
            width: 500,
            borderRadius: 5,
          }}
          onSubmit={handleSubmit}
        >
          <br />
          <DropDownListComponent
            dataSource={type}
            width={300}
            onChange={(e) => setUserType(e.target.value)}
          />
          <br />
          <TextBoxComponent
            type="text"
            placeholder="Enter Username"
            floatLabelType="auto"
            width={300}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <TextBoxComponent
            type="email"
            placeholder="Enter Your Original Gmail"
            floatLabelType="auto"
            width={300}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextBoxComponent
            type="password"
            placeholder="Enter Your Original Gmail Password"
            floatLabelType="auto"
            width={300}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            type="submit"
            className="e-btn e-primary "
            style={{ marginTop: 10 }}
          >
            Register
          </button>
          <ToastContainer />
          <p style={{ margin: 10, padding: 10 }}>
            if already have an account
            <span style={{ marginLeft: 5 }}>
              <Link to={"/login"}>sign in!</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
