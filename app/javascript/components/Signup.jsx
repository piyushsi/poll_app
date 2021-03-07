import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
      <div className="container mx-auto p-8 flex">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-thin">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div className="p-8">
                <div className="mb-5">
                  <label for="username" className="block mb-2 text-sm font-medium text-gray-600">username</label>

                  <input type="text" name="username" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={user.username}
                    onChange={handleChange} />
                </div>

                <div className="mb-5">
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-600">email</label>

                  <input type="email" name="email" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={user.email}
                    onChange={handleChange} />
                </div>

                <div className="mb-5">
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>

                  <input type="password" name="password" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={user.password}
                    onChange={handleChange} />
                </div>
                <div className="mb-5">
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-600">Password Confirmation</label>

                  <input type="password" name="password_confirmation" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={user.password_confirmation}
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

                <button type="submit" className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">Signup</button>
              </div>

              <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
                Already have Account? <Link to="/login" className="font-medium text-indigo-500">Login</Link>

                {/* <a href="#" className="text-gray-600">Forgot password?</a> */}
              </div>
            </div>
          </form>
        </div>
      </div>


    </div>
  );
}
