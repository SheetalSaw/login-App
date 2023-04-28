import React, { useEffect, useState } from "react";
import "../InitialAvtar/initialAvtar.css";


const InitialAvatar = ({ userName }) => {
  const [initial, setInitial] = useState("");
  useEffect(() => {
    let name = userName;
    let data = JSON.parse(localStorage.getItem("userObj"))

    let User = data.username;
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

    let initials = [User.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();

    setInitial(initials);
  });
  return (
    <div>
      <div className="initialAvtar">
        <span className="initialValue">{initial}</span>
      </div>
    </div>
  );
};

export default InitialAvatar;
