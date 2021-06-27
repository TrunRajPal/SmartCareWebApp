import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "../Components/Sidebar.js";
import { Redirect, useHistory } from "react-router-dom";
import firebase from "../Config/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateProgressReports(props) {
  const history = useHistory();
  const [id, setId] = useState("");
  const [expectation, setExpectation] = useState("");
  const [childmotivation, setChildmotivation] = useState("");
  const [guardianmotivation, setGuardianmotivation] = useState("");
  const [finalstatus, setfinalStatus] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    // console.log("This function runs only on first Render");
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
      .ref("adminprogrssreport")
      .child(props.match.params.key);
    userRef.on("value", (snapshot) => {
      const dataVal = snapshot.val();
      setId(dataVal.id);
      setExpectation(dataVal.expectation);
      setChildmotivation(dataVal.childmotivation);
      setGuardianmotivation(dataVal.guardianmotivation);
      setfinalStatus(dataVal.finalstatus);
      setComments(dataVal.comments);
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

  const update = () => {
    firebase
      .database()
      .ref("adminprogrssreport/" + props.match.params.key)
      .set({
        id: id,
        expectation: expectation,
        childmotivation: childmotivation,
        guardianmotivation: guardianmotivation,
        finalstatus: finalstatus,
        comments: comments,
      });

    toast.success("Progress Report Updated Successfully");
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
          <div className="container card">
            <div>
              <div className="card-header bg-dark text-white">
                <h1>Progress Report</h1>
              </div>
              <br />
              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Student Id</label>
                <input
                  type="text"
                  className="form-control"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  id="name"
                  placeholder="Enter Full Name"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Expectation</label>
                <select
                  className="form-control"
                  value={expectation}
                  onChange={(e) => setExpectation(e.target.value)}
                >
                  <option>Select One Option</option>
                  <option>Realistic</option>
                  <option>Non-Realistic</option>
                </select>{" "}
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Child Motivation</label>
                <select
                  className="form-control"
                  value={childmotivation}
                  onChange={(e) => setChildmotivation(e.target.value)}
                >
                  <option>Select One Option</option>
                  <option>Not Motivated</option>
                  <option>Moderate</option>
                  <option>Highly Motivated</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>
                  Guardian Motivation
                </label>
                <select
                  className="form-control"
                  value={guardianmotivation}
                  onChange={(e) => setGuardianmotivation(e.target.value)}
                >
                  <option>Select One Option</option>
                  <option>Not Motivated</option>
                  <option>Moderate</option>
                  <option>Highly Motivated</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Final Status</label>
                <select
                  className="form-control"
                  value={finalstatus}
                  onChange={(e) => setfinalStatus(e.target.value)}
                >
                  <option>Select One Option</option>
                  <option>Accepted</option>
                  <option>Not Accepted</option>
                  <option>Further Evaluation Required</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Comments</label>
                <input
                  type="text"
                  className="form-control"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  id="contact"
                  placeholder="Enter Contact No"
                />
              </div>

              <br />

              <button
                type="submit"
                className="btn btn-success"
                onClick={update}
                style={{ width: "max-content", marginBottom: "20px" }}
              >
                Update Progress Report
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProgressReports);
