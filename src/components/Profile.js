import React, { useContext, useRef } from "react";
import classes from "./Profile.module.css";
import AuthContext from "../store/auth-context";

const Profile = () => {
  const enteredFullNameInputRef = useRef();
  const enteredPhotoUrlInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const fullName = enteredFullNameInputRef.current.value;
    const photoURL = enteredPhotoUrlInputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBvar-s74g5hqBR2193rvUrs76CPBPnbDc",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            displayName: fullName,
            photoUrl: photoURL,
            returnSecureToken: true,
          }),
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

  return (
    <section>
      <form className={classes.profile} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="fullname">Full Name: </label>
          <input type="text" ref={enteredFullNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="fullname">Profile Photo Url: </label>
          <input type="text" ref={enteredPhotoUrlInputRef} />
        </div>
        <div className={classes.actions}>
          <button type="submit">Update</button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
