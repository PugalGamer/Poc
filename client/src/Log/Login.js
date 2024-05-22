import React, { useEffect, useState } from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function Login() {
  const [store, setStore] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:2000/user`)
      .then((res) => {
        setStore(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const user = store.find(
      (e) => e.email === email && e.password === password
    );
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store the logged-in user's information in localStorage
      const tok = btoa(`${email}:${password}`);
      Cookies.set("tok", tok, { expires: 1 });
      if (user.userType === "User") {
        console.log("User Logged in Successfully");
        // Redirect to user page
        navigate("/user");
      } else if (user.userType === "Admin") {
        console.log("Admin Logged in Successfully");
        toast.success("Admin Logged in Successfully");
        // Redirect to admin page
        navigate("/admin");
      }
    } else {
      console.log("invalid Login");
      toast.error("Invalid email or password", {
        theme: "light",
      });
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);

    const user = store.find((e) => e.email === decoded.email);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store the logged-in user's information in localStorage
      if (user.userType === "Admin") {
        console.log("Admin Logged in Successfully");
        toast.success("Admin Logged in Successfully");
        // Redirect to admin page
        navigate("/admin");
      } else if (user.userType === "User") {
        console.log("User Logged in Successfully");
        toast.success("User Logged in Successfully", {
          theme: "light",
        });
        navigate("/user");
      }
    } else {
      console.log("Google login email not found in the user store");
      toast.error("Google login email not found in the user store", {
        theme: "light",
      });
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Login Failed");
    toast.error("Google login failed", {
      theme: "light",
    });
  };

  return (
    <div className="App">
      <h1>Login</h1>
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
          <button className="e-btn e-primary " style={{ margin: 10 }}>
            log in
          </button>
          <ToastContainer />

          <p>or</p>
          <div
            style={{ display: "flex", justifyContent: "center", padding: 10 }}
          >
            <span>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            </span>
          </div>
          <p style={{ padding: 10, marginTop: -3 }}>
            if don't have an account
            <span style={{ marginLeft: 5 }}>
              <Link to={"/"}>sign up!</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
