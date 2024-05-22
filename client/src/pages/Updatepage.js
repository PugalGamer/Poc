import React, { useState, useEffect } from "react";
import axios from "axios";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie'

export default function Updatepage() {
  const [store, setStore] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // State to store search keyword
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user
  // const [userType, setUserType] = useState("");
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

  useEffect(() => {
    const tok = Cookies.get("tok");
    if (!tok) {
      navigate("/login");
    }
  }, [navigate]);


  // Function to handle search
  const handleSearch = () => {
    const foundUser = store.find(
      (user) =>
        user.username.toLowerCase() === searchKeyword.toLowerCase() ||
        user.email.toLowerCase() === searchKeyword.toLowerCase()
    );
    if (foundUser) {
      setSelectedUser(foundUser); // Update selected user state
    } else {
      setSelectedUser(null); // If user not found, reset selected user state
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userExists = store.find(
      (user) => user.email === email && user._id !== selectedUser._id
    );
    if (userExists) {
      toast.error("user email already exists!", { theme: "colored" });
      console.log("User email already exists!");
      return; // Exit function if user already exists
    }
    const user = {
      // userType: userType,
      username: username,
      email: email,
      password: password,
    };
    if (username && email && password) {
      axios
        .put(`http://localhost:2000/user/${selectedUser._id}`, user)
        .then((res) => {
          console.log(res.data);
          toast.success("Updated Successfully!", {
            position: "top-center",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warning("Please fill all fields", {
        position: "top-center",
      });
    }
  };

  // const type = ["User", "Admin"];

  return (
    <div>
      <h1>Update User</h1>
      <div className="form-group">
        <TextBoxComponent
          placeholder="Username or Email"
          type="text"
          width={300}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleSearch} className="e-btn e-info">
          <span className="e-icons e-search-3 e-medium"></span>
        </button>
        <Link to={"/admin"} style={{ marginLeft: 10 }}>
          <button className="e-btn e-success">
            <span className="e-icons e-arrow-left-2 e-medium"></span>
          </button>
        </Link>
      </div>
      <div>
        {selectedUser && (
          <div
            style={{
              backgroundColor: "",
              width: "auto",
              display: "flex",
              justifyContent: "space-evenly",
              margin: 20,
              flexWrap:"wrap"
            }}
          >
            <form
              style={{
                backgroundColor: "whitesmoke",
                textAlign: "center",
                margin: 10,
                width: 500,
                height: 300,
                borderRadius: 5,
              }}
              onSubmit={handleSubmit}
            >
              <br/>
              <div className="form-group">
                <TextBoxComponent
                  placeholder="Username"
                  type="text"
                  width={300}
                  // value={selectedUser.username}
                  onChange={(e) => setUsername(e.target.value)}
                  // Add onChange handler to update selected user's username
                />
              </div>
              <br />
              <br />
              <div className="form-group">
                <TextBoxComponent
                  placeholder="Email"
                  type="email"
                  width={300}
                  // value={selectedUser.email}
                  onChange={(e) => setEmail(e.target.value)}
                  // Add onChange handler to update selected user's email
                />
              </div>
              <br />
              <br />
              <div className="form-group">
                <TextBoxComponent
                  placeholder="Password"
                  type="password"
                  width={300}
                  // value={selectedUser.password}
                  onChange={(e) => setPassword(e.target.value)}
                  // Add onChange handler to update selected user's password
                />
              </div>
              <br />
              <button
                type="submit"
                className="e-btn e-info"
                // onClick={(e) => handleSubmit(e._id)}
              >
                Update
              </button>
              <ToastContainer />
              <h5 style={{padding:5,marginTop:-2}}>Please Re-enter The Data or New Update data! </h5>
            </form>
            <div style={{ margin: 10 }}>
              {selectedUser && (
                <div
                  className="e-card"
                  style={{ width: 300, height: 300, borderRadius: 5 }}
                >
                  <p>
                    <strong>Username:</strong>
                    {selectedUser.username}
                  </p>
                  <p>
                    <strong>Passsword:</strong>
                    {selectedUser.password}
                  </p>
                  <p>
                    <strong>Email:</strong>
                    {selectedUser.email}
                  </p>
                  <h5>ID:{selectedUser._id}</h5>
                </div>
              )}
            </div>
          </div> // Display update form if user is found
        )}
      </div>
    </div>
  );
}
