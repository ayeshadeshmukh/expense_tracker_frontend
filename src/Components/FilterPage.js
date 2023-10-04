import React, { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Chart from "react-google-charts";
import { useNavigate } from "react-router-dom";

const FilterPage = () => {
  const navigate = useNavigate();
  const [expenses, setexpenses] = useState([]);
  const [categoryexpense, setcategoryexpense] = useState(false);
  const [totalexpense, settotalexpense] = useState();
  const [month, setmonth] = useState("JANUARY");
  const [year, setyear] = useState(2021);
  const [pieData, setpieData] = useState([]);
  let token;

  try {
    token = JSON.parse(localStorage.getItem("userinfo")).token;
  } catch {
    token = "";
  }

  let config = {
    headers: {
      token: token,
    },
  };

  const SubmitHandler = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    console.log("Everything is ok");
    console.log(month, year)
    // Perform your form processing here
    getdetails();
    getTotalExpense();
    getCategoryExpense();
  };


  const getdetails = () => {
    axios
      .get(
        `http://localhost:805/user/getexpenses?month=${month}&year=${year}`,
        config
      )
      .then((response) => {
        console.log(response.data); // This contains the response data // response.data here has result array as sent in backend
        const { result } = response.data;
        console.log("get details");
        setexpenses(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getTotalExpense = () => {
    axios
      .get(
        `http://localhost:805/user/totalexpense?month=${month}&year=${year}`,
        config
      )
      .then((response) => {
        console.log(response.data);

        const { totalexpense } = response.data; // here i am destructuring the total expense as it it in form of array from the server
        settotalexpense(totalexpense);
      });
  };

  const getCategoryExpense = () => {
    axios
      .get(
        `http://localhost:805/user/categoryexpense?month=${month}&year=${year}`,
        config
      )
      .then((response) => {
        console.log(response.data);

        const { categoryexpense } = response.data;
        let data = [];
        let pydata = [["Category", "Expense per month"]];
        for (let i = 0; i < categoryexpense.length; i++) {
          data = [];
          data.push(categoryexpense[i].category);

          data.push(categoryexpense[i]["SUM(price)"]);

          pydata.push(data);
        }
        console.log(data);
        setpieData(pydata);
        // console.log(pieDacta)
        setcategoryexpense(true);

        // setcategoryexpense(categoryexpense);
      });
  };

  //just as the home.js page gets render the code comes inside useeffect whatever we do in useeffect gets render
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userinfo"));
    if (userInfo == null) {
      alert("login first to get informations");
      navigate("/signin");
    }

    
    // eslint-disable-next-line

    // settotalexpense(2546)
    // console.log("in use effect")
  }, []);

  // var pieData = [
  //   ["Task", "Hours per Day"],

  // ];

  const pieOptions = {
    title: "My Monthly Expenses",
    pieHole: 0.2,
  };

  return (
    <div className="container">
      <form className="container" onSubmit={SubmitHandler}>
        <div class="form-group">
          <label for="Category">Select Yaer</label>
          <select
            class="form-control"
            value={year}
            onChange={(event) => {
              setyear(event.target.value);
            }}
          >
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
        </div>

        <div class="form-group">
          <label for="Category">Select Month</label>
          <select
            class="form-control"
            value={month}
            onChange={(event) => {
              setmonth(event.target.value);
            }}
          >
            <option value={1}>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option value={"10"}>10</option>
            <option>11</option>
            <option>12</option>
          </select>
        </div>

        <div>
          <button class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      <div className="container ">
        {/* <h2>React Donut Chart Example</h2> */}
        {categoryexpense && (
          <Chart
            width={"600px"}
            height={"320px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={pieData}
            options={pieOptions}
            rootProps={{ "data-testid": "3" }}
          />
        )}
      </div>

      <h3>Total expense {totalexpense} </h3>

      <DataTable value={expenses} tableStyle={{ minWidth: "50rem" }}>
        <Column field="description" header="Description"></Column>
        <Column field="price" header="Price"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="notes" header="Notes"></Column>
        <Column field="date" header="Date"></Column>
      </DataTable>
    </div>
  );
};

export default FilterPage;
