import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Adminregister from './Components/Adminregister';
import Adminlogin from './Components/Adminlogin';
import Course from './Components/Course';
import Batch from './Components/Batch';
import Teacherregister from './Components/Teacherregister';
import Teacherlogin from './Components/Teacherlogin';
import Studentregister from './Components/Studentregister';
import Studentlogin from './Components/Studentlogin';
import Punchtime from './Components/Punchtime';
import Homepage from './Components/Homepage';
import Allstudentdata from './Components/Allstudentdata';
import Addstudentmarks from './Components/Addstudentmarks';
import Showstudentmarks from './Components/Showstudentmarks';
import Mainpage from './Components/Mainpage';
import Admindashboard from './Components/Admindashboard';
import Employeeregister from './Components/Employeeregister';
import Employeelogin from './Components/Employeelogin';
import Assignedteacher from './Components/Assignedteacher';
import Teacherdashboard from './Components/Teacherdashboard';
import Updatestudentdata from './Components/Updatestudentdata';
import Addstudentattendance from './Components/Addstudentattendance';
import Studentdashboard from './Components/Studentdashboard';
import Attendancetrack from './Components/Attendancetrack';
import Addnotice from './Components/Addnotice';
import Addcomplain from './Components/Addcomplain';
import Showcomplain from './Components/Showcomplain';
import Adddrivelink from './Components/Adddrivelink';
import Createsubject from './Components/Createsubject';
import Updatestudentmark from './Components/Updatestudentmark';
import Otp from './Components/Otp';
import Forgetpassword from './Components/Forgetpassword';
import Forgetpassotp from './Components/Forgetpassotp';
import Resetpassword from './Components/Resetpassword';
import Alladminlist from './Components/Alladminlist';
import Updateadmindata from './Components/Updateadmindata';
import Createtrainingmode from './Components/Createtrainingmode';
import Multipleattendance from './Components/Multipleattendance';
import EditAttendance from './Components/EditAttendance';
import Addperformance from './Components/Addperformance';
import Reviewperformance from './Components/Reviewperformance';
import Editpreviewperformance from './Components/Editpreviewperformance';
import Multiplereview from './Components/Multiplereview';
import Notfoundpage from './Components/Notfoundpage';
import Employeelist from './Components/Employeelist';
import Updateemployeedata from './Components/Updateemployeedata';
import Employeeattendancetrack from './Components/Employeeattendancetrack';
import Employeedashboard from './Components/Employeedashboard';
import Editemployeeattendance from './Components/Editemployeeattendance';


function App() {
  const location = useLocation();

  const validPaths = [
    "/mainpage",
    "/admindashboard",
    "/adminregister",
    "/adminlogin",
    "/alladminlist",
    "/alladminlist/:id",
    "/course",
    "/batch",
    "/teacherregister",
    "/teacherlogin",
    "/studentregister",
    "/",
    "/punchtime/:id",
    "/allstudentdata",
    "/allstudentdata/:id",
    "/showstudentmarks/:id",
    "/employeeregister",
    "/employeelogin",
    "/assignedteacher/:id",
    "/teacherdashboard",
    "/updatestudentdata/:id",
    "/addstudentattendance/:id",
    "/studentdashboard",
    "/attendancetrack/:id",
    "/addnotice",
    "/addcomplain/:id",
    "/showcomplain",
    "/adddrivelink/:id",
    "/createsubject",
    "/updatestudentmark/:id",
    "/otp",
    "/forgetpassword",
    "/forgetpassotp",
    "/resetpassword",
    "/createtrainingmode",
    "/multipleattendance",
    "/editAttendance/:id",
    "/addperformance/:id",
    "/reviewperformance/:id",
    "/editpreviewperformance/:id",
    "/multiplereview",
    "/employeelist",
    "/updateemployeedata/:id",
    "/employeeattendancetrack/:id",
    "/employeedashboard",
    "/editemployeeattendance/:id"
  ];

  const isPathValid = validPaths.includes(location.pathname) || validPaths.some(path => path.includes(":") && location.pathname.startsWith(path.split("/:")[0]));

  return (
    <div className="App">
      {isPathValid && <Homepage />}
      <Routes>
        <Route exact path="*" element={<Notfoundpage />} />
        <Route exact path="/mainpage" element={<Mainpage />} />
        <Route exact path="/admindashboard" element={<Admindashboard />} />
        {/* <Route exact path="/homepage" element={<Homepage />} /> */}
        <Route exact path="/adminregister" element={<Adminregister />} />
        <Route exact path="/adminlogin" element={<Adminlogin />} />
        <Route exact path="/alladminlist" element={< Alladminlist />} />
        <Route exact path="/alladminlist/:id" element={< Updateadmindata />} />
        <Route exact path="/course" element={<Course />} />
        <Route exact path="/batch" element={<Batch />} />
        <Route exact path="/teacherregister" element={<Teacherregister />} />
        <Route exact path="/teacherlogin" element={<Teacherlogin />} />
        <Route exact path="/studentregister" element={<Studentregister />} />
        <Route exact path="/" element={<Studentlogin />} />
        <Route exact path="/punchtime/:id" element={<Punchtime />} />
        <Route exact path="/allstudentdata" element={<Allstudentdata />} />
        <Route exact path="/allstudentdata/:id" element={<Addstudentmarks />} />
        <Route exact path="/showstudentmarks/:id" element={<Showstudentmarks />} />
        <Route exact path="/employeeregister" element={<Employeeregister />} />
        <Route exact path="/employeelogin" element={<Employeelogin />} />
        <Route exact path="/assignedteacher/:id" element={<Assignedteacher />} />
        <Route exact path="/teacherdashboard" element={<Teacherdashboard />} />
        <Route exact path="/updatestudentdata/:id" element={<Updatestudentdata />} />
        <Route exact path="/addstudentattendance/:id" element={<Addstudentattendance />} />
        <Route exact path="/studentdashboard" element={<Studentdashboard />} />
        <Route exact path="/attendancetrack/:id" element={<Attendancetrack />} />
        <Route exact path="/addnotice" element={<Addnotice />} />
        <Route exact path="/addcomplain/:id" element={<Addcomplain />} />
        <Route exact path="/showcomplain" element={<Showcomplain />} />
        <Route exact path="/adddrivelink/:id" element={<Adddrivelink />} />
        <Route exact path="/createsubject" element={<Createsubject />} />
        <Route exact path="/updatestudentmark/:id" element={< Updatestudentmark />} />
        <Route exact path="/otp" element={< Otp />} />
        <Route exact path="/forgetpassword" element={< Forgetpassword />} />
        <Route exact path="/forgetpassotp" element={< Forgetpassotp />} />
        <Route exact path="/resetpassword" element={< Resetpassword />} />
        <Route exact path="/createtrainingmode" element={< Createtrainingmode />} />
        <Route exact path="/multipleattendance" element={< Multipleattendance />} />
        <Route exact path="/editAttendance/:id" element={< EditAttendance />} />
        <Route exact path="/addperformance/:id" element={< Addperformance />} />
        <Route exact path="/reviewperformance/:id" element={< Reviewperformance />} />
        <Route exact path="/editpreviewperformance/:id" element={< Editpreviewperformance />} />
        <Route exact path="/multiplereview" element={< Multiplereview />} />
        <Route exact path="/employeelist" element={<Employeelist />} />
        <Route exact path="/updateemployeedata/:id" element={<Updateemployeedata />} />
        <Route exact path="/employeeattendancetrack/:id" element={<Employeeattendancetrack />} />
        <Route exact path="/employeedashboard" element={<Employeedashboard />} />
        <Route exact path="/editemployeeattendance/:id" element={<Editemployeeattendance />} />
      </Routes>
    </div>
  );
}

export default App;
