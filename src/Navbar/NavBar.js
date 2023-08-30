import React from 'react'
import {Link} from 'react-router-dom'
const NavBar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <h6>Navbar</h6>
        {/* <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button> */}

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link to="/home">Home</Link>
            </li>

            <li class="nav-item">
              <Link to="/signup">SignUp</Link>
            </li>

            <li class="nav-item">
              <Link to="/signin">SignIn</Link>
            </li>

            <li class="nav-item">
              <Link to="/addexpense">AddExpense</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar
