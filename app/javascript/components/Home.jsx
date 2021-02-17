import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function Home(props) {
  const { user } = props;
  return (
    <div>
      <h1>Poll App</h1>

      <Link to="/login">Log In</Link>
      <br></br>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
