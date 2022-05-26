import React, { useRef } from "react";

export default function Weather() {
  let date = new Date().toLocaleDateString();
  let year = date.split("").splice(5, 4);
  let month = date.split("").splice(0, 2);
  let d = date.split("").splice(2, 2);
  if (month[1] == "/") {
    month = 0 + month[0];
  }
  if (d[1] == "/") {
    d = 0 + d[0];
  }
  let ref = useRef("");
  let mainDate = year.join("") + "-" + month + "-" + d.join("");
  const handelChange = (e) => {
    ref.current = e.target.value;
  };
  const handleClick = () => {
    const key = `e7d266b3de274da48d560528222605`
    let api  = `https://api.weatherapi.com/v1/astronomy.json?key=${key}&q=${ref.current.trim()}&dt=${mainDate}`
    console.log(api);
  };

  return (
    <div>
      <input type={"text"} placeholder="city" onChange={handelChange} />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}