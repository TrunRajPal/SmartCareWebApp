import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "../Components/Sidebar.js";
import { Redirect, useHistory } from "react-router-dom";
import firebase from "../Config/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateRequests(props) {
  const history = useHistory();
  const [instructors, setInstructors] = useState([]);
  const [requester, setRequester] = useState("");
  const [name, setName] = useState("");
  const [ratepersession, setRatepersession] = useState("");
  const [instructoremail, setInstructoremail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState("");
  const [requestid, setRequestid] = useState("");
  const [status, setStatus] = useState("");
  const [pdate, setPDate] = useState("");
  const [ptime, setPTime] = useState("");

  useEffect(() => {
    console.log("This function runs only on first Render");
    if (
      localStorage.getItem("duseremail") === null ||
      localStorage.getItem("duseremail") === "" ||
      localStorage.getItem("duseremail") === "null" ||
      localStorage.getItem("dusertype") !== "admin"
    ) {
      history.push("/");
    }
    const userRef = firebase
      .database()
      .ref("requests")
      .child(props.match.params.key);
    setRequestid(props.match.params.key);
    console.log(requestid);
    userRef.on("value", (snapshot) => {
      const dataVal = snapshot.val();
      setRequester(dataVal.requester);
      setName(dataVal.service_name);
      setRatepersession(dataVal.ratepersession);
      setStatus(dataVal.status);
      setPDate(dataVal.date);
      setPTime(dataVal.time);

      console.log(name);
    });

    const ins = firebase.database().ref("/").child("instructors");
    ins.on("value", (snapshot) => {
      let newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        newUsersState.push({
          key: data.key,
          name: dataVal.name,
          gemail: dataVal.gemail,
          qualification: dataVal.qualification,
        });
      });
      setInstructors(newUsersState);
    });
  }, []);

  const signout = () => {
    localStorage.setItem("hasUser", false);
    localStorage.setItem("duseremail", "null");
    localStorage.setItem("duseruids", "null");
    localStorage.setItem("dusername", "null");
    localStorage.setItem("dusertype", "null");
    history.push("/");
  };

  const add = () => {
    var checkedNew = instructoremail.split(".").join("");
    firebase
      .database()
      .ref("sessions/" + checkedNew + date + time)
      .set({
        requestid: requestid,
        service_name: name,
        ratepersession: ratepersession,
        requester: requester,
        instructor: instructoremail,
        date: date,
        time: time,
        status: "Accepted",
        payment: payment,
        taken: "no",
      });

    firebase
      .database()
      .ref("requests/" + props.match.params.key)
      .set({
        service_name: name,
        ratepersession: ratepersession,
        instructor: instructoremail,
        requester: requester,
        date: date,
        time: time,
        payment: payment,
        status: "Accepted",
        taken: "no",
      });

    toast.success("Request Updated Successfully");
  };

  const update = () => {
    var checkedNew = instructoremail.split(".").join("");
    firebase
      .database()
      .ref("sessions/" + checkedNew + pdate + ptime)
      .set({
        requestid: requestid,
        service_name: name,
        ratepersession: ratepersession,
        requester: requester,
        instructor: instructoremail,
        date: date,
        time: time,
        status: "Accepted",
        payment: payment,
        taken: "no",
      });

    firebase
      .database()
      .ref("requests/" + props.match.params.key)
      .set({
        service_name: name,
        ratepersession: ratepersession,
        instructor: instructoremail,
        requester: requester,
        date: date,
        time: time,
        payment: payment,
        status: "Accepted",
        taken: "no",
      });

    toast.success("Request Updated Successfully");
  };

  return (
    <>
      <div className="row">
        <div
          className="col"
          style={{ maxWidth: "fit-content", backgroundColor: "#333333" }}
        >
          <Sidebar />
        </div>
        <div className="col" style={{ width: "100%", marginLeft: "-20px" }}>
          <div
            className="row"
            style={{ backgroundColor: "#333333", paddingBottom: "17px" }}
          >
            <div className="col"></div>
            <div
              className="col"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
                marginRight: "50px",
              }}
            >
              <button
                className="btn btn-danger"
                onClick={signout}
                style={{ width: "fit-content" }}
              >
                Log Out
              </button>
            </div>
          </div>

          <br />
          <div className="card container">
            <div className="card-header bg-dark text-white">
              <h1>Re-schedule Session</h1>
            </div>
            <div className="card-body">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>Request Information</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Service Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      placeholder="Enter Service Name"
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>
                      Service Rate Per Session
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={ratepersession}
                      onChange={(e) => setRatepersession(e.target.value)}
                      id="name"
                      placeholder="Enter Rate Per Session"
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>
                      Instructor Name
                    </label>
                    <select
                      className="form-control"
                      value={instructoremail}
                      onChange={(e) => setInstructoremail(e.target.value)}
                    >
                      <option>Select One Option</option>
                      {instructors.map((v, i) => {
                        return <option value={v.gemail}>{v.gemail}</option>;
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Payment</label>
                    <select
                      className="form-control"
                      value={payment}
                      onChange={(e) => setPayment(e.target.value)}
                    >
                      <option>Select One Option</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      id="name"
                      placeholder="Enter Rate Per Session"
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      id="name"
                      placeholder="Enter Rate Per Session"
                    />
                  </div>

                  {status === "Requested" ? (
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={add}
                      style={{ width: "max-content" }}
                    >
                      Request This Service
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={update}
                      style={{ width: "max-content" }}
                    >
                      Assign This Service
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* */}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

const mapStateToProps = (state) => ({
  hasUser: state.hasUser,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequests);
