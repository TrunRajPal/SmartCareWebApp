import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { set_user } from "../../Store/action";
import GSidebar from "../../Components/GSidebar.js";
import firebase from "../../Config/firebase.js";

function GDashboard(props) {
  const history = useHistory();
  const [progressReport, setProgressreport] = useState("");
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
      .ref("students")
      .child(localStorage.getItem("duseruids"));
    userRef.on("value", (snapshot) => {
      const dataVal = snapshot.val();
      setProgressreport(dataVal.progressReport);
    });
  }, []);

  useEffect(() => {
    console.log("This function runs at every Render");
  });

  useEffect(() => {
    return () => {
      console.log("This function runs at component unmount");
    };
  });

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
          <GSidebar />
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
          <br />
          <br />
          <div className="container card">
            <div className="card-header bg-dark text-white">
              <h1>Welcome Guardian!</h1>
            </div>
            <div className="card-body">
              {progressReport === "Filled" ? (
                <div className="card">
                  <div className="card-header bg-primary text-white text-center">
                    <h3>Your Profile Status</h3>
                  </div>
                  <div className="card-body">
                    <div class="alert alert-info text-center" role="alert">
                      Congratulations! Your Profile is Completed
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="card-header bg-primary text-white text-center">
                    <h3>Profile Status</h3>
                  </div>
                  <div className="card-body">
                    <h3>
                      <div class="alert alert-danger" role="alert">
                        Your Profile is Not Complete. Please Complete Your
                        Profile In Your Profile Tab
                      </div>
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  hasUser: state.hasUser,
  currentUsername: state.currentUsername,
});

const mapDispatchToProps = (dispatch) => ({
  set_user: (name, email, photoURL, uid) =>
    dispatch(set_user(name, email, photoURL, uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GDashboard);
