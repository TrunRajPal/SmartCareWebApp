import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {set_user} from '../../Store/action'
import '../../Css/home.css'
import firebase from '../../Config/firebase.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function GsignUp(props){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const createGaccount=()=>{

        console.log(email)
        console.log(password)

            localStorage.setItem("duseremail", "null");
            localStorage.setItem("duseruids", "null");
            localStorage.setItem("hasUser", false);
            
            
            toast("Please Wait")
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                localStorage.setItem("duseremail", email);
            
                
                localStorage.setItem("duseremail",result.user.email)
                localStorage.setItem("duseruids",result.user.uid)
                localStorage.setItem("dusername",result.user.displayName)
            
                localStorage.setItem("hasUser",true)

                firebase.database().ref('students/'+result.user.uid).set({
                    name:"",
                    dob:"",
                    age:"",
                    gname:"",
                    relation:"",
                    occupation:"",
                    address:"",
                    contact:"",
                    concern:"",
                    whenconcern:"",
                    dateDiagnosed:"",
                    currentTherapy:"",
                    previousTherapy:"",
                    heartDefect:"",
                    hearingDefect:"",
                    speechDefect:"",
                    visionDefect:"",
                    motorAbnormalities:"",
                    epilepsy:"",
                    motivationreason:"",
                    motivation:"",
                    childrate:"",
                    other:"",
                    expectationrate:"",
                    expectation:"",
                    timeduration:"",
                    gemail:localStorage.getItem('duseremail'),
                    gpassword:localStorage.getItem('duserpassword'),
                    progressReport:'Unfilled',
                    filled:false
                    
                })
            
            
                toast.success("Guardian Signup Successful");
    
            
            
            })
            .catch(function(error) {
    
                var errorMessage = error.message;
                toast.error(errorMessage);
        
            });
    
      
    }



    return(
        <>
       <div className="main">
           
       <div className=" w3l-login-form">
        <h2 style={{color:'#fff',fontWeight:'bolder'}}>Guardian SignUp</h2>
        <div>

            <div className=" w3l-form-group">
                <label>Email Address:</label>
                <div className="group">
                    <i className="fa fa-user"></i>
                    <input type="email" className="form-control" placeholder="Email Address" onChange={e => setEmail(e.target.value)} required="required" />
                </div>
            </div>
            <div className=" w3l-form-group">
                <label>Password:</label>
                <div className="group">
                    <i className="fa fa-unlock"></i>
                    <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} required="required" />
                </div>
            </div>
        
            <button onClick={createGaccount} type="submit">Create Account</button>
        </div><br/>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <Link to="/" className="register">Admin Login</Link><br/>
        <Link to="/guardian/home" className="register">Guardian Login</Link>
        <Link to="/instructor/home" className="register">Instructor Login</Link>
        
        </div>
        
    </div>
       </div>
       <ToastContainer />
        </>
    )
}


const mapStateToProps = (state) => ({
    hasUser:state.hasUser,
    currentUsername:state.currentUsername
})
  
const mapDispatchToProps = (dispatch) => ({
    set_user:(name,email,photoURL,uid)=> dispatch(set_user(name,email,photoURL,uid))
})
  
  
export default connect(mapStateToProps,mapDispatchToProps)(GsignUp);