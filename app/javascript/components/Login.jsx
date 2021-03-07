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

  return (
    <div>
      <div class="container mx-auto p-8 flex">
        <div class="max-w-md w-full mx-auto">
          <h1 class="text-4xl text-center mb-12 font-thin">Login</h1>
          <form onSubmit={handleSubmit}>
            <div class="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div class="p-8">
                <div class="mb-5">
                  <label for="username" class="block mb-2 text-sm font-medium text-gray-600">username</label>

                  <input type="text" name="username" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={user.username}
                    onChange={handleChange} />
                </div>

                <div class="mb-5">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-600">Password</label>

                  <input type="password" name="password" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={user.password}
                    onChange={handleChange} />
                </div>
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

                <button type="submit" class="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">Login</button>
              </div>

              <div class="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
                <Link to="/signup" class="font-medium text-indigo-500">Create account</Link>

                {/* <a href="#" class="text-gray-600">Forgot password?</a> */}
              </div>
            </div>
          </form>
        </div>
      </div>


    </div>
  );
}
