import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { set_user } from "../../Store/action";
import ISidebar from "../../Components/ISidebar.js";

function IDashboard(props) {
  const history = useHistory();
  const [progressReport, setProgressreport] = useState("");
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
          <ISidebar />
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
              <h1>Welcome Instructor</h1>
            </div>
            <br />
            <div class="alert alert-info text-center" role="alert">
              You have been Succesfully Logged In !
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

export default connect(mapStateToProps, mapDispatchToProps)(IDashboard);
