import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Sidebar from "../Components/Sidebar.js";
import firebase from "../Config/firebase.js";
import { Link, useHistory } from "react-router-dom";

function ManageServices(props) {
  const history = useHistory();
  const [services, setServices] = useState([]);
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
    const userRef = firebase.database().ref("/").child("services");
    userRef.on("value", (snapshot) => {
      let newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        newUsersState.push({
          key: data.key,
          servicename: dataVal.service_name,
          ratepersession: dataVal.ratepersession,
        });
      });
      setServices(newUsersState);
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

  const deleteServices = (e, key) => {
    firebase
      .database()
      .ref("/")
      .child("services/" + key)
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
              <h1>Manage Services</h1>
            </div>
            <div className="card-body">
              <div>
                <Link
                  to="/addservices"
                  className="btn btn-success"
                  style={{ width: "max-content" }}
                >
                  Add New Service
                </Link>
              </div>
              <br />

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ display: "none" }}>Key</th>
                    <th>Service Name</th>
                    <th>Rate Per Session</th>

                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td style={{ display: "none" }}>{v.key}</td>
                        <td>{v.servicename}</td>
                        <td>{v.ratepersession}</td>

                        <td>
                          <Link
                            className="btn btn-primary"
                            to={{ pathname: "/updateservice/" + v.key }}
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            id="dltBtn"
                            className="btn btn-danger"
                            onClick={() => deleteServices(i, v.key)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageServices);
