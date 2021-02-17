import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

export default function Login(props) {
  const { handleLogin, handleLogout } = props;
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("/login", { user }, { withCredentials: true })
      .then((response) => {
        console.log(response);
        if (response.data.logged_in) {
          handleLogin(response.data);
          redirect();
        } else {
          setErrors(response.data.errors);
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  const redirect = () => {
    history.push("/");
  };

  const handleErrors = () => {
    return (
      <div>
        <ul>
          {errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />

        <input
          placeholder="password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button placeholder="submit" type="submit">
          Log In
        </button>
        <div>
          or <Link to="/signup">sign up</Link>
        </div>
      </form>
    </div>
  );
}
