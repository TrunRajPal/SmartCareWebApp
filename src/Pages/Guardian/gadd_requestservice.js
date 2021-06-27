import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "../../Components/GSidebar.js";
import { useHistory } from "react-router-dom";
import firebase from "../../Config/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GAddRequestservice(props) {
  const history = useHistory();

  const [name, setName] = useState("");
  const [ratepersession, setRatepersession] = useState("");

  useEffect(() => {
    console.log("This function runs only on first Render");
    if (
      localStorage.getItem("duseremail") === null ||
      localStorage.getItem("duseremail") === "" ||
      localStorage.getItem("duseremail") === "null"
    ) {
      history.push("/");
    }
    const userRef = firebase
      .database()
      .ref("services")
      .child(props.match.params.key);
    userRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        const dataVal = data.val();
        setName(dataVal.service_name);
        setRatepersession(dataVal.ratepersession);
      });
    });
    console.log("Hello World");
  }, []);

  const signout = () => {
    localStorage.setItem("hasUser", false);
    localStorage.setItem("duseremail", "null");
    localStorage.setItem("duseruids", "null");
    localStorage.setItem("dusername", "null");
    history.push("/");
  };

  const add = () => {
    firebase.database().ref("requests").push({
      service_name: name,
      ratepersession: ratepersession,
      status: "Requested",
    });

    toast.success("Service Requested Successfully");
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
          <div>
            <div className="container">
              <h3>Service Information</h3>
              <hr />

              <div className="form-group">
                <label htmlFor="inputPassword4">Service Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Enter Service Name"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputPassword4">Service Rate Per Session</label>
                <input
                  type="number"
                  className="form-control"
                  value={ratepersession}
                  onChange={(e) => setRatepersession(e.target.value)}
                  id="name"
                  placeholder="Enter Rate Per Session"
                  readOnly
                />
              </div>

              <br />

              <button
                type="submit"
                className="btn btn-primary"
                onClick={add}
                style={{ width: "max-content", marginBottom: "20px" }}
              >
                Request This Service
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

export default connect(mapStateToProps, mapDispatchToProps)(GAddRequestservice);
