import React from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className={classes.home}>
      <h2>Welcome to Expense Tracker App!</h2>
      <h4>
        Your Profile is Incomplete <a href="/profile">Complete now</a>
      </h4>
    </section>
  );
};

export default Home;
