import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "../Components/Sidebar.js";
import { useHistory } from "react-router-dom";
import firebase from "../Config/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddProgressReport(props) {
  const history = useHistory();
  const [id, setId] = useState("");
  const [expectation, setExpectation] = useState("");
  const [childmotivation, setChildmotivation] = useState("");
  const [guardianmotivation, setGuardianmotivation] = useState("");
  const [finalstatus, setfinalStatus] = useState("");
  const [comments, setComments] = useState("");

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
  const [sexpectation, setsExpectation] = useState("");
  const [timeduration, setTimeduration] = useState("");
  const [gemail, setGemail] = useState("");
  const [gpassword, setGpassword] = useState("");

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
    setId(props.match.params.key);

    const userRef = firebase
      .database()
      .ref("students")
      .child(props.match.params.key);
    userRef.on("value", (snapshot) => {
      const dataVal = snapshot.val();
      setName(dataVal.name);
      setDob(dataVal.dob);
      setAge(dataVal.age);
      setGname(dataVal.gname);
      setRelation(dataVal.relation);
      setOccupation(dataVal.occupation);
      setAddress(dataVal.address);
      setContact(dataVal.contact);
      setConcern(dataVal.concern);
      setWhenconcern(dataVal.whenconcern);
      setDatediagnosed(dataVal.dateDiagnosed);
      setCurrenttherapy(dataVal.currentTherapy);
      setPrevioustherapy(dataVal.previousTherapy);
      setHeartdefect(dataVal.heartDefect);
      setHearingDefect(dataVal.hearingDefect);
      setSpeechdefect(dataVal.speechDefect);
      setVisiondefect(dataVal.visionDefect);
      setMotorabnormalities(dataVal.motorAbnormalities);
      setEpilepsy(dataVal.epilepsy);
      setOther(dataVal.other);
      setMotivationreason(dataVal.motivationreason);
      setMotivation(dataVal.motivation);
      setChildrate(dataVal.childrate);
      setExpectationrate(dataVal.expectationrate);
      setsExpectation(dataVal.expectation);
      setTimeduration(dataVal.timeduration);
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

  const add = () => {
    firebase
      .database()
      .ref("adminprogrssreport/" + props.match.params.key)
      .set({
        id: id,
        expectation: expectation,
        childmotivation: childmotivation,
        guardianmotivation: guardianmotivation,
        finalstatus: finalstatus,
        comments: comments,
      });

    firebase
      .database()
      .ref("students/" + props.match.params.key)
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
        expectation: sexpectation,
        timeduration: timeduration,
        gemail: gemail,
        gpassword: gpassword,
        progressReport: "Filled",
        filled: true,
      });
    toast.success("Progress Report Uploaded Successfully");
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
              <h3>Progress Report</h3>
              <hr />

              <div className="form-group">
                <label htmlFor="childId">Child Id</label>
                <input
                  type="text"
                  className="form-control"
                  value={props.match.params.key}
                  onChange={(e) => setId(e.target.value)}
                  id="childId"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Expectation</label>
                <select
                  className="form-control"
                  value={expectation}
                  onChange={(e) => setExpectation(e.target.value)}
                >
                  <option>Select One Option</option>
                  <option>Realistic</option>
                  <option>Non-Realistic</option>
                </select>{" "}
              </div>

              <div className="form-group">
                <label>Child Motivation</label>
                <select
                  className="form-control"
                  value={childmotivation}
                  onChange={(e) => setChildmotivation(e.target.value)}
                >
                  <option>Select One Option</option>
                  <option>Not Motivated</option>
                  <option>Moderate</option>
                  <option>Highly Motivated</option>
                </select>
              </div>

              <div className="form-group">
                <label>Guardian Motivation</label>
                <select
                  className="form-control"
                  value={guardianmotivation}
                  onChange={(e) => setGuardianmotivation(e.target.value)}
                >
                  <option>Select One Option</option>
                  <option>Not Motivated</option>
                  <option>Moderate</option>
                  <option>Highly Motivated</option>
                </select>
              </div>

              <div className="form-group">
                <label>Final Status</label>
                <select
                  className="form-control"
                  value={finalstatus}
                  onChange={(e) => setfinalStatus(e.target.value)}
                >
                  <option>Select One Option</option>
                  <option>Accepted</option>
                  <option>Not Accepted</option>
                  <option>Further Evaluation Required</option>
                </select>
              </div>

              <div className="form-group">
                <label>Comments</label>
                <input
                  type="text"
                  className="form-control"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter Comment"
                />
              </div>

              <br />

              <button
                type="submit"
                className="btn btn-primary"
                onClick={add}
                style={{ width: "max-content", marginBottom: "20px" }}
              >
                Add Report
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProgressReport);
