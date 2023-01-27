import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
// import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../componentscss/UserDashboardcss.css";

var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (dd < 10) {
      dd = "0" + dd;
    }
    var dateCurr = dd + "-" + mm + "-" + yy;



const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const today = weekday[new Date().getDay()];

export default function UserDashboard() {
  const location = useLocation();
  const [empName, setEmpName] = useState(location.state.name);
  const [empNames, setEmpNames] = useState(location.state.name);
  const [userRole, setUserRole] = useState(location.state.role);
  const [day, setDay] = useState(today);
  const [date, setDate] = useState(dateCurr);
  const [userStatus, setUserStatus] = useState("Present");
  const [myNameData,setMyNameData] = useState([]);
  const [mydata, setMyData] = useState([]);
  const [mydataadmin, setMyDataAdmin] = useState([]);
  const [btn, setBtn] = useState("submit");
  const [id, setId] = useState("");
  const [disableName , setDisableName] = useState(true);
  const navigate = useNavigate();



  const notifyAddNew = () => toast.success('🦄 data updated successfully!', {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

    const notifyDelete = () => toast.error('🦄 data deleted successfully!', {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });


  var getTableAll = `http://localhost:8080/getAllUsersAttendence`;
  async function getAll() {
    // You can await here
    const response = await axios.get(getTableAll);
    setMyDataAdmin(response.data);
    // ...
  }
  useEffect(() => {
    getAll();
  }, []); // Or [] if effect doesn't need props or state
  //
  //
  //
  //
  //
  var getTableName = `http://localhost:8080/getTableListByUsername/${empName}`;
  async function getName() {
    // You can await here
    const response = await axios.get(getTableName);
    setMyData(response.data);
    // ...
  }

  useEffect(() => {
    getName();
  }, []);
  
  // Or [] if effect doesn't need props or state
  //
  //
  //
  //
  //
  //

  var getOnlyName = `http://localhost:8080/GetUserNameList`;
  async function getNameList() {
    // You can await here
    const response = await axios.get(getOnlyName);
    setMyNameData(response.data);
    // ...
  }
  useEffect(() => {
    getNameList();
  }, []); // Or [] if effect doesn't need props or state
  //
  //
  //
  //
  //  to update status in database via POST in Axios
  //
  //
  //
  //
  //
  //  to update status in database via POST in Axios
  //
  //
  const getAllInput = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/addAttendence`, {
      userName: empNames,
      userRole: userRole,
      day: day,
      date: date,
      userStatus: userStatus,
    });
    // alert(`Status Updated successfully as ${userStatus} for ${empName}`);
    notifyAddNew()
    getAll();
    getName();

  };
  //
  //
  //
  //
  //
  //on click delete event
  const getCurrEmpDel = async (e) => {
    e.preventDefault();
    if (e.target.name === "delete") {
      var deleteUserURL = `http://localhost:8080/getDeleteByID/${e.target.id}`;
      await axios.delete(deleteUserURL);
    }
    notifyDelete();
    getAll();
  };
  //
  //
  //
  //
  //
  //  on click update event

  const getCurrEmpUpd = async (e) => {
    e.preventDefault();
    if (e.target.name === "update") {
      var singleUser = await axios.get(
        `http://localhost:8080/getUserByID/${e.target.id}`
      );
      setId(singleUser.data.id);
      setEmpNames(singleUser.data.userName);
      setEmpName(singleUser.data.userName);
      setUserRole(singleUser.data.userRole);
      setDay(singleUser.data.day);
      var revDate = "" + singleUser.data.date;
      setDate(revDate);
      setUserStatus(singleUser.data.userStatus);
    }
    setBtn("update");
    setDisableName(true)
    getName();
  };

  const updateData = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/updateUserById/${id}`, {
      id: id,
      userName: empNames,
      userRole: userRole,
      day: day,
      date: date,
      userStatus: userStatus,
    });
    setBtn("submit");
    setEmpName("admin");
    notifyAddNew();
    setDisableName(false);
    getAll();
  };
  //
  //
  //
  //
  //
  //
  return (
    <>
      <div className="container-fluid">
        <nav className="navbar navbar-light bg-light justify-content-between">
          <a className="navbar-brand">User Attendence</a>
          <form className="form-inline">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={() => {
                navigate("/");
              }}
            >
              Logout
            </button>
          </form>
        </nav>
      </div>

      <div className="row">
        <div className="userStatusForm col-6">
          <form className="container" action="">
            <label htmlFor="">Name </label>
            <select
              name="userName"
              id="username"
              value={empNames}
              disabled= {empName !== "admin" ? disableName:false}
              onChange={(e) => setEmpNames(e.target.value)}
            >
            {myNameData.map((res) => {
              return(<>
                <option value={res}>{res}</option>
              </>)
            })}
            </select>

            <label htmlFor="">Role </label>
            <select
              name="userRole"
              id="userrole"
              value={userRole}
              disabled= {empName !== "admin" ? disableName:false}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="">-select-</option>
              <option value="BA">BA</option>
              <option value="QA">QA</option>
              <option value="FE">FE</option>
              <option value="BE">BE</option>
              <option value="DEVOPS">DEVOPS</option>
            </select>
            <label htmlFor="">Day </label>
            <input
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <label htmlFor="">Date </label>
            <br />
            <input
              type="date"
              id="date"
              value={date.split("-").reverse().join("-")}
              onChange={(e) =>
                {
                  setDate(e.target.value.split("-").reverse().join("-"))
                  setDay(weekday[new Date(e.target.value).getDay()])
                }
              }
            />
            <label htmlFor="">Status </label>
            <select
              name="userStatus"
              id="userstatus"
              value={userStatus}
              onChange={(e) => setUserStatus(e.target.value)}
            >
              <option value="">-select-</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Panned Leave">Planned Leave</option>
              <option value="1st Half">1st Half</option>
              <option value="2nd Half">2nd Half</option>
            </select>

            {btn === "submit" ? (
              <input
                className="btn btn-success"
                type="submit"
                value="submit"
                onClick={getAllInput}
              />
            ) : (
              <input
                className="btn btn-warning"
                type="submit"
                value="update"
                onClick={updateData}
              />
            )}
          </form>
        </div>

        {mydata.length > 0 && location.state.name !== "admin" ? (
          <div className="col-8 tableListPostition">
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">UserRole</th>
                  <th scope="col">Day</th>
                  <th scope="col">Date</th>
                  <th scope="col">UserStatus</th>
                </tr>
              </thead>
              <tbody>
                {mydata.map((res) => {
                  const { id, userName, userRole, day, date, userStatus } = res;
                  return (
                    <>
                      <tr key={id}>
                        <th scope="row">{id}</th>
                        <td>{userName}</td>
                        <td>{userRole}</td>
                        <td>{day}</td>
                        <td>{date}</td>
                        <td>{userStatus}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}

        {location.state.name === "admin" ? (
          <div className="col-8">
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">UserRole</th>
                  <th scope="col">Day</th>
                  <th scope="col">Date</th>
                  <th scope="col">UserStatus</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {mydataadmin.map((res) => {
                  const { id, userName, userRole, day, date, userStatus } = res;
                  return (
                    <>
                      <tr>
                        <th scope="row">{id}</th>
                        <td>{userName}</td>
                        <td>{userRole}</td>
                        <td>{day}</td>
                        <td>{date}</td>
                        <td>{userStatus}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            name="delete"
                            id={id}
                            onClick={getCurrEmpDel}
                          >
                            delete
                          </button>
                          <button
                            className="btn btn-warning"
                            name="update"
                            id={id}
                            onClick={getCurrEmpUpd}
                          >
                            update
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
      <ToastContainer/>
    </>
  );
}
