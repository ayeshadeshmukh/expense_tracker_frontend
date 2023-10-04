
import './App.css';
import './landingpage.css'
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn'
import AddExpense from './Components/AddExpense'
import Nav from './Navbar/NavBar'
import Home from './Components/Home'
import Logout from './Components/Logout';
import LandingPage from './Components/LandingPage';
import Complete from './Components/Complete'
import FilterPage from './Components/FilterPage';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <Nav>hello</Nav>

        <Routes>
        <Route path="/filter" element={<FilterPage></FilterPage>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/addexpense" element={<AddExpense></AddExpense>}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/complete" element={<Complete />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
