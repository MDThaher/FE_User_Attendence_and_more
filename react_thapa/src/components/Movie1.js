import React from "react";
import TopFiveMovie from "./TopFiveMovie";
import data from "../netimg/img";

export default function Movie1() {
  return (
    <>
      <TopFiveMovie
        key={data[1].key}
        name={data[1].name}
        imgsrc={data[1].imgsrc}
        heading={data[1].heading}
        movlivk={data[1].movlivk}
      />
    </>
  );
}
