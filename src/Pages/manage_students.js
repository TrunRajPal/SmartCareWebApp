import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Sidebar from "../Components/Sidebar.js";
import firebase from "../Config/firebase.js";
import { Link, useHistory } from "react-router-dom";

function ManageStudents(props) {
  const history = useHistory();
  const [students, setStudents] = useState([]);

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

    const userRef = firebase.database().ref("/").child("students");
    userRef.on("value", (snapshot) => {
      let newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        newUsersState.push({
          key: data.key,
          name: dataVal.name,
          gname: dataVal.gname,
          progressReport: dataVal.progressReport,
          filled: dataVal.filled,
        });
      });
      setStudents(newUsersState);
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

  const deleteStudent = (e, key) => {
    firebase
      .database()
      .ref("/")
      .child("students/" + key)
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
          <div className="container card">
            <div className="card-header bg-dark text-white">
              <h1>Manage Cases (Child)</h1>
            </div>
            <div className="card-body">
              <div>
                <Link
                  to="/addstudents"
                  className="btn btn-success"
                  style={{ width: "max-content" }}
                >
                  Add New Child
                </Link>
              </div>
              <br />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ display: "none" }}>Id</th>
                    <th>Child Name</th>
                    <th>Guardian Name</th>
                    <th>Profile</th>
                    <th>Progress Report</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td style={{ display: "none" }}>{v.key}</td>
                        <td>{v.name}</td>
                        <td>{v.gname}</td>
                        <td>{v.progressReport}</td>
                        <td>
                          {v.filled === true ? (
                            <Link
                              to={{
                                pathname: "/updateprogressreport/" + v.key,
                              }}
                              className="btn btn-success"
                              style={{ width: "max-content" }}
                            >
                              Update Report
                            </Link>
                          ) : (
                            <Link
                              to={{ pathname: "/addprogressreport/" + v.key }}
                              className="btn btn-success"
                              style={{ width: "max-content" }}
                            >
                              Add New Report
                            </Link>
                          )}
                        </td>
                        <td>
                          <Link
                            className="btn btn-primary"
                            to={{ pathname: "/updatestudent/" + v.key }}
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            id="dltBtn"
                            className="btn btn-danger"
                            onClick={() => deleteStudent(i, v.key)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <br />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudents);
