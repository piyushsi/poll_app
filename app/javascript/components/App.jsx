import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Poll from '../components/Poll'
import SinglePoll from '../components/SinglePoll'
import Axios from "axios";
import '../css/application.css'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
    // localStorage.setItem("user", JSON.stringify(data.user));
  };

  const handleLogout = () => {
    Axios.post("/logout")
    setIsLoggedIn(false);
    setUser({});
  };

  const loginStatus = () => {
    Axios.post("/logged_in", {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.logged_in) {
          handleLogin(response.data);
        } else {
          handleLogout();
        }
      })
      .catch((error) => console.log("api errors:", error));
  };
  useEffect(() => {
    loginStatus();
  }, []);

  const data = { handleLogin, handleLogout, user, isLoggedIn };
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} {...data} />}
        />
        <Route
          exact
          path="/poll"
          render={(props) => <Poll {...props} {...data} />}
        />
        <Route
          exact
          path="/poll/*"
          render={(props) => <SinglePoll {...props} {...data} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} {...data} />}
        />
        <Route
          exact
          path="/signup"
          render={(props) => <Signup {...props} {...data} />}
        />
      </Switch>
    </Router>
  );
}
