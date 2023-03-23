import React, { useState, useEffect } from "react";

import './App.css';

const App = () => {
  const [name, setName] = useState("");
  const [preparation_time, setPreparationTime] = useState("");
  const [type, setType] = useState("");
  const [no_of_slices, setNoOfSlices] = useState("");
  const [diameter, setDiameter] = useState("");
  const [spiciness_scale, setSpicinessScale] = useState("");
  const [slices_of_bread, setSlicesOfBread] = useState("");
  const [result, setResult] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const data = {
      name,
      preparation_time,
      type,
    };
    if (type === "pizza") {
      data.no_of_slices = parseInt(no_of_slices);
      data.diameter = parseFloat(diameter);
    } else if (type === "soup") {
      data.spiciness_scale = parseInt(spiciness_scale);
    } else if (type === "sandwich") {
      data.slices_of_bread = parseInt(slices_of_bread);
    }
    const response = await fetch("https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.ok) {
      console.log(responseData);
      setResult(responseData);
    } else {
      setErrors(responseData);
    }
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div className="app">
    <h1>Dishes Project</h1>
    <form onSubmit={handleSubmit}>
      <div className="first">
      <div className="component">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} required />
      </div>
      <div className="component">
        <label htmlFor="preparation_time">Preparation Time:</label>
        <input type="text" placeholder="00:00:00" id="preparation_time" value={preparation_time} onChange={(event) => setPreparationTime(event.target.value)} required />
      </div>
      <div className="component">
        <label htmlFor="type">Type:</label>
        <select id="type" value={type} onChange={(event) => setType(event.target.value)} required>
          <option value="">Select a type</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
      </div>
      </div>
      {type === "pizza" && (
        <div className="first">
          <div className="component">
            <label htmlFor="no_of_slices">Number of Slices:</label>
            <input type="number" id="no_of_slices" value={no_of_slices} onChange={(event) => setNoOfSlices(event.target.value)} required />
          </div>
          <div className="component">
            <label htmlFor="diameter">Diameter (cm):</label>
            <input type="number" step="0.1" id="diameter" value={diameter} onChange={(event) => setDiameter(event.target.value)} required />
          </div>
        </div>
      )}
      {type === "soup" && (
        <div className="component">
          <label htmlFor="spiciness_scale">Spiciness Scale (1-10):</label>
          <input type="number" min="1" max="10" id="spiciness_scale" value={spiciness_scale} onChange={(event) => setSpicinessScale(event.target.value)} required />
        </div>
      )}
      {type === "sandwich" && (
        <div className="component">
          <label htmlFor="slices_of_bread">Slices of Bread:</label>
          <input type="number" id="slices_of_bread" value={slices_of_bread} onChange={(event) => setSlicesOfBread(event.target.value)} required />
        </div>
        )}
      <button type="submit">Submit</button>

      {Object.keys(errors).length > 0 ? (
        <div className="result">
          {Object.entries(errors).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </div>
      ) : Object.keys(result).length > 0 ? (
        <div className="result">
          <div>Name: {result.name}</div>
          <div>Preparation Time: {result.preparation_time}</div>
          <div>Type: {result.type}</div>
          {result.type === "pizza" && (
            <>
            <div>Number of Slices: {result.no_of_slices}</div>
            <div>Diameter: {result.diameter} cm</div>
            </>
          )}
          {result.type === "soup" && (
            <div>Spiciness Scale: {result.spiciness_scale}</div>
          )}
          {result.type === "sandwich" && (
            <div>Slices of Bread: {result.slices_of_bread}</div>
          )}
          <div>ID: {result.id}</div>
        </div>
      ): (
        <div className="result">
          Empty
        </div>
      )}
    </form>
    </div>
  );
};

export default App;