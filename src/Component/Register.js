import React from "react";
import "../Component/Register.css";
import { useState, useEffect } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Table";

export default function SignIn() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [flag, setFlag] = useState(false);
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [success, setSucess] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://random-data-api.com/api/users/random_user?size=30`
      );
      const newData = await response.json();
      localStorage.setItem("allUsers", JSON.stringify(newData));
      console.log(newData);
    };

    fetchData();
  },[]);

 
 
  function onClickHandler(event) {
    let input = [name, email, password];
    const data = JSON.parse(localStorage.getItem("allUsers"));
    console.log(data)
    let mapMail = data.map((item) => item.email);
    console.log(mapMail)
    let passwordMap = data.map((item) => item.password);
    console.log(passwordMap)
    const mailEle = mapMail.find((ele) => {
      return ele === email;
    });
    console.log(mailEle)
    const passwordEle = passwordMap.find((ele) => {
      return ele === password;
    });
    const userObj = data.find(function(user){
       return user.email === email
    })

    localStorage.setItem("userObj", JSON.stringify(userObj))
    console.log(userObj)
    event.preventDefault();

    if (!email || !password) {
      setFlag(true);
    } else if (mailEle && passwordEle) {
      setFlag(false);
      navigate("/dashboard" , {state: userObj});
    }
  }

  function onClickLink() {
    // setLogin(!login);
    console.log("onClickLink");
  }

  function fileHandler(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  // function EmailHandler(e) {
  //     setEmail(e.target.value);
  //     // const name = e.target.name;
  //     // const value = e.target.value;

  //     // setInput(values => ({...values, [name]: value}))

  // }

  function validatePassword(event) {
    let passwordlength = event.target.value.length;

    if (passwordlength <= 7) {
      setSucess(false);
      // setPasswordErrorMsg("8 characters required")
    } else {
      setPassword(event.target.value);
      setPasswordErrorMsg("Password validated");
    }
  }

  function validateFile(e) {
    e.preventDefault();

    const MIN_FILE_SIZE = 1024;
    const Max_FILE_SIZE = 5120;

    if (!file) {
      setErrorMsg("Please choose a file");
      setSucess(false);
      return;
    }

    const fileSize = file.size / 1024;

    if (fileSize < MIN_FILE_SIZE) {
      console.log("File size is lesser than Min limit");
      setErrorMsg("File size is lesser than Min limit");
      setSucess(false);
      return;
    }

    if (fileSize > Max_FILE_SIZE) {
      console.log("File size is lesser than Max limit");
      setErrorMsg("File size is Greater than Max Limit");
      setSucess(false);
    }
    setErrorMsg("");
    setSucess(true);
  }

  return (
    <div className="form-div">
      <form>
        <h3>Sign In</h3>
        {/* <div className="form-control">
          <label>
            Full Name :
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
              placeholder="John Doe"
              value={name}
            ></input>
          </label>
        </div> */}
        <div className="form-control">
          <label>Your email:</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="john@test.com"
            value={email}
          ></input>
        </div>
        <div className="form-control">
          <label>
            Password:
            <input
              type="password"
              onChange={validatePassword}
              placeholder="8 characters required"
              value={password}
            ></input>
          </label>
          <p>{passwordErrorMsg}</p>
        </div>

        {/* <div  className="form-control">
            <label>Password:
                <input type="password" onChange={(event) => setPassword(event.target.value)} placeholder="8 characters required"></input>
            </label>
            </div> */}

        {/* <div className="form-control">
                            <input type="File" onChange={fileHandler}></input>
                            <button style={{ marginLeft: "30px" }} onClick={validateFile}>Upload</button>

                            <div className="form-control">
                                <div className="space-between">
                                    <p>Min size:1MB</p>
                                    <p>Max size:5MB</p>
                                </div>

                                {success ? <p style={{ color: "blue" }}>Image Uploaded</p> :
                                    <p style={{ marginBottom: "30px", color: "red" }}>{errorMsg}</p>

                                }
                            </div>
                        </div> */}

        <div className="form-control" style={{ paddingTop: "20px" }}>
          <button type="submit" onClick={onClickHandler}>
            Log In
          </button>
          {/* <p style={{ fontSize: "12px" }}>I accept the terms and conditions</p> */}
        </div>

        {/* <p onClick={onClickLink}>Already Registered <span style={{ color: "blue", fontWeight: "bold" }}>Login here</span></p> */}

        {flag && <h5 style={{ color: "red" }}>Please add all details</h5>}
      </form>
    </div>
  );
}
