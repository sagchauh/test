import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Studentregister = () => {
    const [studentregisterdata, setstudentregisterdata] = useState({
        name: "",
        email: "",
        password: "",
        number: "",
        fees: "",

        image: null
    });
    console.log(studentregisterdata, "studentregisterdata")

    const [selectbatch, setselectbatch] = useState("");
    console.log(selectbatch, "selectbatch")

    const [selectcourse, setselectcourse] = useState("");
    console.log(selectcourse, "selectcourse")

    const [showdbatchropdown, setshowdbatchropdown] = useState([]);
    console.log(showdbatchropdown, "showdbatchropdown")

    const [selecttrainingmode, setselecttrainingmode] = useState("");
    console.log(selecttrainingmode, "selecttrainingmode")

    const [selecttrainingmodule, setselecttrainingmodule] = useState("");
    console.log(selecttrainingmodule, "selecttrainingmodule")

    const [showdropdown, setshowdropdown] = useState([]);
    console.log(showdropdown, "showdropdown")

    const [getteachername, setgetteachername] = useState([]);
    console.log(getteachername, "getteachername")

    const [teachername, setteachername] = useState("");
    console.log(teachername, "teachername")

    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate, "selectedDate");

    const [trainingmode, settrainingmode] = useState([]);
    console.log(trainingmode, "trainingmode");

    const [teacher, setteacher] = useState([]);
    console.log(teacher, "teacher");

    const studentregisterclick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", studentregisterdata.name);
        formData.append("email", studentregisterdata.email);
        formData.append("password", studentregisterdata.password);
        formData.append("number", studentregisterdata.number);
        formData.append("fees", studentregisterdata.fees);
        formData.append("course", selectcourse);
        formData.append("batch", selectbatch);
        formData.append("trainingmode", selecttrainingmode);
        formData.append("trainingmodule", selecttrainingmodule);
        formData.append("assignedteacher", teachername);
        const utcDate = selectedDate ? new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())) : null;
        formData.append("date", utcDate);

        if (studentregisterdata.image) formData.append("image", studentregisterdata.image);

        const response = await axios.post("http://15.207.248.127:8000/studentregister", formData);
        if (response.data.status === 200) {
            alert(response.data.message);
            setstudentregisterdata({ name: "", email: "", password: "", number: "", fees: "", image: null });
            setselectcourse("");
            setselectbatch("");
            setselecttrainingmode("");
            setselecttrainingmodule("");
            setteachername("");
            setSelectedDate(null);
        } else {
            alert(response.data.message);
        }
    };

    const studentregisterform = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setstudentregisterdata({ ...studentregisterdata, [name]: value });
    };

    const selectcourseinfo = (e) => {
        setselectcourse(e.target.value);
    };

    const selectbatcheinfo = (e) => {
        setselectbatch(e.target.value);
    };

    const selecttrainingmodeinfo = (e) => {
        setselecttrainingmode(e.target.value);
    };

    const selecttrainingmoduleinfo = (e) => {
        setselecttrainingmodule(e.target.value);
    };

    const selectteachername = (e) => {
        setteachername(e.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        async function fetchCourses() {
            const response = await axios.post("http://15.207.248.127:8000/getallcourse");
            setshowdropdown(response.data);
        }
        fetchCourses();
    }, []);

    useEffect(() => {
        async function fetchtrainingmode() {
            const response = await axios.post("http://15.207.248.127:8000/getalltrainingmode");
            settrainingmode(response.data)
        }
        fetchtrainingmode()
    }, [])

    useEffect(() => {
        async function fetchBatches() {
            const response = await axios.post("http://15.207.248.127:8000/getallbatch");
            if (response.data) {
                setshowdbatchropdown(response.data.map(batch => ({
                    ...batch,
                    onlineAvailable: batch.maxStudents - (batch.onlineEnrollment || 0),
                    offlineAvailable: batch.maxStudents - (batch.offlineEnrollment || 0),
                })));
            }
        }
        fetchBatches();
    }, []);

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        return `${year}-${month}-01T00:00:00.000Z`;
    };

    useEffect(() => {
        async function fetchTeacherNames() {
            if (selectedDate && selectcourse) {
                const response = await axios.post("http://15.207.248.127:8000/getrespectiveteachernames", {
                    date: formatDate(selectedDate),
                    courseId: selectcourse,
                });
                setgetteachername(response.data)
            }
        }
        fetchTeacherNames();
    }, [selectcourse, selectedDate]);

    useEffect(() => {
        async function fetchTeacherNames() {
            if (selectcourse) {
                const response = await axios.post("http://15.207.248.127:8000/fetchteachname", {
                    courseId: selectcourse
                });
                console.log(response.data)
                setteacher(response.data);
            }
        }
        fetchTeacherNames();
    }, [selectcourse]);

    return (
        <div>


         

            <h1 className='register-h1'>Student Registration</h1>

            <form className='register-one'>
                <p className='register-two'>Personal Information</p>
                <div className='register-three'>
                    <div className='register-four'>
                        <label>Name</label>
                        <input className='register-input' type="text" onChange={studentregisterform} name="name" value={studentregisterdata.name} placeholder='enter your name' />
                    </div>
                    <div className='register-four'>
                        <label>Number</label>
                        <input className='register-input' type="text" onChange={studentregisterform} name="number" value={studentregisterdata.number} placeholder='enter your number' />
                    </div>
                    <div className='register-four'>
                        <label>Email</label>
                        <input className='register-input' type="text" onChange={studentregisterform} name="email" value={studentregisterdata.email} placeholder='enter your email' />
                    </div>
                    <div className='register-four'>
                        <label>Password</label>
                        <input className='register-input' type="text" onChange={studentregisterform} name="password" value={studentregisterdata.password} placeholder='enter your password' />
                    </div>
                    <div className='register-four'>
                        <label>Upload Profile Image</label>
                        <input className='register-profile' type="file" onChange={(e) => setstudentregisterdata({ ...studentregisterdata, image: e.target.files[0] })} />
                    </div>
                </div>
            </form>

            <form className='register-one'>
                <p className='register-two'>Course Information</p>
                <div className='register-three'>
                    <div className='register-four'>
                        <label>Date</label>
                        <DatePicker className='register-input'
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="MMMM yyyy" // Display format
                            placeholderText="Select a date"
                            showMonthYearPicker
                            value={selectedDate ? `${selectedDate.toLocaleString('default', { month: 'long' })} ${selectedDate.getFullYear()}` : ""}
                        />
                    </div>
                    <div className='register-four'>
                        <label>Select Your Course</label>
                        <select className='register-input' onChange={selectcourseinfo} value={selectcourse} >
                            <option value="">Select your course</option>
                            {showdropdown.map((course, index) => (
                                <option key={index} value={course._id}>
                                    {course.course}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='register-six'>
                        <label>Select Your Training Mode</label>
                        <select className='register-input' onChange={selecttrainingmodeinfo} value={selecttrainingmode}  >
                            <option value="">Select your training mode</option>

                            {trainingmode.map((mode, i) => (
                                <option key={i} value={mode.trainingmode}>
                                    {mode.trainingmode}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='register-six'>
                        <label>Select Your Batch</label>
                        <select className='register-input' onChange={selectbatcheinfo} value={selectbatch} >
                            <option value="">Select your batch</option>
                            {getteachername.map((batch, i) => (
                                <option key={i} value={batch.batch}>
                                    {batch.batch} - Online: {batch.maxStudents - (batch.onlineEnrollment || 0)} slots, Offline: {batch.maxStudents - (batch.offlineEnrollment || 0)} slots
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='register-six'>
                        <label>Select Your Training Module</label>
                        <select className='register-input' onChange={selecttrainingmoduleinfo} value={selecttrainingmodule}>
                            <option value="">Select your training module</option>
                            <option value="jobguarentee">job guarantee</option>
                            <option value="selfplaced">self-paced</option>
                            <option value="training">training</option>
                        </select>
                    </div>
                    <div className='register-four'>
                        <label>Fees</label>
                        <input className='register-input' type="text" onChange={studentregisterform} name="fees" value={studentregisterdata.fees} placeholder='enter your fees' />
                    </div>
                    <div className='register-four'>
                        <label>Assigned Teacher</label>
                        <select className='register-input' onChange={selectteachername} value={teachername} >
                            <option value="">Assigned Teacher</option>
                            {teacher.teachers && teacher.teachers.map((teacherData, i) => (
                                <option key={i} value={teacherData.name}>
                                    {teacherData.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
            <input type="submit" value="register" onClick={studentregisterclick} className='register-btn' />

        </div>
    );
}

export default Studentregister;
