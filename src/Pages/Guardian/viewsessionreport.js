import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "../../Components/GSidebar.js";
import { Redirect, useHistory } from "react-router-dom";
import firebase from "../../Config/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Viewsessionreport(props) {
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
      localStorage.getItem("dusertype") !== "guardian"
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

  // const add=()=>{

  //         firebase.database().ref('sessionreports/'+props.match.params.key).set({
  //             requester:requester,
  //             childmotivation:childmotivation,
  //             guardianmotivation:guardianmotivation,
  //             finalstatus:finalstatus,
  //             comments:comments
  //         })

  //         toast.success("Session Report Uploaded Successfully")

  //         return <Redirect to='/dashboard'/>

  // }

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
            <div className="card-header bg-dark text-white">
              <h1>Session Progress Report</h1>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Child Id</label>
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
                <label style={{ fontWeight: "bold" }}>Child Motivation</label>
                <input
                  type="text"
                  className="form-control"
                  value={childmotivation}
                  onChange={(e) => setChildmotivation(e.target.value)}
                  id="name"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>
                  Guardian Motivation
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={guardianmotivation}
                  onChange={(e) => setGuardianmotivation(e.target.value)}
                  id="name"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Final Status</label>
                <input
                  type="text"
                  className="form-control"
                  value={finalstatus}
                  onChange={(e) => setfinalStatus(e.target.value)}
                  id="name"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Comments</label>
                <input
                  type="text"
                  className="form-control"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  id="contact"
                  placeholder="Enter Comment"
                  readOnly
                />
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Viewsessionreport);
