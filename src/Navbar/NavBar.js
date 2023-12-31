import React from 'react'
import {Link} from 'react-router-dom'
import "../Navbar/NavBar.css";
const NavBar = () => {
  return (
    <div className="myNavBar">
      <ul class="myNavUl">
        <li class="mynavitem">
          <Link className="a" to="/home">
            Details
          </Link>
        </li>

        <li class="mynavitem">
          <Link className="a" to="/addexpense">
            AddExpense
          </Link>
        </li>
        <li class="mynavitem">
          <Link className="a" to="/filter">
            Filter Expense
          </Link>
        </li>

        <li class="mynavitem">
          <Link className="a" to="/logout">
            Logout
          </Link>
        </li>

        <li class="mynavitem">
          <Link className="a" to="/signup">
            SignUp
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar
