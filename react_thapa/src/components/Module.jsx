import React from "react";
import {add, mul, dev, sub} from './Test';

export default function Module() {
  return(
    <>
    <h2>addition of 2 number {add(2,2)}</h2>
    <h2>subtraction of 2 number {sub(6,2)}</h2>
    <h2>multiplication of 2 number {mul(5,2)}</h2>
    <h2>division of 2 number {dev(5,3)}</h2>
    </>
  );
}
