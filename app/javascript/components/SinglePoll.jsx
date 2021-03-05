import React, { useEffect, useState } from "react";
import Axios from "axios";
export default function SinglePoll(props) {
  const id = +props.match.params[0];
  const [data, setData] = useState(null);
  useEffect(() => {
    Axios.post(`/single_poll/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log("api errors:", error));
  }, []);
  return (
    <div>
      <h1>{data?.poll.question}</h1>
      <ul>
        {data?.options.map((e) => {
          return <li>{e.name}</li>;
        })}
      </ul>
    </div>
  );
}
