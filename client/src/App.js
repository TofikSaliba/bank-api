import React from "react";
import { useState } from "react";
import { API } from "./api/api";
import "./app.css";

function App() {
  const [key, setKey] = useState("");

  const getKey = async () => {
    const { data } = await API.post("/getAPIKey");
    console.log(data);
    setKey(data.key);
  };

  return (
    <div className="mainContainer">
      <h2>Get an API key</h2>
      <button onClick={getKey}>Get Key</button>
      <div>{key}</div>
    </div>
  );
}

export default App;
