import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import GSidebar from "../../Components/GSidebar.js";
import { Redirect, useHistory } from "react-router-dom";
import firebase from "../../Config/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GReschedual(props) {
  const history = useHistory();
  const [requester, setRequester] = useState("");
  const [name, setName] = useState("");
  const [ratepersession, setRatepersession] = useState("");
  const [instructoremail, setInstructoremail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState("");
  const [pdate, setPDate] = useState("");
  const [ptime, setPTime] = useState("");
  const [requestid, setRequestid] = useState("");

  useEffect(() => {
    console.log("This function runs only on first Render");
    if (
      localStorage.getItem("duseremail") === null ||
      localStorage.getItem("duseremail") === "" ||
      localStorage.getItem("duseremail") === "null" ||
      localStorage.getItem("dusertype") !== "guardian"
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
      setInstructoremail(dataVal.instructor);
      setRatepersession(dataVal.ratepersession);
      setDate(dataVal.date);
      setTime(dataVal.time);
      setPDate(dataVal.date);
      setPTime(dataVal.time);
      setPayment(dataVal.payment);

      console.log(name);
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
      .ref("sessions/" + checkedNew + pdate + ptime)
      .set({
        requestid: requestid,
        service_name: name,
        ratepersession: ratepersession,
        requester: requester,
        instructor: instructoremail,
        date: date,
        time: time,
        status: "Cancelled",
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
        status: "Cancelled",
        taken: "no",
      });

    firebase
      .database()
      .ref("requests")
      .push({
        requester: localStorage.getItem("duseruids"),
        service_name: name,
        ratepersession: ratepersession,
        instructor: instructoremail,
        date: date,
        time: time,
        status: "Requested",
        payment: payment,
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
          <GSidebar />
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
          <div>
            <div className="container">
              <h3>Service Information</h3>
              <hr />

              <div className="form-group">
                <label htmlFor="inputPassword4">Service Name</label>
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
                <label htmlFor="inputPassword4">Service Rate Per Session</label>
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
                <label htmlFor="inputAddress">Instructor Name</label>
                <input
                  className="form-control"
                  value={instructoremail}
                  onChange={(e) => setInstructoremail(e.target.value)}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Payment</label>
                <select
                  className="form-control"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  readOnly
                >
                  <option>Select One Option</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword4">Date</label>
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
                <label htmlFor="inputPassword4">Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  id="name"
                  placeholder="Enter Rate Per Session"
                />
              </div>

              <br />

              <button
                type="submit"
                className="btn btn-primary"
                onClick={add}
                style={{ width: "max-content", marginBottom: "20px" }}
              >
                Request This Service
              </button>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GReschedual);
