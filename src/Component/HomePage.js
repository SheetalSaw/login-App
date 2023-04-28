import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/")
  };
  return (
    <div>
      <h3>Logged out Successfully</h3>
      <h3>
        <a onClick={handleLogout}>Login again</a>
      </h3>
    </div>
  );
}

export default HomePage;
