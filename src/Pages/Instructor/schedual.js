import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Sidebar from "../../Components/ISidebar.js";
import firebase from "../../Config/firebase.js";
import { Link, useHistory } from "react-router-dom";

function Schedual(props) {
  const history = useHistory();
  const [requests, setRequests] = useState([]);

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

    const userRef = firebase.database().ref("sessions");
    userRef.on("value", (snapshot) => {
      let newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        if (
          dataVal.instructor === localStorage.getItem("duseremail") &&
          dataVal.status === "Accepted"
        ) {
          newUsersState.push({
            key: data.key,
            servicename: dataVal.service_name,
            ratepersession: dataVal.ratepersession,
            instructor: dataVal.instructor,
            date: dataVal.date,
            time: dataVal.time,
            status: dataVal.status,
            taken: dataVal.taken,
            payment: dataVal.payment,
          });
        }
        setRequests(newUsersState);
      });
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

          <div className="card container">
            <div className="card-header bg-dark text-white">
              <h1>Scheduled Meeting</h1>
            </div>
            <div className="card-body">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>Manage Schedual</h3>
                </div>
                <div className="card-body">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th style={{ display: "none" }}>Key</th>
                        <th>Service Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Payment</th>
                        <th>Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td style={{ display: "none" }}>{v.key}</td>
                            <td>{v.servicename}</td>
                            <td>{v.date}</td>
                            <td>{v.time}</td>
                            <td>{v.payment}</td>
                            <td>
                              {v.taken === "no" ? (
                                <Link
                                  to={{
                                    pathname: "/addsessionreport/" + v.key,
                                  }}
                                  className="btn btn-success"
                                  style={{ width: "max-content" }}
                                >
                                  Add Session Report
                                </Link>
                              ) : (
                                <h5>
                                  <div class="alert alert-info" role="alert">
                                    Report Already Added
                                  </div>
                                </h5>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Schedual);
