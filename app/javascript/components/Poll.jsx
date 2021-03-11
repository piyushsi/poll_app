import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

export default function Signup(props) {
  const { handleLogin, handleLogout } = props;
  const history = useHistory();
  const [data, setData] = useState({
    question: "",
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
  });

  const poll = {
    question: data.question,
    options_attributes: [
      { name: data.option_1 },
      { name: data.option_2 },
      { name: data.option_3 },
      { name: data.option_4 },
    ],
  };

  const [errors, setErrors] = useState("");
  const [allPoll, setAllPoll] = useState(null);
  const [loading, setLoader] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => { 
    setLoader(true)
    console.log(poll)
    event.preventDefault();
    Axios.post("/poll", { poll })
      .then((response) => {
        setData({
          question: "",
          option_1: "",
          option_2: "",
          option_3: "",
          option_4: "",
        })
        getAllPoll();
      })
      .catch((error) => console.log("api errors:", error));
  };

  const redirect = () => {
    history.push("/");
  };
  const getAllPoll = () => {
    setLoader(true)
    Axios.post("/poll_list")
      .then((response) => {
        setAllPoll(response.data.polls);
        setLoader(false)
      })
      .catch((error) => {
        console.log("api errors:", error);
        setLoader(false)
      });
  };
  useEffect(() => getAllPoll(), []);
  console.log(allPoll);
  return (
    <div>
      <div class="container mx-auto p-8 flex">
        <div class="max-w-md w-full mx-auto">
          <h1 class="text-4xl text-center mb-12 font-thin">Add Poll</h1>
          <form onSubmit={handleSubmit}>
            <div class="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div class="p-8">
                <div class="mb-5">
                  <label for="question" class="block mb-2 text-sm font-medium text-gray-600">Poll Name</label>

                  <input required type="text" name="question" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={data.question}
                    onChange={handleChange} />
                </div>

                <div class="mb-4">
                  <label for="option_1" class="block mb-2 text-sm font-medium text-gray-600">Option 1</label>

                  <input required type="text" name="option_1" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={data.option_1}
                    onChange={handleChange} />
                </div>

                <div class="mb-4">
                  <label for="option_2" class="block mb-2 text-sm font-medium text-gray-600">Option 2</label>

                  <input required type="text" name="option_2" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={data.option_2}
                    onChange={handleChange} />
                </div>

                <div class="mb-4">
                  <label for="option_3" class="block mb-2 text-sm font-medium text-gray-600">Option 3</label>

                  <input required type="text" name="option_3" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={data.option_3}
                    onChange={handleChange} />
                </div>

                <div class="mb-4">
                  <label for="option_4" class="block mb-2 text-sm font-medium text-gray-600">Option 4</label>

                  <input required type="text" name="option_4" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" value={data.option_4}
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

                {loading ? <div class="loading"></div> : <button type="submit" class="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">Add</button>}
              </div>


            </div>
          </form>
        </div>
      </div>

      <div class="m-3">
        <h1 className="text-3xl md:text-4xl font-medium mb-2">All Polls</h1>

        <ul class="w-full rounded-lg mt-2 mb-3 text-blue-800">
          {allPoll?.map((a) => {
            return (
              <>
                <li class="mb-1">
                  <Link to={`/poll/${a.id}`}>
                    <a href="#" class="w-fill flex p-3 pl-3 bg-gray-100 hover:bg-gray-200 rounded-lg">
                      <img class="flex-none w-6 h-full" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDM4LjUzNiA0MzguNTM2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MzguNTM2IDQzOC41MzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzIyLjYyMSw0Mi44MjVDMjk0LjA3MywxNC4yNzIsMjU5LjYxOSwwLDIxOS4yNjgsMGMtNDAuMzUzLDAtNzQuODAzLDE0LjI3NS0xMDMuMzUzLDQyLjgyNSAgIGMtMjguNTQ5LDI4LjU0OS00Mi44MjUsNjMtNDIuODI1LDEwMy4zNTNjMCwyMC43NDksMy4xNCwzNy43ODIsOS40MTksNTEuMTA2bDEwNC4yMSwyMjAuOTg2ICAgYzIuODU2LDYuMjc2LDcuMjgzLDExLjIyNSwxMy4yNzgsMTQuODM4YzUuOTk2LDMuNjE3LDEyLjQxOSw1LjQyOCwxOS4yNzMsNS40MjhjNi44NTIsMCwxMy4yNzgtMS44MTEsMTkuMjczLTUuNDI4ICAgYzUuOTk2LTMuNjEzLDEwLjUxMy04LjU2MiwxMy41NTktMTQuODM4bDEwMy45MTgtMjIwLjk4NmM2LjI4Mi0xMy4zMjQsOS40MjQtMzAuMzU4LDkuNDI0LTUxLjEwNiAgIEMzNjUuNDQ5LDEwNS44MjUsMzUxLjE3Niw3MS4zNzgsMzIyLjYyMSw0Mi44MjV6IE0yNzAuOTQyLDE5Ny44NTVjLTE0LjI3MywxNC4yNzItMzEuNDk3LDIxLjQxMS01MS42NzQsMjEuNDExICAgcy0zNy40MDEtNy4xMzktNTEuNjc4LTIxLjQxMWMtMTQuMjc1LTE0LjI3Ny0yMS40MTQtMzEuNTAxLTIxLjQxNC01MS42NzhjMC0yMC4xNzUsNy4xMzktMzcuNDAyLDIxLjQxNC01MS42NzUgICBjMTQuMjc3LTE0LjI3NSwzMS41MDQtMjEuNDE0LDUxLjY3OC0yMS40MTRjMjAuMTc3LDAsMzcuNDAxLDcuMTM5LDUxLjY3NCwyMS40MTRjMTQuMjc0LDE0LjI3MiwyMS40MTMsMzEuNSwyMS40MTMsNTEuNjc1ICAgQzI5Mi4zNTUsMTY2LjM1MiwyODUuMjE3LDE4My41NzUsMjcwLjk0MiwxOTcuODU1eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                      <span class="ml-2 truncate" title={a.question}>{a.question}</span>
                    </a>
                  </Link>
                </li>

              </>
            );
          })}
        </ul>
      </div>


    </div>
  );
}
