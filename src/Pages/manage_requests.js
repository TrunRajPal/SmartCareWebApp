import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Sidebar from "../Components/Sidebar.js";
import firebase from "../Config/firebase.js";
import { Link, useHistory } from "react-router-dom";

function ManageRequests(props) {
  const history = useHistory();
  const [requests, setRequests] = useState([]);
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
    const userRef = firebase.database().ref("/").child("requests");
    userRef.on("value", (snapshot) => {
      let newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        newUsersState.push({
          key: data.key,
          service_name: dataVal.service_name,
          instructor: dataVal.instructor,
          status: dataVal.status,
          date: dataVal.date,
          time: dataVal.time,
          payment: dataVal.payment,
        });
      });
      setRequests(newUsersState);
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

  const deleteRequest = (e, key) => {
    firebase
      .database()
      .ref("/")
      .child("requests/" + key)
      .remove();
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
              <h1>Manage Requests</h1>
            </div>
            <div className="card-body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ display: "none" }}>Key</th>
                    <th>Service Name</th>
                    <th>Instructor Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td style={{ display: "none" }}>{v.key}</td>
                        <td>{v.service_name}</td>
                        <td>{v.instructor}</td>
                        <td>{v.date}</td>
                        <td>{v.time}</td>
                        <td>{v.payment}</td>
                        <td>{v.status}</td>
                        <td>
                          <Link
                            className="btn btn-primary"
                            to={{ pathname: "/updaterequests/" + v.key }}
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            id="dltBtn"
                            className="btn btn-danger"
                            onClick={() => deleteRequest(i, v.key)}
                          >
                            Delete
                          </button>
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
    </>
  );
}

const mapStateToProps = (state) => ({
  hasUser: state.hasUser,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ManageRequests);
