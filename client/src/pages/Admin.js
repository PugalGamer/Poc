import Admintable from "../components/Admintable";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import axios from "axios";
export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
  console.log(store);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userExists = store.find((user) => user.email === email);
    if (userExists) {
      alert("User email already exists!");
      console.log("User email already exists!");
      return; // Exit function if user already exists
    }
    let post = {
      username: username,
      email: email,
      password: password,
      userType: userType,
    };
    if (userType && username && password && email) {
      axios
        .post(`http://localhost:2000/user`, post)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          alert("user added");
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    } else {
      alert("Please fill the fields");
    }
    handleCloseModal();

    // Handle form submission logic here
  };
  const type = ["User", "Admin"];

  return (
    <div>
      <Header />
      <h1>Admin Page</h1>
      <div>
        <button className="e-btn e-info" onClick={handleOpenModal}>
          Create
          <span
            className="e-icons e-plus e-small"
            style={{ marginLeft: 5 }}
          ></span>
        </button>
      </div>
      <Admintable />
      <DialogComponent
        visible={isModalOpen}
        width="500px"
        header="Create User"
        // showCloseIcon={true}
        onClose={handleCloseModal}
        footerTemplate={() => (
          <div>
            <ButtonComponent
              cssClass="e-primary"
              onClick={handleFormSubmit}
              type="submit"
            >
              Submit
            </ButtonComponent>
            <ButtonComponent onClick={handleCloseModal}>Cancel</ButtonComponent>
          </div>
        )}
      >
        <form>
          <div className="form-group">
            <DropDownListComponent
              dataSource={type}
              placeholder="Type"
              onChange={(e) => setUserType(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <TextBoxComponent
              placeholder="Uername"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <TextBoxComponent
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <TextBoxComponent
              placeholder="Passsword"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
      </DialogComponent>
    </div>
  );
}
