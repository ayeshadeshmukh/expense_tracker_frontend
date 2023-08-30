import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import  '../App.css'
import axios from'axios';

const AddExpense = () => {
const [date, setDate] = useState(new Date());
const [description, setdescription] = useState()
const [price, setprice] = useState()
const [category, setcategory] = useState("food")
const [notes, setnotes] = useState()


 const onSubmitHandler = (event)=>{
    console.log("Submitted")
    event.preventDefault()
    console.log(description,price,category,notes,date)
    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    console.log(day , month,year)


    let url = "http://localhost:805/user/addexpense";
    let data = {
      description : description,
      price : price,
      category : category,
      notes : notes,
      date : date
    }

    axios.post(url, data).then((response) => {
      console.log(response.data);
    });
 }


  return (
    <div>
      <form className="container"
      onSubmit = {onSubmitHandler}>
        <div class="form-group">
          <label for="Description">Description</label>
          <input
          onChange = {(event)=>{setdescription(event.target.value);}}
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            // placeholder="Enter Price"
          />
        </div>
        <br></br>
        <div class="form-group">
          <label for="Price">Price</label>
          <input
          onChange = {(event)=>{setprice(event.target.value);}}
            type="number"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Price"
          />
        </div>
        <br></br>
        <div class="form-group">
          <label for="Category">Select Category</label>
          <select class="form-control"
           onChange = {(event)=>{setcategory(event.target.value)}}
          
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
            onChange = {(event)=>{setnotes(event.target.value);}}
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
