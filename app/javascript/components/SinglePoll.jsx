import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function SinglePoll(props) {
  const history = useHistory();
  const { user, isLoggedIn, handleLogout } = props;
  const id = +props.match.params[0];
  const [data, setData] = useState(null);
  const [showVotes, setShowVotes] = useState(false)
  const [loading, setLoader] = useState(false)

  useEffect(() => {
    showVote();
  }, []);

  const showVote = () => {
    Axios.post(`/single_poll/${id}`)
      .then((response) => {
        setData(response.data);
        Axios.post('/isvoted', { poll_id: id }).then(response => {
          setShowVotes(response.data.success)
        })
      })
      .catch((error) => console.log("api errors:", error));

  }

  const handleVotes = (payload) => {
    user.id ?
      Axios.post(`/votes`, payload)
        .then((response) => {
          showVote();
        })
        .catch((error) => console.log("api errors:", error)) : history.push("/signup");

  }
  const totalVotesPercentage = (x) => {
    return x / data?.options.reduce((a, b) => {
      return a += b.vote_count
    }, 0) * 100
  }

  console.log(user)
  return (
    <div>
      <div className="bg-indigo-100 py-6 md:py-12">
        <div className="container px-4 mx-auto">

          <div className="text-center max-w-2xl mx-auto">

            <div class="m-3">
              <img class="w-6 h-full" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDM4LjUzNiA0MzguNTM2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MzguNTM2IDQzOC41MzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzIyLjYyMSw0Mi44MjVDMjk0LjA3MywxNC4yNzIsMjU5LjYxOSwwLDIxOS4yNjgsMGMtNDAuMzUzLDAtNzQuODAzLDE0LjI3NS0xMDMuMzUzLDQyLjgyNSAgIGMtMjguNTQ5LDI4LjU0OS00Mi44MjUsNjMtNDIuODI1LDEwMy4zNTNjMCwyMC43NDksMy4xNCwzNy43ODIsOS40MTksNTEuMTA2bDEwNC4yMSwyMjAuOTg2ICAgYzIuODU2LDYuMjc2LDcuMjgzLDExLjIyNSwxMy4yNzgsMTQuODM4YzUuOTk2LDMuNjE3LDEyLjQxOSw1LjQyOCwxOS4yNzMsNS40MjhjNi44NTIsMCwxMy4yNzgtMS44MTEsMTkuMjczLTUuNDI4ICAgYzUuOTk2LTMuNjEzLDEwLjUxMy04LjU2MiwxMy41NTktMTQuODM4bDEwMy45MTgtMjIwLjk4NmM2LjI4Mi0xMy4zMjQsOS40MjQtMzAuMzU4LDkuNDI0LTUxLjEwNiAgIEMzNjUuNDQ5LDEwNS44MjUsMzUxLjE3Niw3MS4zNzgsMzIyLjYyMSw0Mi44MjV6IE0yNzAuOTQyLDE5Ny44NTVjLTE0LjI3MywxNC4yNzItMzEuNDk3LDIxLjQxMS01MS42NzQsMjEuNDExICAgcy0zNy40MDEtNy4xMzktNTEuNjc4LTIxLjQxMWMtMTQuMjc1LTE0LjI3Ny0yMS40MTQtMzEuNTAxLTIxLjQxNC01MS42NzhjMC0yMC4xNzUsNy4xMzktMzcuNDAyLDIxLjQxNC01MS42NzUgICBjMTQuMjc3LTE0LjI3NSwzMS41MDQtMjEuNDE0LDUxLjY3OC0yMS40MTRjMjAuMTc3LDAsMzcuNDAxLDcuMTM5LDUxLjY3NCwyMS40MTRjMTQuMjc0LDE0LjI3MiwyMS40MTMsMzEuNSwyMS40MTMsNTEuNjc1ICAgQzI5Mi4zNTUsMTY2LjM1MiwyODUuMjE3LDE4My41NzUsMjcwLjk0MiwxOTcuODU1eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
              <h1 className="text-3xl md:text-4xl font-medium mb-2">{data?.poll.question}</h1>

              <ul class="w-full rounded-lg mt-2 mb-3 text-blue-800">
                {data?.options.map((a) => {
                  console.log(totalVotesPercentage(a.vote_count))
                  return (
                    <>
                      <li class="mb-1" >
                        <a style={{ position: 'relative' }}  class="w-fill flex p-3 pl-3 bg-gray-100 hover:bg-gray-200 rounded-lg" title={a.name}>{a.name}
                          {showVotes ? <span style={{ width: totalVotesPercentage(a.vote_count), backgroundColor: 'lightgreen', position: 'relative' }} class="ml-2 truncate"> </span> : <span style={{ backgroundColor: 'lightgreen', position: 'absolute', right: 0 }} onClick={() => handleVotes({ vote: { poll_id: data.poll.id, options_id: a.id, } })} class="ml-2 truncate">Vote </span>}
                        </a>
                      </li>

                    </>
                  );
                })}
              </ul>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
