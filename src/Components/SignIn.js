import React, { useState } from 'react'
import axios from 'axios'

const SignIn = () => {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()


  const submitHandler = (event) => {
    event.preventDefault();
    console.log(email,password);

     let url = "http://localhost:805/user/signin";
     let data = {
      email : email,
      password : password
     }


     axios.post(url,data).then((response)=>{
      console.log(response.data);

      localStorage.setItem('userinfo',JSON.stringify(response.data));


     })

  }




  return (
    <div className="container">
      <form className="container" onSubmit={submitHandler}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            onChange={(event) => {
              setemail(event.target.value);
            }}
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
            onChange={(event) => {
              setpassword(event.target.value);
            }}
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignIn
