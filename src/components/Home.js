import React from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className={classes.home}>
      <h3>Welcome to Expense Tracker App!</h3>
      <h6>
        Your Profile is Incomplete <Link to="/profile">Complete now</Link>
      </h6>
    </section>
  );
};

export default Home;
