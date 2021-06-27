import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "../../Components/GSidebar.js";
import firebase from "../../Config/firebase.js";
import { useHistory } from "react-router-dom";

function GProgrssreport(props) {
  const history = useHistory();
  const [id, setId] = useState("");
  const [expectation, setExpectation] = useState("");
  const [childmotivation, setChildmotivation] = useState("");
  const [guardianmotivation, setGuardianmotivation] = useState("");
  const [finalstatus, setfinalStatus] = useState("");
  const [comments, setComments] = useState("");
  const [hasAccess, setHasaccess] = useState("");
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

    const ccheck = firebase
      .database()
      .ref("adminprogrssreport")
      .child(localStorage.getItem("duseruids"));
    ccheck.on("value", (snapshot) => {
      if (snapshot.val()) {
        const dataVal = snapshot.val();
        setId(dataVal.id);
        setExpectation(dataVal.expectation);
        setChildmotivation(dataVal.childmotivation);
        setGuardianmotivation(dataVal.guardianmotivation);
        setfinalStatus(dataVal.finalstatus);
        setComments(dataVal.comments);
        setHasaccess("true");
      } else {
        setHasaccess("false");
      }
      console.log(hasAccess);
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

  return (
    <>
      <div className="row">
        <div className="col" style={{ maxWidth: "fit-content" }}>
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

          <div>
            <br />
            <div>
              {hasAccess === "true" ? (
                <div className="container">
                  <div className="card">
                    <div className="card-header bg-dark text-white">
                      <h1>Profile Progress Report</h1>
                    </div>
                    <div className="card-body">
                      <div className="card">
                        <div className="card-header bg-primary text-white">
                          <h3>Progress Report</h3>
                        </div>
                        <div className="card-body">
                          {" "}
                          <div className="form-group">
                            <label style={{ fontWeight: "bold" }}>
                              Student Id
                            </label>
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
                            <label style={{ fontWeight: "bold" }}>
                              Expectation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={expectation}
                              onChange={(e) => setExpectation(e.target.value)}
                              id="name"
                              placeholder="Enter Full Name"
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <label style={{ fontWeight: "bold" }}>
                              Child Motivation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={childmotivation}
                              onChange={(e) =>
                                setChildmotivation(e.target.value)
                              }
                              id="name"
                              placeholder="Enter Full Name"
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
                              onChange={(e) =>
                                setGuardianmotivation(e.target.value)
                              }
                              id="name"
                              placeholder="Enter Full Name"
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <label style={{ fontWeight: "bold" }}>
                              Final Status
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={finalstatus}
                              onChange={(e) => setfinalStatus(e.target.value)}
                              id="name"
                              placeholder="Enter Full Name"
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <label style={{ fontWeight: "bold" }}>
                              Comments
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={comments}
                              onChange={(e) => setComments(e.target.value)}
                              id="contact"
                              placeholder="Enter Contact No"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              ) : (
                <div class="alert alert-danger text-center" role="alert">
                  You Profile Is Not Viewed By Admin Yet
                </div>
              )}
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  hasUser: state.hasUser,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GProgrssreport);
