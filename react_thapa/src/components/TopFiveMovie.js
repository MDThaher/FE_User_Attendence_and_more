import React from "react";
import "../componentscss/TopFiveMovie.css";


export default function TopFiveMovie(prop) {
  return (
    <>
      <div className="containerTop box">
      <div className="img">
        <img src={prop.imgsrc} alt="tet" />
      </div>
      <div className="bodyText">
        <h4>{prop.heading}</h4>
        <h3>{prop.name}</h3>
        <a href={prop.movlivk} target="_blank">
        <button> Watch Now</button>
        </a> 
      </div>
    </div>
    </>
  )
}

