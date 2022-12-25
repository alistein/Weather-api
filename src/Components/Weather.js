/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const Weather = (props) => {

  return (
    <>
    {props.data.condition &&
      <div style={{ marginLeft: "50%", textAlign: "center" }}>
      <img src={`http://openweathermap.org/img/w/${props.data.icon}.png`} />
        <h4 className="text-dark" style={{ marginTop: "auto" }}>
          {props.data.city}, {props.data.country}
        </h4>
        <h5 className="text-secondary">
          Temperature: {props.data.temperature}°C
        </h5>
        <h5 className="text-secondary">Weather: {props.data.condition}</h5>
      </div>
}
    </>
  );
};

export default Weather;
