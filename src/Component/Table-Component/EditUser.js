import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate  } from "react-router-dom";

function EditUser() {
  // const history = useHistory()
  const { state } = useLocation();
  const navigate = useNavigate();

  const finalData = state.data;
  console.log(finalData);

  const [user, setUser] = useState(state.data);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
 // console.log(user);

 // console.log(user.id);
  let [name, setName] = useState(user.first_name);
  let [email, setEmail] = useState(user.email);
  let [address, setAddress] = useState(user.address.state);
  let [city, setCity] = useState(state.data.address.city);
  let [employment_title, setEmployment_title] = useState(state.data.employment.title);
  let [subscription, setSubscerption] = useState(state.data.subscription.plan);
  let [status, setStatus] = useState(state.data.subscription.status);

   let [editedData, setEditedData] = useState([]);

  const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Changes saved Successfully");
    console.log(user);
    var existingEntries = JSON.parse(localStorage.getItem("allUsers"));
    console.log(existingEntries);
    // if (existingEntries == null) existingEntries = [];

    const thatUser = existingEntries.findIndex(
      (edituser) => edituser.id === user.id
    );

   // console.log(thatUser);

    if (thatUser !== -1) existingEntries[thatUser] = user;
   // console.log(existingEntries[thatUser]);
    console.log(existingEntries);

    // localStorage.setItem("testObject", JSON.stringify(testObject));
    // existingEntries.push(user);
    console.log(existingEntries, "existing entries");
    setEditedData(existingEntries);
    console.log(editedData);

    const page = 5;
    
    localStorage.setItem("allUsers", JSON.stringify(existingEntries));
    navigate("/dashboard", { state: { data : existingEntries } });

  };

  return (
    <div>
      <form>
        <h3>Edit following Details</h3>{" "}
        <input
          type="text"
          name="first_name"
          required="required"
          placeholder="Enter First Name"
          value={user.first_name}
          onChange={handleChange}
        />{" "}
        <input
          type="text"
          name="email"
          required="required"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
        />{" "}
      </form>
      <input
        type="text"
        name="address"
        required="required"
        placeholder="Enter Address"
        value={user.address.state}
        onChange={handleChange}
      />{" "}
      <input
        type="text"
        name="city"
        required="required"
        placeholder="Enter City"
        value={user.address.city}
        onChange={handleChange}
      />{" "}
      <input
        type="text"
        name="employment"
        required="required"
        placeholder="Enter Employment Title"
        value={user.employment.title}
        onChange={handleChange}
      />{" "}
      <input
        type="text"
        name="subscription"
        required="required"
        placeholder="Enter Subscription plan Type"
        value={user.subscription.plan}
        onChange={handleChange}
      />{" "}
      <input
        type="text"
        name="status"
        required="required"
        placeholder="Enter Status"
        value={user.subscription.status}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit Details</button>
      {/* <button
        onClick={(e) => {
          navigate("/dashboard", { state: { data: existingEntries } });
        }}
      >
        Go to Dashboard
      </button> */}
    </div>
  );
}

export default EditUser;
