import React, { useEffect }  from "react";
import TopFiveMovie from './TopFiveMovie'
import data from '../netimg/img'
import { useNavigate,useLocation } from "react-router-dom";



  
  



export default function ListofMovie() {
  const nav = useNavigate();
  const location = useLocation()
  console.log(location,'kk');


  // useEffect(() => {
  //   if( dta === null){
  //     nav("/")
  //   }
  // }) 



  return (
    <>


      {data.map((prp) => {
        return (
          <TopFiveMovie
            key={prp.key}
            name={prp.name}
            imgsrc={prp.imgsrc}
            heading={prp.heading}
            movlivk={prp.movlivk}
          />
        );
      })}
      
      <p>{location.state.name}</p>

    </>
  );


  
}
