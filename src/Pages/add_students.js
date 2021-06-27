import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "../Components/Sidebar.js";
import { useHistory } from "react-router-dom";
import firebase from "../Config/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddStudents(props) {
  const history = useHistory();
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
  }, []);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gname, setGname] = useState("");
  const [relation, setRelation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [concern, setConcern] = useState("");
  const [whenconcern, setWhenconcern] = useState("");
  const [dateDiagnosed, setDatediagnosed] = useState("");
  const [currentTherapy, setCurrenttherapy] = useState("");
  const [previousTherapy, setPrevioustherapy] = useState("");
  const [heartDefect, setHeartdefect] = useState("");
  const [hearingDefect, setHearingDefect] = useState("");
  const [speechDefect, setSpeechdefect] = useState("");
  const [visionDefect, setVisiondefect] = useState("");
  const [motorAbnormalities, setMotorabnormalities] = useState("");
  const [epilepsy, setEpilepsy] = useState("");
  const [other, setOther] = useState("");
  const [motivationreason, setMotivationreason] = useState("");
  const [motivation, setMotivation] = useState("");
  const [childrate, setChildrate] = useState("");
  const [expectationrate, setExpectationrate] = useState("");
  const [expectation, setExpectation] = useState("");
  const [timeduration, setTimeduration] = useState("");
  const [gemail, setGemail] = useState("");
  const [gpassword, setGpassword] = useState("");

  const signout = () => {
    localStorage.setItem("hasUser", false);
    localStorage.setItem("duseremail", "null");
    localStorage.setItem("duseruids", "null");
    localStorage.setItem("dusername", "null");
    localStorage.setItem("dusertype", "null");
    history.push("/");
  };

  const add = () => {
    // console.log(name);
    // console.log(dob);
    // console.log(age);
    // console.log(gname);
    // console.log(relation);
    // console.log(occupation);
    // console.log(address);
    // console.log(contact);
    // console.log(concern);
    // console.log(whenconcern);
    // console.log(dateDiagnosed);
    // console.log(currentTherapy);
    // console.log(previousTherapy);
    // console.log(heartDefect);
    // console.log(hearingDefect);
    // console.log(speechDefect);
    // console.log(visionDefect);
    // console.log(motorAbnormalities);
    // console.log(epilepsy);
    // console.log(motivationreason);
    // console.log(motivation);
    // console.log(childrate);
    // console.log(expectationrate);
    // console.log(expectation);
    // console.log(timeduration);
    // console.log(gemail);
    // console.log(gpassword);

    firebase
      .auth()
      .createUserWithEmailAndPassword(gemail, gpassword)
      .then((result) => {
        firebase
          .database()
          .ref("students/" + result.user.uid)
          .set({
            name: name,
            dob: dob,
            age: age,
            gname: gname,
            relation: relation,
            occupation: occupation,
            address: address,
            contact: contact,
            concern: concern,
            whenconcern: whenconcern,
            dateDiagnosed: dateDiagnosed,
            currentTherapy: currentTherapy,
            previousTherapy: previousTherapy,
            heartDefect: heartDefect,
            hearingDefect: hearingDefect,
            speechDefect: speechDefect,
            visionDefect: visionDefect,
            motorAbnormalities: motorAbnormalities,
            epilepsy: epilepsy,
            motivationreason: motivationreason,
            motivation: motivation,
            childrate: childrate,
            other: other,
            expectationrate: expectationrate,
            expectation: expectation,
            timeduration: timeduration,
            gemail: gemail,
            gpassword: gpassword,
            progressReport: "Filled",
            filled: false,
          });

        toast.success("Student Uploaded Successfully");
      })
      .catch(function (error) {
        var errorMessage = error.message;
        toast.error(errorMessage);
      });
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
          <div className="card container">
            <div className="card-header bg-dark text-white">
              <h1>Add New Case (Child)</h1>
            </div>
            <div className="card-body">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>Child Information</h3>
                </div>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col-md-6">
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

                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>
                        Date Of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        id="date"
                        placeholder="Enter Date Of Birth"
                      />
                    </div>
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
                </div>
              </div>

              <br />

              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>Guardian Information</h3>
                </div>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>
                        Guardian Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={gname}
                        onChange={(e) => setGname(e.target.value)}
                        id="gname"
                        placeholder="Enter Guardian Name"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>
                        Relation With Child
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={relation}
                        onChange={(e) => setRelation(e.target.value)}
                        id="relation"
                        placeholder="Enter Relation"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>
                        Email For Guardian Portal
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={gemail}
                        onChange={(e) => setGemail(e.target.value)}
                        id="gname"
                        placeholder="Enter Guardian Email"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>
                        Password For Guardian Portal
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={gpassword}
                        onChange={(e) => setGpassword(e.target.value)}
                        id="password"
                        placeholder="Enter Password"
                      />
                    </div>
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
                    <div className="form-group col-md-4">
                      <label style={{ fontWeight: "bold" }}>Occupation</label>
                      <input
                        type="text"
                        className="form-control"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        id="occupation"
                        placeholder="Enter Occupation"
                      />
                    </div>
                    <div className="form-group col-md-2">
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
                </div>
              </div>

              <br />

              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>Concern Information</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>
                      Presenting Concern
                    </label>
                    <textarea
                      name="comment"
                      className="form-control"
                      placeholder="Enter Concern here..."
                      value={concern}
                      onChange={(e) => setConcern(e.target.value)}
                      form="usrform"
                    ></textarea>
                  </div>
                </div>
              </div>

              <br />

              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>History Of Concern</h3>
                </div>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>
                        From When You Have this concern?
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="By Birth"
                          onChange={(e) => setWhenconcern(e.target.value)}
                          name="whenconcern"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          By Birth
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Later"
                          onChange={(e) => setWhenconcern(e.target.value)}
                          name="whenconcern"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Later
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>
                        Date Of Diagnosed
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateDiagnosed"
                        value={dateDiagnosed}
                        onChange={(e) => setDatediagnosed(e.target.value)}
                        placeholder="Enter Date Of Diagnosed"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>
                        {" "}
                        Current on-going Treatment/ Therapy (If any)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentTherapy}
                        onChange={(e) => setCurrenttherapy(e.target.value)}
                        placeholder=" Current on-going Treatment/ Therapy (If any)"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label style={{ fontWeight: "bold" }}>
                        {" "}
                        Previous Treatment/ Therapy (If any)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={previousTherapy}
                        onChange={(e) => setPrevioustherapy(e.target.value)}
                        placeholder=" Previous Treatment/ Therapy (If any)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <br />

              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>Other Medical/ Health Conditions</h3>
                </div>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label style={{ fontWeight: "bold" }}>Heart Defect</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Yes"
                          onChange={(e) => setHeartdefect(e.target.value)}
                          name="heartdefect"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="No"
                          onChange={(e) => setHeartdefect(e.target.value)}
                          name="heartdefect"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label style={{ fontWeight: "bold" }}>
                        Hearing Defect
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Yes"
                          onChange={(e) => setHearingDefect(e.target.value)}
                          name="hearingdefect"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="No"
                          onChange={(e) => setHearingDefect(e.target.value)}
                          name="hearingdefect"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label style={{ fontWeight: "bold" }}>
                        Speech Defect
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Yes"
                          onChange={(e) => setSpeechdefect(e.target.value)}
                          name="speechdefect"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="No"
                          onChange={(e) => setSpeechdefect(e.target.value)}
                          name="speechdefect"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label style={{ fontWeight: "bold" }}>
                        Vision Defect
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Yes"
                          onChange={(e) => setVisiondefect(e.target.value)}
                          name="visiondefect"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="No"
                          onChange={(e) => setVisiondefect(e.target.value)}
                          name="visiondefect"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label style={{ fontWeight: "bold" }}>
                        Motor Abnormalities
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Yes"
                          onChange={(e) =>
                            setMotorabnormalities(e.target.value)
                          }
                          name="motor"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="No"
                          onChange={(e) =>
                            setMotorabnormalities(e.target.value)
                          }
                          name="motor"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label style={{ fontWeight: "bold" }}>Epilepsy</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Yes"
                          onChange={(e) => setEpilepsy(e.target.value)}
                          name="epilepsy"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="No"
                          onChange={(e) => setEpilepsy(e.target.value)}
                          name="epilepsy"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Other</label>
                    <textarea
                      name="comment"
                      className="form-control"
                      value={other}
                      placeholder="Leave Blank If None"
                      onChange={(e) => setOther(e.target.value)}
                    >
                      Enter here...
                    </textarea>
                  </div>
                </div>
              </div>

              <br />

              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>Motivation</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>
                      Reason for opting this therapy
                    </label>
                    <textarea
                      name="comment"
                      className="form-control"
                      value={motivationreason}
                      placeholder="Enter Reason"
                      onChange={(e) => setMotivationreason(e.target.value)}
                    >
                      Enter Reason here...
                    </textarea>
                  </div>
                  <div className="form-group col-md-4">
                    <label style={{ fontWeight: "bold" }}>Motivation</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="Self Motivated"
                        onChange={(e) => setMotivation(e.target.value)}
                        name="motivation"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Self Motivated
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="External Motivation"
                        onChange={(e) => setMotivation(e.target.value)}
                        name="motivation"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        External Motivation
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <br />

              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3>Expectations</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          className="form-label"
                        >
                          How would you rate the severity of the child’s
                          condition?
                          <br />
                          On Scale of (1 - 10)
                        </label>
                        <br />
                        <br />
                        <center>
                          <input
                            type="number"
                            className="form-control"
                            min="1"
                            max="10"
                            value={childrate}
                            onChange={(e) => setChildrate(e.target.value)}
                            id="customRange2"
                            placeholder="Enter Child Rate"
                          />
                        </center>{" "}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          className="form-label"
                        >
                          What are your expectations for the improvement of your
                          child’s condition after the therapy?
                          <br />
                          On Scale of (1 - 10)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          min="1"
                          max="10"
                          value={expectationrate}
                          onChange={(e) => setExpectationrate(e.target.value)}
                          id="customRange3"
                          placeholder="Enter Expectation Rate"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>
                      Briefly elaborate your expectation for the improvement of
                      your child’s condition after the therapy.
                    </label>
                    <textarea
                      name="comment"
                      className="form-control"
                      value={expectation}
                      onChange={(e) => setExpectation(e.target.value)}
                      placeholder="Enter Expectation"
                    >
                      Enter here...
                    </textarea>
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>
                      Expected time duration for the therapy?
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={timeduration}
                      onChange={(e) => setTimeduration(e.target.value)}
                      id="customRange2"
                      placeholder="Enter Expected Time"
                    />
                  </div>
                </div>
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-success"
                onClick={add}
                style={{ width: "max-content", marginBottom: "20px" }}
              >
                Add This Child
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

export default connect(mapStateToProps, mapDispatchToProps)(AddStudents);
