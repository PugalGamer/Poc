import React, { useEffect, useState } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { AppBarComponent } from "@syncfusion/ej2-react-navigations";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("tok");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div>
      <div className="control-container">
        <AppBarComponent colorMode="">
          <ButtonComponent
            cssClass="e-inherit menu"
            iconCss="e-icons e-menu"
          ></ButtonComponent>

          {loggedInUser && <h2>{loggedInUser.userType}</h2>}

          <div className="e-appbar-spacer"></div>

          {loggedInUser && <h2>{loggedInUser.username}</h2>}
          <Link to={"/login"}>
            <button
              className="e-btn e-link"
              style={{ margin: 5 }}
              onClick={handleLogout}
            >
              log out
            </button>
          </Link>
        </AppBarComponent>
      </div>
    </div>
  );
}
