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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("/poll", { poll })
      .then((response) => {
        getAllPoll();
      })
      .catch((error) => console.log("api errors:", error));
  };

  const redirect = () => {
    history.push("/");
  };
  const getAllPoll = () => {
    Axios.post("/poll_list")
      .then((response) => {
        setAllPoll(response.data.polls);
      })
      .catch((error) => console.log("api errors:", error));
  };
  useEffect(() => getAllPoll(), []);
  console.log(allPoll);
  return (
    <div>
      <h1>Add Poll</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="question"
          type="text"
          name="question"
          value={data.question}
          onChange={handleChange}
        />
        <input
          placeholder="option 1"
          type="text"
          name="option_1"
          value={data.option_1}
          onChange={handleChange}
        />
        <input
          placeholder="option 2"
          type="text"
          name="option_2"
          value={data.option_2}
          onChange={handleChange}
        />
        <input
          placeholder="option 3"
          type="text"
          name="option_3"
          value={data.option_3}
          onChange={handleChange}
        />
        <input
          placeholder="option 4"
          type="text"
          name="option_4"
          value={data.option_4}
          onChange={handleChange}
        />

        <button placeholder="submit" type="submit">
          Add Poll
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
      <h2>All Poll</h2>
      <ul>
        {allPoll
          ? allPoll.map((a) => {
              return (
                <>
                  <li>{a.question}</li>
                  <Link to={`/poll/${a.id}`}>open</Link>
                </>
              );
            })
          : ""}
      </ul>
    </div>
  );
}
