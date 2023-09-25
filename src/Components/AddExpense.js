import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddExpense = () => {
  let navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [description, setdescription] = useState();
  const [price, setprice] = useState();
  const [category, setcategory] = useState("Food");
  const [notes, setnotes] = useState();
   const [ifUserNotExists, setifUserNotExists] = useState(false)
  const [ifExpenseAdded, setifExpenseAdded] = useState(false)

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const userinfo = localStorage.getItem("userinfo");
   
    if (userinfo == null) {
      setifUserNotExists(true) // if user is not login we should not allow then to add the expense
       setTimeout(() => {
        setifUserNotExists(false);
        navigate('/signin')
       }, 3000);
    } 
    else {
      const shouldSubmit = window.confirm(
        "Are you sure you want to submit this form?"
      );
      if (shouldSubmit) {
    
      //console.log("Submitted")
      const token = JSON.parse(localStorage.getItem("userinfo")).token;
      console.log(description, price, category, notes, date);
      var day = date.getDate();
      var month = date.getMonth()+1;
      var year = date.getFullYear();
      console.log(day, month, year);
     const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
       .toString()
       .padStart(2, "0")}`;

      let url = "http://localhost:805/user/addexpense";
      let data = {
        description: description,
        price: price,
        category: category,
        notes: notes,
        date: formattedDate,
      };
      let config = {
        headers: {
          token: token,
        },
      };
  

    axios.post(url, data,config).then((response) => {
      console.log(response.data)
       if(response.data.message){
        setifExpenseAdded(true);
        setTimeout(() => {
          setifExpenseAdded(false)
          setdescription("")
          setprice("")
          setcategory("")
          setnotes("")
        }, 2000);
            

       }
         
    });
  }
  }
  };


  return (
    <div>
      <form className="container" onSubmit={onSubmitHandler}>
        {ifUserNotExists && (
          <div class="alert alert-warning" role="alert">
            Please signin first!!!!
          </div>
        )}
        {ifExpenseAdded && (
          <div class="alert alert-success" role="alert">
            Expense added Successfully!!!!
          </div>
        )}
        <div class="form-group">
          <label for="Description">Description</label>
          <input
            onChange={(event) => {
              setdescription(event.target.value);
            }}
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            value={description}
            aria-describedby="emailHelp"
            // placeholder="Enter Price"
          />
        </div>
        <br></br>
        <div class="form-group">
          <label for="Price">Price</label>
          <input
            onChange={(event) => {
              setprice(event.target.value);
            }}
            type="number"
            class="form-control"
            id="exampleInputEmail1"
            value={price}
            aria-describedby="emailHelp"
            placeholder="Enter Price"
          />
        </div>
        <br></br>
        <div class="form-group">
          <label for="Category">Select Category</label>
          <select
            class="form-control"
            value={category}
            onChange={(event) => {
              setcategory(event.target.value);
            }}
          >
            <option>Food</option>
            <option>Travelling</option>
            <option>Education</option>
            <option>Clothes</option>
            <option>Groceries</option>
            <option>Others</option>
          </select>
        </div>
        <br></br>

        <div class="form-group">
          <label>Notes</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={notes}
            onChange={(event) => {
              setnotes(event.target.value);
            }}
          ></textarea>
        </div>

        <br></br>

        <div class="mb-3">
          <label>Calendar</label>
          <Calendar onChange={setDate} value={date} />
          Selected date: {date.toDateString()}
        </div>

        <br></br>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
          
};

export default AddExpense;
