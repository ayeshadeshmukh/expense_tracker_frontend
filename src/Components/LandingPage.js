import React from "react";
import "../landingpage.css";
import portfolioImage from "../portfolio.jpg";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  let navigate = useNavigate();
  return (
    <>
      <header className="hero">
        {" "}
        <div className="hero-text">
          <h1>
            Take control of your finances with our expense tracker management
            software.
          </h1>
          <p>
            Easily track your spending, create budgets, and identify areas where
            you can save money.
          </p>
          <button
            className="mybtn"
            id="btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up for Free
          </button>

          <button
            className="mybtn"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign in
          </button>
        </div>
        <div className="image">
          <img src={portfolioImage} alt="Hero image" className="hero-image" />
        </div>
      </header>
    </>
  );
};

export default LandingPage;
