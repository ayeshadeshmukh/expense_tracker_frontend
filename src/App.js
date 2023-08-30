
import './App.css';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn'
import AddExpense from './Components/AddExpense'
import Nav from './Navbar/NavBar'
import Home from './Components/Home'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <Nav>hello</Nav>
            
          <Routes>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="/signin" element={<SignIn></SignIn>}></Route>
            <Route
              path="/addexpense"
              element={<AddExpense></AddExpense>}
            ></Route>
          </Routes>

      </div>
    </>
  );
}

export default App;
