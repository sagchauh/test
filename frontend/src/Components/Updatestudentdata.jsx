// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const Updatestudentdata = () => {

//     const [updatedata, setupdatedata] = useState({});
//     console.log(updatedata, "updatedata");

//     const { id } = useParams();
//     console.log(id, "id heree");

//     const [selectedDate, setSelectedDate] = useState(null);
//     console.log(selectedDate, "selectedDate");

//     const [selecttrainingmodule, setselecttrainingmodule] = useState("")
//     console.log(selecttrainingmodule, "selecttrainingmodule")

//     const [showdropdown, setshowdropdown] = useState([]);
//     console.log(showdropdown, "showdropdown");

//     const [selectcourse, setselectcourse] = useState("");
//     console.log(selectcourse, "selectcourse");

//     const [showdbatchropdown, setshowdbatchropdown] = useState([]);
//     console.log(showdbatchropdown, "showdbatchropdown");

//     const [selectbatch, setselectbatch] = useState("");
//     console.log(selectbatch, "selectbatch");

//     const [selecttrainingmode, setselecttrainingmode] = useState("")
//     console.log(selecttrainingmode, "selecttrainingmode");

//     const [trainingmode, settrainingmode] = useState([]);
//     console.log(trainingmode, "trainingmode");

//     const [image, setImage] = useState(null);
//     console.log(image, "image")


//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//     };

//     const selecttrainingmodeinfo = (e) => {
//         setselecttrainingmode(e.target.value)
//     }

//     const selecttrainingmoduleinfo = (e) => {
//         setselecttrainingmodule(e.target.value)
//     }

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     }

//     const selectbatcheinfo = (e) => {
//         setselectbatch(e.target.value)
//     }

//     const selectcourseinfo = (e) => {
//         setselectcourse(e.target.value)
//     }

//     useEffect(() => {
//         async function update() {
//             const response = await axios.post("http://15.207.248.127:8000/singlestudentdata", {
//                 _id: id
//             })
//             console.log(response.data, "singlestudent here--")
//             setupdatedata(response.data)
//         }
//         update()
//     }, [id])


//     useEffect(() => {
//         async function showdropdown() {
//             const response = await axios.post("http://15.207.248.127:8000/getallcourse")
//             console.log(response.data, "-check");
//             setshowdropdown(response.data)

//             if (response.data.length > 0) {
//                 setselectcourse(response.data[0].course)
//             }
//         }
//         showdropdown()
//     }, [])

//     const formatDate = (date) => {
//         if (!date) return '';
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//         return `${year}-${month}-01T00:00:00.000Z`;
//     };

//     useEffect(() => {
//         async function fetchTeacherNames() {
//             if (selectedDate && selectcourse) {
//                 const response = await axios.post("http://15.207.248.127:8000/getrespectiveteachernames", {
//                     date: formatDate(selectedDate),
//                     courseId: selectcourse,
//                 });
//                 setshowdbatchropdown(response.data)
//             }
//         }
//         fetchTeacherNames();
//     }, [selectcourse, selectedDate]);

//     useEffect(() => {
//         async function fetchtrainingmode() {
//             const response = await axios.post("http://15.207.248.127:8000/getalltrainingmode");
//             settrainingmode(response.data)
//         }
//         fetchtrainingmode()
//     }, []);


//     const updateregisterclick = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("_id", updatedata._id);
//         formData.append("name", updatedata.name);
//         formData.append("email", updatedata.email);
//         formData.append("number", updatedata.number);
//         formData.append("fees", updatedata.fees);
//         formData.append("course", selectcourse);
//         formData.append("batch", selectbatch);
//         formData.append("trainingmode", selecttrainingmode);
//         formData.append("trainingmodule", selecttrainingmodule);
//         const utcDate = selectedDate ? new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())) : null;
//         formData.append("date", utcDate);

//         formData.append("image", image);

//         const response = await axios.post("http://15.207.248.127:8000/updatestudentdata", formData)
//         console.log(id, "id updatedata")
//         console.log(response.data, "updatedata")
//         setupdatedata(response.data)
//         if (response.data.status === 200) {
//             alert(response.data.message)
//         } else if (response.data.status === 400) {
//             alert(response.data.message)
//         } else if (response.data.status === 401) {
//             alert(response.data.message)
//         } else if (response.data.status === 402) {
//             alert(response.data.message)
//         }
//     }

//     const updateregisterform = (e) => {
//         var name = e.target.name;
//         var value = e.target.value;
//         setupdatedata({ ...updatedata, [name]: value })
//     }

//     return (
//         <div>
//             <h1>Updatestudentdata</h1>

//             <form onSubmit={(e) => updateregisterclick(e)}>
//                 <div className='awdiz-login-section' style={{ height: "1000px" }}>
//                     <label>name</label>
//                     <input type="text" onChange={(e) => updateregisterform(e)} name="name" value={updatedata.name} placeholder='enter your name' />
//                     <br />
//                     <br />
//                     <label>email</label>
//                     <input type="text" onChange={(e) => updateregisterform(e)} name="email" value={updatedata.email} placeholder='enter your email' />
//                     <br />
//                     <br />
//                     <label>number</label>
//                     <input type="text" onChange={(e) => updateregisterform(e)} name="number" value={updatedata.number} placeholder='enter your number' />
//                     <br />
//                     <br />
//                     <label>fees</label>
//                     <input type="text" onChange={(e) => updateregisterform(e)} name="fees" value={updatedata.fees} placeholder='enter your fees' />
//                     <br />
//                     <br />
//                     <label>Profile Image</label>
//                     <input type="file" onChange={handleImageChange} />
//                     <br />
//                     <br />
//                     <DatePicker
//                         selected={selectedDate}
//                         onChange={handleDateChange}
//                         dateFormat="MMMM yyyy"
//                         placeholderText="Select a date"
//                         showMonthYearPicker
//                         value={selectedDate ? `${selectedDate.toLocaleString('default', { month: 'long' })} ${selectedDate.getFullYear()}` : ""}
//                     />
//                     <br /><br />
//                     <select onChange={selectcourseinfo} style={{ border: "1px solid black", width: "30%" }}>
//                         <option value="">Select your course</option>
//                         {showdropdown.map((course, index) => (
//                             <option key={index} value={course._id}>
//                                 {course.course}
//                             </option>
//                         ))}
//                     </select>

//                     <br />
//                     <br />

//                     <select onChange={selectbatcheinfo} style={{ border: "1px solid black", width: "30%" }}>
//                         <option value="">Select your batch</option>
//                         {/* {showdbatchropdown.map((e, i) => (
//                             <option key={i} style={{}} value={e.batch}>
//                                 {e.batch}
//                             </option>
//                         ))} */}
//                     </select>

//                     <br />
//                     <br />

//                     <select onChange={selecttrainingmodeinfo} value={selecttrainingmode} style={{ border: "1px solid black", width: "30%" }}>
//                         <option value="">Select your training mode</option>
//                         {trainingmode.map((mode, i) => (
//                             <option key={i} value={mode.trainingmode}>
//                                 {mode.trainingmode}
//                             </option>
//                         ))}
//                     </select>

//                     <br />
//                     <br />

//                     <select onChange={selecttrainingmoduleinfo} style={{ border: "1px solid black", width: "30%" }}>
//                         <option value="">Select your trainingmodule</option>
//                         <option value="job guarentee">job guarentee</option>
//                         <option value="self placed">self placed</option>
//                         <option value="training">training</option>
//                     </select>

//                     <br />
//                     <br />

//                     <input type="submit" value="update" className='btn' />
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Updatestudentdata









import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Updatestudentdata = () => {
    const [updatedata, setupdatedata] = useState({});
    console.log(updatedata, "updatedata");

    const { id } = useParams();
    console.log(id, "id heree");

    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate, "selectedDate");

    const [selecttrainingmodule, setselecttrainingmodule] = useState("");
    console.log(selecttrainingmodule, "selecttrainingmodule");

    const [showdropdown, setshowdropdown] = useState([]);
    console.log(showdropdown, "showdropdown");

    const [selectcourse, setselectcourse] = useState("");
    console.log(selectcourse, "selectcourse");

    const [selectbatch, setselectbatch] = useState("");
    console.log(selectbatch, "selectbatch");

    const [selecttrainingmode, setselecttrainingmode] = useState("");
    console.log(selecttrainingmode, "selecttrainingmode");

    const [trainingmode, settrainingmode] = useState([]);
    console.log(trainingmode, "trainingmode");

    const [getteachername, setgetteachername] = useState([]);
    console.log(getteachername, "getteachername");

    const [teacher, setteacher] = useState([]);
    console.log(teacher, "teacher");

    const [teachername, setteachername] = useState("");
    console.log(teachername, "teachername");

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const selecttrainingmodeinfo = (e) => {
        setselecttrainingmode(e.target.value);
    };

    const selecttrainingmoduleinfo = (e) => {
        setselecttrainingmodule(e.target.value);
    };

    const selectbatcheinfo = (e) => {
        setselectbatch(e.target.value);
    };

    const selectcourseinfo = (e) => {
        setselectcourse(e.target.value);
    };

    const selectteachername = (e) => {
        setteachername(e.target.value);
    };

    useEffect(() => {
        async function update() {
            const response = await axios.post("http://15.207.248.127:8000/singlestudentdata", { _id: id });
            setupdatedata(response.data);
            setSelectedDate(new Date(response.data.date));
            setselectbatch(response.data.batch.batch);
            setselectcourse(response.data.course._id);
            setselecttrainingmodule(response.data.trainingmodule);
            setteachername(response.data.assignedteacher ? response.data.assignedteacher.name : "");
            setselecttrainingmode(response.data.trainingmode.trainingmode);
        }
        update();
    }, [id]);

    useEffect(() => {
        async function showdropdown() {
            const response = await axios.post("http://15.207.248.127:8000/getallcourse");
            setshowdropdown(response.data);
            if (response.data.length > 0) {
                setselectcourse(response.data[0]._id);
            }
        }
        showdropdown();
    }, []);

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}-01T00:00:00.000Z`;
    };

    useEffect(() => {
        async function fetchTeacherNames() {
            if (selectedDate && selectcourse) {
                const response = await axios.post("http://15.207.248.127:8000/getrespectiveteachernames", {
                    date: formatDate(selectedDate),
                    courseId: selectcourse,
                });
                setgetteachername(response.data);
            }
        }
        fetchTeacherNames();
    }, [selectcourse, selectedDate]);

    useEffect(() => {
        async function fetchtrainingmode() {
            const response = await axios.post("http://15.207.248.127:8000/getalltrainingmode");
            settrainingmode(response.data);
            if (response.data.length > 0) {
                setselecttrainingmode(response.data[0]._id);
            }
        }
        fetchtrainingmode();
    }, []);

    useEffect(() => {
        async function fetchTeacherNames() {
            if (selectcourse) {
                const response = await axios.post("http://15.207.248.127:8000/fetchteachname", {
                    courseId: selectcourse,
                });
                setteacher(response.data);
            }
        }
        fetchTeacherNames();
    }, [selectcourse]);

    const updateregisterclick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_id", updatedata._id);
        formData.append("name", updatedata.name);
        formData.append("email", updatedata.email);
        formData.append("number", updatedata.number);
        formData.append("fees", updatedata.fees);
        formData.append("course", selectcourse);
        formData.append("batch", selectbatch);
        formData.append("trainingmode", selecttrainingmode);
        formData.append("trainingmodule", selecttrainingmodule);
        formData.append("assignedteacher", teachername);
        const utcDate = selectedDate ? formatDate(selectedDate) : null;
        formData.append("date", utcDate);
        try {
            const response = await axios.post("http://15.207.248.127:8000/updatestudentdata", formData);
            setupdatedata(response.data);
            alert(response.data.message);
        } catch (error) {
            console.error("Error updating data:", error.response || error.message);
            alert("Failed to update data");
        }
    };

    const updateregisterform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setupdatedata({ ...updatedata, [name]: value });
    };

    return (
        <div>
            <h1 className='register-h1'>Update Student Data</h1>

            <form className='register-one'>
                <p className='register-two'>Personal Information</p>
                <div className='register-three'>
                    <div className='register-four'>
                        <label>Name</label>
                        <input className='register-input' type="text" onChange={(e) => updateregisterform(e)} name="name" value={updatedata.name} placeholder='Enter your name' />
                    </div>
                    <div className='register-four'>
                        <label>Number</label>
                        <input className='register-input' type="text" onChange={(e) => updateregisterform(e)} name="number" value={updatedata.number} placeholder='Enter your number' />
                    </div>
                    <div className='register-four'>
                        <label>Email</label>
                        <input className='register-input' type="text" onChange={(e) => updateregisterform(e)} name="email" value={updatedata.email} placeholder='Enter your email' />
                    </div>
                </div>
            </form>

            <form className='register-one'>
                <p className='register-two'>Course Information</p>
                <div className='register-three'>
                    <div className='register-four'>
                        <label>Date</label>
                        <DatePicker
                            className='register-input'
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="MMMM yyyy"
                            placeholderText="Select a date"
                            showMonthYearPicker
                            value={selectedDate ? `${selectedDate.toLocaleString('default', { month: 'long' })} ${selectedDate.getFullYear()}` : ""}
                        />
                    </div>
                    <div className='register-four'>
                        <label>Select Your Course</label>
                        <select className='register-input' onChange={selectcourseinfo} value={selectcourse}>
                            {showdropdown.map((course, index) => (
                                <option key={index} value={course._id}>
                                    {course.course}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='register-six'>
                        <label>Select Your Training Mode</label>
                        <select className='register-input' onChange={selecttrainingmodeinfo} value={selecttrainingmode}>
                            {trainingmode.map((mode, i) => (
                                <option key={i} value={mode.trainingmode}>
                                    {mode.trainingmode}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='register-six'>
                        <label>Select Your Batch</label>
                        <select className='register-input' onChange={selectbatcheinfo} value={selectbatch}>
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
                            <option value="job guarentee">Job Guarantee</option>
                            <option value="self placed">Self Placed</option>
                            <option value="training">Training</option>
                        </select>
                    </div>
                    <div className='register-four'>
                        <label>Fees</label>
                        <input className='register-input' type="text" onChange={(e) => updateregisterform(e)} name="fees" value={updatedata.fees} placeholder='Enter your fees' />
                    </div>
                    <div className='register-four'>
                        <label>Assigned Teacher</label>
                        <select className='register-input' onChange={selectteachername} value={teachername} style={{ border: "1px solid black", width: "30%" }}>
                            {teacher.teachers && teacher.teachers.map((teacherData, i) => (
                                <option key={i} value={teacherData.name}>
                                    {teacherData.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
            <input type="submit" value="Update" onClick={(e) => updateregisterclick(e)} className='register-btn' />
        </div>
    );
}

export default Updatestudentdata;
