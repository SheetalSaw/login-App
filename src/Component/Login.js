import React, { useEffect, useState } from 'react';
import "../Component/Home";
import Home from '../Component/Home';
import "./login.css";

function Login() {

    const [emailLog, setEmaillog] = useState("");
    const [passwordLog, setPasswordlog] = useState("");
    const [loginflag, setLoginFlag] = useState(false);
    const [home, setHome] = useState(true);
    const [matchError, setMatchError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://random-data-api.com/api/users/random_user?size=30`);
            const newData = await response.json();
            console.log(newData)
          };
        
          fetchData();
    },[]);


    function handleLogin(e) {
        e.preventDefault();
        let Mail = localStorage.getItem("allInputs");
        
        console.log(Mail)
        
        let mapMail = JSON.parse(window.localStorage.getItem('allInputs')).map((item) => (item.email))
        let passwordMap =  JSON.parse(window.localStorage.getItem('allInputs')).map((item) => item.password);
        let id = JSON.parse(window.localStorage.getItem("allInputs")).map((item) => item.id);
        
        let obj = JSON.parse(window.localStorage.getItem('allInputs')).map((item) => item);

        console.log(mapMail)
        console.log(passwordMap)
        console.log(id)
        console.log(obj)
        // const allMail = mapMail.map
        // console.log(allMail)
        const mailEle = mapMail.find((ele) => {
            return ele === emailLog;
        })
        const passwordEle = passwordMap.find((ele)=> {
            return passwordLog === ele
        })

        //  .replace(/"/g,"");.

        console.log(mailEle);
        console.log(emailLog);
        console.log(passwordLog);
        console.log(passwordEle);

        if (!emailLog || !passwordLog) {
            setLoginFlag(true);
            console.log("empty");
            setMatchError("Please add all details")
        }
        else if (passwordLog !== passwordEle) {
            setLoginFlag(true);
            console.log("2nd condition");
            setMatchError("Email or password does not match")
        }
        // else if(id[0] === ){

        // }

        else { 
            const smth  = obj.filter((item) => item.email === emailLog );
            console.log(smth)
            
            localStorage.setItem("emailLog", JSON.stringify(smth))
            setHome(!home);
            setLoginFlag(false);
            console.log("3rd condition")

        }
    }

    return (
        <div>

            {home ? (
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <div className="form-control">
                        <label>Your email:</label>
                        <input type="email" onChange={(event) => setEmaillog(event.target.value)} placeholder="add email"></input>
                    </div>
                    <div className="form-control">
                        <label>Password:
                            <input type="password" onChange={(event) => setPasswordlog(event.target.value)} placeholder="8 characters required"></input>
                        </label>
                    </div>
                    <div className="form-control">
                        <button type="submit" >Login</button>
                    </div>

                    {loginflag && (
                        <h5 style={{ color: "red" }}>{matchError}</h5>
                    )}
                </form>) : (
                <Home />
            )}
        </div>

    )
}


export default Login

