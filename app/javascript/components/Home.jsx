import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function Home(props) {
  const { user, isLoggedIn, handleLogout } = props;
  const [allPoll, setAllPoll] = useState(null);

  const getAllPoll = () => {
    Axios.post("/poll_list")
      .then((response) => {
        setAllPoll(response.data.polls);
      })
      .catch((error) => console.log("api errors:", error));
  };
  useEffect(() => getAllPoll(), []);
  return (
    <div>
      <h1>Poll App</h1>
      {isLoggedIn ? (
        <button onClick={() => handleLogout()}>Logout</button>
      ) : (
        <div>
          <Link to="/login">Log In</Link>
          <br></br>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <br />
      <h2>All Poll</h2>
      <ul>
        {allPoll?.map((a) => {
          return (
            <>
              <li>{a.question}</li>
              <Link to={`/poll/${a.id}`}>open</Link>
            </>
          );
        })}
      </ul>
    </div>
  );
}
