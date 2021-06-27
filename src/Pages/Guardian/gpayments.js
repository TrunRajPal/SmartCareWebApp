import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Sidebar from "../../Components/GSidebar.js";
import firebase from "../../Config/firebase.js";
import { Link, useHistory } from "react-router-dom";

function GPayments(props) {
  const history = useHistory();
  const [requests, setRequests] = useState([]);
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
    const userRef = firebase.database().ref("requests");
    userRef.on("value", (snapshot) => {
      let newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        if (dataVal.requester === localStorage.getItem("duseruids")) {
          newUsersState.push({
            key: data.key,
            servicename: dataVal.service_name,
            ratepersession: dataVal.ratepersession,
            instructor: dataVal.instructor,
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
          <br />
          <div className="card container">
            <div className="card-header bg-dark text-white">
              <h1>Payment History</h1>
            </div>
            <div className="card-body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ display: "none" }}>Key</th>
                    <th>Service Name</th>
                    <th>Rate Per Session</th>
                    <th>Instructor Name</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td style={{ display: "none" }}>{v.key}</td>
                        <td>{v.servicename}</td>
                        <td>{v.ratepersession}</td>
                        <td>{v.instructor}</td>
                        <td>{v.payment}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(GPayments);
