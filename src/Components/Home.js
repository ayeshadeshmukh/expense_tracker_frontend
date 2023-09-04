import React, { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Chart from "react-google-charts";

const Home = () => {
  const [expenses, setexpenses] = useState([]);
  const [totalexpense, settotalexpense] = useState();
  const [categoryexpense, setcategoryexpense] = useState(false);
  const [pieData, setpieData] = useState([]);
const token = JSON.parse(localStorage.getItem("userinfo")).token;
  let config = {
    headers: {
      token: token,
    },
  };
  const getdetails = () => {
    axios.get("http://localhost:805/user/getexpenses",config)
      .then((response) => {
        console.log(response.data); // This contains the response data // response.data here has result array as sent in backend
        const { result } = response.data;
        setexpenses(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getTotalExpense = () => {
    axios.get("http://localhost:805/user/totalexpense").then((response) => {
      console.log(response.data);

      const { totalexpense } = response.data;  // here i am destructuring the total expense as it it in form of array from the server
      settotalexpense(totalexpense);
    });
  };

  const getCategoryExpense = () => {
    axios.get("http://localhost:805/user/categoryexpense").then((response) => {
      console.log(response.data);

      const { categoryexpense } = response.data;
      let data = [];
      let pydata = [["Category", "Expense per month"]];
      for (let i = 0; i < categoryexpense.length; i++) {
        data = []
        data.push(categoryexpense[i].category);

        data.push(categoryexpense[i]["SUM(price)"]);
  

        pydata.push(data)
        
      }
        console.log(data)
      setpieData(pydata);
      // console.log(pieDacta)
      setcategoryexpense(true);

      // setcategoryexpense(categoryexpense);
    });
  };

  //just as the home.js page gets render the code comes inside useeffect whatever we do in useeffect gets render
  useEffect(() => {
    getdetails();
    getTotalExpense();
    getCategoryExpense();
    console.log(pieData)
  }, []);


  // var pieData = [
  //   ["Task", "Hours per Day"],

  // ];

  const pieOptions = {
    title: "My Monthly Expenses",
    pieHole: 0.2,
  };

  return (
    <div className = "container">
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

export default Home;
