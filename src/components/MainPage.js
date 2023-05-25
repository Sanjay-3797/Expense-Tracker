import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./MainPage.module.css";

const MainPage = () => {
  const enteredTitleRef = useRef();
  const enteredAmountRef = useRef();
  const enteredCategoryRef = useRef();
  const [expenseList, setExpenseList] = useState([]);

  const fetchingExpenseData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-48ec2-default-rtdb.firebaseio.com/expenseData.json"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchingExpenseData();
  }, [fetchingExpenseData]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const title = enteredTitleRef.current.value;
    const amount = enteredAmountRef.current.value;
    const category = enteredCategoryRef.current.value;

    const expenseList = {
      title: title,
      amount: amount,
      category: category,
    };

    try {
      const response = await fetch(
        "https://expense-tracker-48ec2-default-rtdb.firebaseio.com/expenseData.json",
        {
          method: "POST",
          body: JSON.stringify(expenseList),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setExpenseList((prevData) => {
      return [...prevData, expenseList];
    });
  };

  return (
    <React.Fragment>
      <section className={classes.main}>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="title">Title:</label>
            <input type="text" ref={enteredTitleRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="amount">Amount:</label>
            <input type="number" ref={enteredAmountRef} />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select ref={enteredCategoryRef}>
              <option value="">-- Select a Category --</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className={classes.actions}>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      </section>
      {expenseList.length && (
        <section className={classes.main}>
          {expenseList.map((expense) => (
            <li key={expense.title}>
              Added {expense.title} of {expense.amount} Rs to {expense.category}{" "}
              Category
            </li>
          ))}
        </section>
      )}
    </React.Fragment>
  );
};

export default MainPage;
