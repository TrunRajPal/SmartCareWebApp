import React from 'react'
import { connect } from 'react-redux'
import Home from '../Pages/home.js'
import GuardianHome from '../Pages/Guardian/home.js'
import InstructorHome from '../Pages/Instructor/home.js'



import Dashboard from '../Pages/dashboard.js'
import ManageStudents from '../Pages/manage_students.js'
import ManageInstructors from '../Pages/manage_instructors.js'
import ManageServices from '../Pages/manage_services.js'
import ManageRequests from '../Pages/manage_requests.js'
import ManageProgressReports from '../Pages/manage_progressreports.js'
import AddStudents from '../Pages/add_students.js'
import UpdateStudents from '../Pages/update_students.js'
import AddInstructors from '../Pages/add_instructor.js'
import UpdateInstructors from '../Pages/update_instructors.js'
import AddProgressReport from '../Pages/add_progrssreport.js'
import UpdateProgressReports from '../Pages/update_progressreports.js'
import AddServices from '../Pages/add_services.js'
import UpdateServices from '../Pages/update_services.js'
import UpdateRequests from '../Pages/update_requests'
import ManageAdmins from '../Pages/manage_admins.js'
import AddAdmin from '../Pages/add_admin.js'
import UpdateProfile from '../Pages/update_profile.js'



import GsignUp from '../Pages/Guardian/gsignup.js'
import GDashboard from '../Pages/Guardian/gdashboard.js'
import GProfile from '../Pages/Guardian/gprofile.js'
import GRequestservice from '../Pages/Guardian/grequestservice.js'
import GAddRequestservice from '../Pages/Guardian/gadd_requestservice'
import GProgrssreport from '../Pages/Guardian/gprogressreport.js'
import GSessionreport from '../Pages/Guardian/gsessionreport.js'
import GAllServices from '../Pages/Guardian/gall_services.js'
import GAddservice from '../Pages/Guardian/gaddservice.js'
import Viewsessionreport from '../Pages/Guardian/viewsessionreport.js'
import GPayments from '../Pages/Guardian/gpayments.js'
import GUpdateprofile from '../Pages/Guardian/gupdateprofile.js'
import GReschedual from '../Pages/Guardian/greschedual.js'


import IDashboard from '../Pages/Instructor/idashboard.js'
import IProfile from '../Pages/Instructor/iprofile'
import Schedual from '../Pages/Instructor/schedual.js'
import Addsessionreport from '../Pages/Instructor/addsessionreport.js'
import Updatesessionreport from '../Pages/Instructor/updatesessionreport.js'
import ISessionreports from '../Pages/Instructor/isessionreport.js'

import {BrowserRouter as Router,Route} from "react-router-dom";

function AppRouter(){
    
    return(
        <>
        <Router>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/guardian/home' component={GuardianHome}></Route>
            <Route exact path='/instructor/home' component={InstructorHome}></Route>
            <Route exact path='/dashboard' component={Dashboard}></Route>
            <Route exact path='/managestudents' component={ManageStudents}></Route>
            <Route exact path='/manageinstructors' component={ManageInstructors}></Route>
            <Route exact path='/manageservices' component={ManageServices}></Route>
            <Route exact path='/managerequests' component={ManageRequests}></Route>
            <Route exact path='/manage_progressreports' component={ManageProgressReports}></Route>
            <Route exact path='/addstudents' component={AddStudents}></Route>
            <Route exact path='/updatestudent/:key' component={UpdateStudents}></Route>
            <Route exact path='/addinstructors' component={AddInstructors}></Route>
            <Route exact path='/updateinstructor/:key' component={UpdateInstructors}></Route>
            <Route exact path='/AddProgressReport/:key' component={AddProgressReport}></Route>
            <Route exact path='/updateprogressreport/:key' component={UpdateProgressReports}></Route>
            <Route exact path='/addservices' component={AddServices}></Route>
            <Route exact path='/updateservice/:key' component={UpdateServices}></Route>
            <Route exact path='/updaterequests/:key' component={UpdateRequests}></Route>
            <Route exact path='/manage_admins' component={ManageAdmins}></Route>
            <Route exact path='/addadmin' component={AddAdmin}></Route>
            <Route exact path='/updateprofile' component={UpdateProfile}></Route>
            



            <Route exact path='/guardian/gsignup' component={GsignUp}></Route>
            <Route exact path='/guardian/gdashboard' component={GDashboard}></Route>
            <Route exact path='/guardian/gprofile' component={GProfile}></Route>
            <Route exact path='/guardian/grequestservice' component={GRequestservice}></Route>
            <Route exact path='/guardian/gprogressreport' component={GProgrssreport}></Route>
            <Route exact path='/guardian/gsessionreport' component={GSessionreport}></Route>
            <Route exact path='/guardian/gallservices' component={GAllServices}></Route>
            <Route exact path='/guardian/gaddrequestservice/:key' component={GAddRequestservice}></Route>
            <Route exact path='/gaddservice/:key' component={GAddservice}></Route>
            <Route exact path='/viewsessionreport/:key' component={Viewsessionreport}></Route>
            <Route exact path='/guardian/gpayments' component={GPayments}></Route>
            <Route exact path='/guardian/gupdateprofile' component={GUpdateprofile}></Route>
            <Route exact path='/greschedual/:key' component={GReschedual}></Route>
            


            <Route exact path='/instructor/idashboard' component={IDashboard}></Route>
            <Route exact path='/instructor/iprofile' component={IProfile}></Route>
            <Route exact path='/instructor/schedual' component={Schedual}></Route>
            <Route exact path='/addsessionreport/:key' component={Addsessionreport}></Route>
            <Route exact path='/updatesessionreport/:key' component={Updatesessionreport}></Route>
            <Route exact path='/instructor/isessionreports' component={ISessionreports}></Route>
            
            
        </Router>
        </>
    )
    
}

const mapStateToProps = (state) => ({
    hasUser:state.hasUser,
    currentUser:state.currentUser
})
  
const mapDispatchToProps = (dispatch) => ({
})
  
  
export default connect(mapStateToProps,mapDispatchToProps)(AppRouter);