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
      <div className="bg-indigo-100 py-6 md:py-12">
        <div className="container px-4 mx-auto">

          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium mb-2">Poll app.</h1>

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

        </div>
      </div>

    </div>
  );
}
