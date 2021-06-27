import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Sidebar from "../Components/Sidebar.js";
import firebase from "../Config/firebase.js";
import { Link, useHistory } from "react-router-dom";

function ManageAdmins(props) {
  const history = useHistory();
  const [admins, setAdmins] = useState([]);
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
    const userRef = firebase.database().ref("/").child("admins");
    userRef.on("value", (snapshot) => {
      let newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        newUsersState.push({
          key: data.key,
          name: dataVal.name,
          age: dataVal.age,
          contact: dataVal.contact,
          email: dataVal.gemail,
        });
      });
      setAdmins(newUsersState);
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
              <h1>Manage Admins</h1>
            </div>
            <div className="card-body">
              <div>
                <div>
                  <Link
                    to="/addadmin"
                    className="btn btn-success"
                    style={{ width: "max-content" }}
                  >
                    Add New Admin
                  </Link>
                </div>
                <br />
              </div>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ display: "none" }}>Key</th>
                    <th>Admin Name</th>
                    <th>Admin Email</th>
                    <th>Admin Age</th>
                    <th>Admin Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td style={{ display: "none" }}>{v.key}</td>
                        <td>{v.name}</td>
                        <td>{v.email}</td>
                        <td>{v.age}</td>
                        <td>{v.contact}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmins);
