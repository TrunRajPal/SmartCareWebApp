import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { set_user } from "../../Store/action";
import "../../Css/home.css";
import firebase from "../../Config/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home(props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    console.log("This function runs only on first Render");
  }, []);

  useEffect(() => {
    console.log("This function runs at every Render");
  });

  useEffect(() => {
    return () => {
      console.log("This function runs at component unmount");
    };
  });

  const signin = () => {
    console.log(email);
    console.log(password);

    if (email === "admin@admin.com" && password === "123456") {
      toast.error("Please Enter Valid Credentials");
    } else {
      localStorage.setItem("duseremail", "null");
      localStorage.setItem("duseruids", "null");
      localStorage.setItem("hasUser", false);

      toast("Please Wait");
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          localStorage.setItem("duseremail", email);

          localStorage.setItem("duseremail", result.user.email);
          localStorage.setItem("duseruids", result.user.uid);
          localStorage.setItem("dusername", result.user.displayName);
          localStorage.setItem("duserpassword", password);
          localStorage.setItem("hasUser", true);
          localStorage.setItem("dusertype", "instructor");

          props.set_user(
            result.user.displayName,
            result.user.email,
            result.user.uid
          );

          history.push("/instructor/idashboard");
        })
        .catch(function (error) {
          var errorMessage = error.message;
          toast.error(errorMessage);
        });
    }
  };

  return (
    <>
      <div className="main">
        <div className=" w3l-login-form">
          <h2 style={{ color: "#fff", fontWeight: "bolder" }}>
            Instructor Login
          </h2>
          <div className="form">
            <div className=" w3l-form-group">
              <label>Email Address:</label>
              <div className="group">
                <i className="fa fa-user" style={{ marginTop: "8px" }}></i>
                <input
                  type="email"
                  className="form-control loginemail"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required="required"
                />
              </div>
            </div>
            <div className=" w3l-form-group">
              <label>Password:</label>
              <div className="group">
                <i className="fa fa-unlock" style={{ marginTop: "8px" }}></i>
                <input
                  type="password"
                  className="form-control loginpassword"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required="required"
                />
              </div>
            </div>

            <button type="submit" onClick={signin}>
              Login
            </button>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Link to="/" className="register">
              Admin Login
            </Link>
            <br />
            <Link to="/guardian/home" className="register">
              Guardian Login
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
