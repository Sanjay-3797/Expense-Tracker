import React from "react";
import classes from "./MainPage.module.css";

const MainPage = () => {
  const submitHandler = () => {};

  return (
    <section>
      <form className={classes.main} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title:</label>
          <input type="text" />
        </div>
        <div className={classes.control}>
          <label htmlFor="amount">Amount:</label>
          <input type="number" />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <div className={classes.action}>
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </section>
  );
};

export default MainPage;
