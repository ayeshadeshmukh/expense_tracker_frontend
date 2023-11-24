import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const SignUp = () => {

  let navigate = useNavigate();
   const [name, setname] = useState()
   const [phone, setphone] = useState()
   const [email, setemail] = useState()
   const [password, setpassword] = useState()
   const [cpassword, setcpassword] = useState()
   const [isSignedUp, setisSignedUp] = useState(false)


   const onsubmit = (event)=>{
    event.preventDefault()


  let url = `http://${process.env.REACT_APP_SERVER}:805/user/signup`;
    let data = {
      'name' : name,
      'phone' : phone,
      'email' : email,
      'password' : password,
      'cpassword': cpassword
    }
     if(password===cpassword){

      axios.post(url,data).then((response)=>{
        console.log(response.data)
          
        if (response.data.message == "Successful") {
          setisSignedUp(true);
          setTimeout(() => {
            setisSignedUp(false);
            navigate("/signin");
          }, 3000);
        }


        
        
      });
     }

     else{
      alert("Password doesnot match")
     }

    }

   





  return (
     

    <div>
      {isSignedUp && 
        <div class="alert alert-success" role="alert">
        You are successfully signed up.
        </div>
        }
       <form className="container"
       onSubmit = {onsubmit}
       >
        
        <div class="form-group">
          <label for="name">Name:-</label>
          <input
          onChange={(ayesha)=>{setname(ayesha.target.value)}}
            type="name"
            class="form-control"
            id="entername"
            aria-describedby="name"
            placeholder="Please enter your name"
          />
        </div>

        <div class="form-group">
          <label for="Phone">Phone Number:-</label>
          <input
          onChange={(ayesha)=>{setphone(ayesha.target.value)}}
            type="phone"
            class="form-control"
            id="enterphone"
            aria-describedby="phone"
            placeholder="Please enter your phone number"
          />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
          onChange={(ayesha)=>{setemail(ayesha.target.value)}}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
          onChange={(ayesha)=>{setpassword(ayesha.target.value)}}


          
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <div class="form-group">
          <label for="exampleInputPassword2">Confirm Password</label>
          <input
          onChange={(event)=>{setcpassword(event.target.value)}}
            type="password"
            class="form-control"
            id="exampleInputPassword2"
            placeholder="Please enter the password again"
          />
        </div>

        
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
   
  )
}

export default SignUp
