import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import InitialAvatar from "./InitialAvtar/initialAvtar";

function Navbar() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userObj, setUserObj] = useState();
  const [userName, setUserName] = useState(data.username);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userObj")) || undefined;
    setData(data);
    setUserName(data.username);
    // console.log(userObj)
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/homepage");
  };
  return (
    <div className="navbar">
      <Link to="/">Register</Link>
      <Link to={{ pathname: "/dashboard", state: userObj }}>Dashboard</Link>
      <Link to="/homepage" onClick={handleLogout}>
        Log out
      </Link>
      
    </div>
  );
}

export default Navbar;
