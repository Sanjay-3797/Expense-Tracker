import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./MainPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/index";

const MainPage = () => {
  const enteredTitleRef = useRef();
  const enteredAmountRef = useRef();
  const enteredCategoryRef = useRef();
  const [expenseList, setExpenseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const premiumButton = useSelector((state) => state.premiumButton);
  const theme = useSelector((state) => state.theme);

  let blobArray = [];
  for (const key in expenseList) {
    blobArray.push(expenseList[key].title);
  }

  const blob = new Blob(blobArray, { type: "text/plain" });
  const blobHref = URL.createObjectURL(blob);

  let totalAmount = 0;
  for (const item of expenseList) {
    totalAmount = totalAmount + parseInt(item.amount);
  }
  if (totalAmount > 10000) {
    dispatch(authActions.activatePremium());
    localStorage.setItem("activatePremium", true);
  }

  const themeHandler = () => {
    dispatch(authActions.setTheme());
  };

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
      {premiumButton && (
        <button
          className={classes.theme}
          onClick={themeHandler}
          style={{
            backgroundColor: theme ? "white" : "black",
            color: theme ? "black" : "white",
          }}
        >
          {theme ? "Light Theme" : "Dark Theme"}
        </button>
      )}
      <section
        className={classes.main}
        style={{ backgroundColor: theme ? "black" : "#38015c" }}
      >
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
        <section
          className={classes.main}
          style={{ backgroundColor: theme ? "black" : "#38015c" }}
        >
          {premiumButton && (
            <a href={blobHref} download="Expenses.txt">
              Download Expenses
            </a>
          )}
          {/* <div className={classes.expenseTitle}>
            <row>Title</row>
            <row>Category</row>
            <row>Amount</row>
          </div> */}
          {expenseList.map((expense) => (
            <div className={classes.expense} key={expense.id}>
              <row>{expense.title}</row>
              <row>{expense.category}</row>
              <row>₹ {expense.amount}</row>
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
          <div className={classes.actions}>
            <span>Total Amount: {totalAmount}</span>
          </div>
        </section>
      )}
      {isLoading && (
        <section className={classes.main}>Fetching Expenses...</section>
      )}
    </React.Fragment>
  );
};

export default MainPage;
