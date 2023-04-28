import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Navbar from "./Navbar";
import PaginationTable from "./Table-Component/PaginationTable";
import { Data } from "./junk";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const [loggedInUser, setLoggedinuser] = useState(
    JSON.parse(localStorage.getItem("userObj"))
  );

  console.log(loggedInUser);

  return (
    <>
      <Navbar />
      <h3 class="card-title">
        Hello {loggedInUser.first_name} {loggedInUser.last_name}
      </h3>
   <div className="wrapper">
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <p class="card-text">Mail-Id:{loggedInUser.email}</p>
        </div>{" "}
        <div class="card-body1">
          <p class="card-text">
          Address:
            {loggedInUser.address.city + " ," + loggedInUser.address.state}
          </p>
        </div>
        <div class="card-body2">
        <p class="card-text">Subscription :{loggedInUser.subscription.plan}</p>
        </div>
      </div>
      </div>
      <PaginationTable />
    </>
  );
}

export default Dashboard;
