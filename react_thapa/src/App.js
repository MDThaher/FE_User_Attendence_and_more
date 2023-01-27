import React from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListofMovie from "./components/ListofMovie";
import UserDashboard from "./components/UserDashboard";





function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login prop/>}></Route>
          {/* <Route path="/ListofMovie" element={<ListofMovie/>}></Route> */}
          <Route path="userDashboard" element={<UserDashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
