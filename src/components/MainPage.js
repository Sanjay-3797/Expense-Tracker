import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./MainPage.module.css";

const MainPage = () => {
  const enteredTitleRef = useRef();
  const enteredAmountRef = useRef();
  const enteredCategoryRef = useRef();
  const [expenseList, setExpenseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchingExpenseData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://expense-tracker-48ec2-default-rtdb.firebaseio.com/expenseData.json"
      );
      const data = await response.json();

      let updatedExpenses = [];
      for (const key in data) {
        updatedExpenses.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
          category: data[key].category,
        });
      }
      setExpenseList(updatedExpenses);
      setIsLoading(false);
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
  };

  const deleteExpenseHandler = async (expenseId) => {
    try {
      const response = await fetch(
        `https://expense-tracker-48ec2-default-rtdb.firebaseio.com/expenseData/${expenseId}.json`,
        { method: "DELETE" }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editExpenseHandler = async (expenseId) => {
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
        `https://expense-tracker-48ec2-default-rtdb.firebaseio.com/expenseData/${expenseId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expenseList),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      {!isLoading && (
        <section className={classes.main}>
          {expenseList.map((expense) => (
            <div className={classes.actions} key={expense.id}>
              {expense.title} ---- {expense.amount} ---- {expense.category}
              <div className={classes.control}>
                <button
                  type="button"
                  onClick={() => {
                    editExpenseHandler(expense.id);
                  }}
                >
                  EDIT
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  deleteExpenseHandler(expense.id);
                }}
              >
                X
              </button>
            </div>
          ))}
        </section>
      )}
      {isLoading && (
        <section className={classes.main}>Fetching Expenses...</section>
      )}
    </React.Fragment>
  );
};

export default MainPage;
