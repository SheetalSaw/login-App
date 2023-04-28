import "./App.css";
import React from "react";
import Dashboard from "./Component/Dashboard";
import Logout from "./Component/Logout";
import UpdateProfile from "./Component/UpdateProfile";
import Navbar from "./Component/Navbar";
import Layout from "./Component/Layout/Layout";

import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import SignIn from "./Component/Register";
// import EditUser from "./Component/Table-Component/EditUser";
import PaginationTable from "./Component/Table-Component/PaginationTable";
import HomePage from "./Component/HomePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/homePage" element={<HomePage />} />
            {/* <Route path="/login" element={<Login/>}/> */}
            <Route path="/" element={<SignIn />} />
            {/* <Route path="/addnewuser" element={<EditUser />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/paginationTable" element={<PaginationTable />} />
            
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
