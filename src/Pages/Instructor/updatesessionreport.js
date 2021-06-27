import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "../../Components/ISidebar.js";
import { useHistory } from "react-router-dom";
import firebase from "../../Config/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Updatesessionreport(props) {
  const history = useHistory();

  const [requester, setRequester] = useState("");
  const [childmotivation, setChildmotivation] = useState("");
  const [guardianmotivation, setGuardianmotivation] = useState("");
  const [finalstatus, setfinalStatus] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    console.log("This function runs only on first Render");
    if (
      localStorage.getItem("duseremail") === null ||
      localStorage.getItem("duseremail") === "" ||
      localStorage.getItem("duseremail") === "null" ||
      localStorage.getItem("dusertype") !== "instructor"
    ) {
      history.push("/");
    }

    const userRef = firebase
      .database()
      .ref("sessionreports")
      .child(props.match.params.key);
    userRef.on("value", (snapshot) => {
      const dataVal = snapshot.val();
      setRequester(dataVal.requester);
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

  const add = () => {
    firebase
      .database()
      .ref("sessionreports/" + props.match.params.key)
      .set({
        requester: requester,
        childmotivation: childmotivation,
        guardianmotivation: guardianmotivation,
        finalstatus: finalstatus,
        comments: comments,
      });

    toast.success("Session Report Uploaded Successfully");
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
              <h1>View/ Update Session Report</h1>
            </div>
            <div className="card-body">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>Session Progress Report</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputPassword4">Child Id</label>
                    <input
                      type="text"
                      className="form-control"
                      value={requester}
                      onChange={(e) => setRequester(e.target.value)}
                      id="name"
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputAddress">Child Motivation</label>
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
                    <label htmlFor="inputCity">Guardian Motivation</label>
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
                    <label htmlFor="inputZip">Final Status</label>
                    <select
                      className="form-control"
                      value={finalstatus}
                      onChange={(e) => setfinalStatus(e.target.value)}
                    >
                      <option>Select One Option</option>
                      <option>Completed</option>
                      <option>Not Completed</option>
                      <option>Student Did Not Attend The Session</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputZip">Comments</label>
                    <input
                      type="text"
                      className="form-control"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      id="contact"
                      placeholder="Enter Comment"
                    />
                  </div>
                </div>
              </div>

              <br />

              <button
                type="submit"
                className="btn btn-success"
                onClick={add}
                style={{ width: "max-content" }}
              >
                Update Report
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
)(Updatesessionreport);
