import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ISidebar from "../../Components/ISidebar.js";
import { useHistory } from "react-router-dom";
import firebase from "../../Config/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IProfile(props) {
  const history = useHistory();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [qualification, setQualification] = useState("");
  const [gemail, setGemail] = useState("");
  const [gpassword, setGpassword] = useState("");

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

    const userRef = firebase
      .database()
      .ref("instructors")
      .child(localStorage.getItem("duseruids"));
    userRef.on("value", (snapshot) => {
      const dataVal = snapshot.val();
      setName(dataVal.name);
      setAge(dataVal.age);
      setAddress(dataVal.address);
      setContact(dataVal.contact);
      setQualification(dataVal.qualification);
      setGemail(dataVal.gemail);
      setGpassword(dataVal.gpassword);
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

  const update = () => {
    var user = firebase.auth().currentUser;
    var newPassword = gpassword;

    user
      .updatePassword(newPassword)
      .then(function () {
        console.log("success");
      })
      .catch(function (error) {
        toast.error("error");
      });

    firebase
      .database()
      .ref("instructors/" + localStorage.getItem("duseruids"))
      .set({
        name: name,
        age: age,
        qualification,
        qualification,
        address: address,
        contact: contact,
        gemail: gemail,
        gpassword: gpassword,
      });

    toast.success("Instructor Profile Updated Successfully");
  };

  return (
    <>
      <div className="row">
        <div
          className="col"
          style={{ maxWidth: "fit-content", backgroundColor: "#333333" }}
        >
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

          <div className="card container">
            <div className="card-header bg-dark text text-white">
              <h1>Update Your Profile</h1>
            </div>
            <div className="card-body">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>Intructor Information</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      placeholder="Enter Full Name"
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Age</label>
                    <input
                      type="number"
                      className="form-control"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      id="age"
                      placeholder="Enter Age"
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Qualification</label>
                    <input
                      type="text"
                      className="form-control"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      id="age"
                      placeholder="Enter Qualification"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        id="address"
                        placeholder="Enter Address"
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>Contact No</label>
                      <input
                        type="text"
                        className="form-control"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        id="contact"
                        placeholder="Enter Contact No"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>Admin Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value={gemail}
                        onChange={(e) => setGemail(e.target.value)}
                        id="contact"
                        placeholder="Enter Email Address"
                        readOnly
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>Password</label>
                      <input
                        type="text"
                        className="form-control"
                        value={gpassword}
                        onChange={(e) => setGpassword(e.target.value)}
                        id="contact"
                        placeholder="Enter Password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={update}
                    style={{ width: "max-content", marginBottom: "20px" }}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(IProfile);
