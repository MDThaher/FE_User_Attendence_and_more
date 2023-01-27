import React from "react";
import TopFiveMovie from "./TopFiveMovie";
import data from "../netimg/img";

export default function Movie2() {
  return (
    <>
      <TopFiveMovie
        key={data[2].key}
        name={data[2].name}
        imgsrc={data[2].imgsrc}
        heading={data[2].heading}
        movlivk={data[2].movlivk}
      />
    </>
  );
}
