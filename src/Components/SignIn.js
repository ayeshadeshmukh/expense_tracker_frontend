import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [isUserNotRegistered, setisUserNotRegistered] = useState(false);
  const [doesUserExist, setdoesUserExist] = useState(false);

  let navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(email, password);

    let url = "http://localhost:805/user/signin";
    let data = {
      email: email,
      password: password,
    };

    axios.post(url, data).then((response) => {
      console.log(response.data);

      if (response.data.error) {
        setisUserNotRegistered(true);
        setTimeout(() => {
          setisUserNotRegistered(false);
        }, 2000);

        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      }
       else if(response.data.email ){
        setdoesUserExist(true);
           localStorage.setItem("userinfo", JSON.stringify(response.data));
          setTimeout(() => {
            setdoesUserExist(false);
            navigate('/home')
          }, 2000);



       }
      
    });
  };

  return (
    <div className="container">
      {isUserNotRegistered && (
        <div class="alert alert-danger" role="alert">
          User does not exist! Please sign up first
        </div>
      )}
      {doesUserExist && 
        <div class="alert alert-success" role="alert">
         Welcome Back!!! You are successfully logged in.
        </div>
      }
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
};

export default SignIn;
