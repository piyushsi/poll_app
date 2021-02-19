import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Signup(props) {
  const { handleLogin, handleLogout } = props;
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
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
    Axios.post("/users", { user }, { withCredentials: true })
      .then((response) => {
        console.log(response);
        if (response.data.status === "created") {
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


  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          placeholder="email"
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <input
          placeholder="password confirmation"
          type="password"
          name="password_confirmation"
          value={user.password_confirmation}
          onChange={handleChange}
        />

        <button placeholder="submit" type="submit">
          Sign Up
        </button>
      </form>
      {errors ? (
        <div>
          <ul>
            {errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
