import React, { useState } from 'react';
import Login from './Login';

function Home(props) {

   const [homepage , setLoginpage] = useState(true);
   const [mailLog, setmaillog] = useState("");
  


  function logOutHandler(){
    console.log("trying to logout")

  //  let getItem = JSON.parse(window.localStorage.getItem('allInputs'))

  //   console.log(getItem);

  //  const index = getItem.findIndex(item => item.id !== id);
  //  console.log(index)
   
  //  if(index >= -1){
  //   getItem.splice(index,1)
  //  }

  let maillog = JSON.parse(window.localStorage.getItem("emailLog")).map((item) => item.email);
  console.log(maillog[0]) 

  let obj = JSON.parse(window.localStorage.getItem('allInputs')).map((item) => item);
  console.log(obj);

  const smth  = obj.filter((item) => item.email !== maillog[0] );
  console.log(smth)
  localStorage.setItem("allInputs", JSON.stringify(smth))


  
  //    const mailEle = getItem.find((ele) => {
  //     return ele !== mailLog;
  // })
  //   console.log(mailEle)

  //    localStorage.setItem("allInputs", JSON.stringify(mailEle));

    // let getItem = JSON.parse(window.localStorage.getItem('allInputs'))

    // getItem.splice(0,1);

    // localStorage.setItem("allInputs", JSON.stringify(getItem))

    //  localStorage.removeItem("allInputs")
     setLoginpage(!homepage)
  }

return(
    <>
    {homepage ?( 
    <div>
    <div>Login successfully</div>
    <button style={{marginTop:"50px"}} type="submit" onClick={logOutHandler}>Logout</button>
    </div>) :
    
    (<Login/>)}
 
    </>
  )
}

export default Home

  

