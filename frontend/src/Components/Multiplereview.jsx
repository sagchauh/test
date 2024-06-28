// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const Multiplereview = () => {
//     const [studentdetails, setstudentdetails] = useState([]);
//     console.log(studentdetails, "studentdetails");

//     const [studentIds, setStudentIds] = useState([]);
//     console.log(studentIds, "studentIds");

//     const [selectedDates, setSelectedDates] = useState({});
//     console.log(selectedDates, "selectedDates");

//     const [performances, setPerformances] = useState({});
//     console.log(performances, "performances");

//     const[subject, setsubject] = useState({});
//     console.log(subject, "subject")

//     const location = useLocation();

//     useEffect(() => {
//         const fetchstudentId = async () => {
//             const queryParams = new URLSearchParams(location.search);
//             const studentIdsString = queryParams.get('studentIds');
//             if (studentIdsString) {
//                 const parsedStudentIds = JSON.parse(studentIdsString);
//                 setStudentIds(parsedStudentIds);

//                 const details = await fetchStudentDetails(parsedStudentIds);
//                 setstudentdetails(details);
//             }
//         };
//         fetchstudentId();
//     }, [location.search]);

//     const fetchStudentDetails = async (studentIds) => {
//         try {
//             const studentdetails = [];
//             for (const studentId of studentIds) {
//                 const response = await axios.post("http://localhost:8000/studentdetails", {
//                     _id: studentId
//                 });
//                 studentdetails.push(response.data);
//             }
//             return studentdetails;
//         } catch (error) {
//             console.error("Error fetching student details:", error);
//             return [];
//         }
//     };

//     const handleDateChange = (date, studentId) => {
//         setSelectedDates((prevDates) => ({
//             ...prevDates,
//             [studentId]: date,
//         }));
//     };

//     const handlePerformanceChange = (event, studentId) => {
//         const { value } = event.target;
//         setPerformances((prevPerformances) => ({
//             ...prevPerformances,
//             [studentId]: value,
//         }));
//     };

//     const savedperformance = async (e) => {
//         e.preventDefault();
//         alert("working");

//         for (const studentId of studentIds) {
//             const date = selectedDates[studentId];
//             const performancestatus = performances[studentId]

//             if (date && performancestatus) {
//                 const response = await axios.post("http://localhost:8000/multipleperformance", {
//                     _id: studentId,
//                     date: date,
//                     performancestatus: performancestatus,
//                     subject:subject
//                 })
//                 console.log(response.data, "respone check--");
//                 if (response.data.status === 200) {
//                     alert(response.data.message);
//                     setSelectedDates({})
//                     setPerformances({});
//                     setsubject({})
//                 } else if (response.data.status === 400) {
//                     alert(response.data.message);
//                     setSelectedDates({})
//                     setPerformances({})
//                     setsubject({})
//                 } else if (response.data.status === 401) {
//                     alert(response.data.message);
//                     setSelectedDates({})
//                     setPerformances({})
//                     setsubject({})
//                 } else if (response.data.status === 402) {
//                     alert(response.data.message);
//                     setSelectedDates({})
//                     setPerformances({})
//                     setsubject({})
//                 }
//             }
//         }
//     }

//     return (
//         <div>
//             <h1>Multiplereview</h1>

//             <div style={{ border: "1px solid black", width: "100%", height: "100px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <div style={{ border: "1px solid black", width: "33%", height: "100%" }}>
//                     <h3>Name</h3>
//                 </div>
//                 <div style={{ border: "1px solid black", width: "33%", height: "100%" }}>
//                     <h3>Date</h3>
//                 </div>
//                 <div style={{ border: "1px solid black", width: "34%", height: "100%" }}>
//                     <h3>Performance</h3>
//                 </div>
//             </div>

//             {studentdetails.map((student, index) => (
//                 <div key={index} style={{ border: "1px solid black", width: "100%", height: "100px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <div style={{ border: "1px solid black", width: "33%", height: "100%" }}>
//                         <p>{student.name}</p>
//                     </div>
//                     <div style={{ border: "1px solid black", width: "33%", height: "100%" }}>
//                         <DatePicker
//                             selected={selectedDates[student._id] || null}
//                             onChange={(date) => handleDateChange(date, student._id)}
//                             dateFormat="yyyy-MM-dd"
//                             placeholderText="Select a date"
//                             minDate={new Date()}
//                             maxDate={new Date()}
//                         />
//                     </div>
//                     <div style={{ border: "1px solid black", width: "34%", height: "100%" }}>
//                         <select
//                             value={performances[student._id] || ''}
//                             onChange={(event) => handlePerformanceChange(event, student._id)}
//                         >
//                             <option value="">Select your performance</option>
//                             <option value="good">Good</option>
//                             <option value="average">Average</option>
//                             <option value="bad">Bad</option>
//                             <option value="absent">Absent</option>
//                         </select>
//                     </div>
//                 </div>
//             ))}
//             <br />
//             <br />

//             <button onClick={(e) => savedperformance(e)}>Saved the performance</button>
//         </div>
//     );
// };

// export default Multiplereview;






import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Multiplereview = () => {
    const [studentdetails, setstudentdetails] = useState([]);
    console.log(studentdetails, "studentdetails");

    const [studentIds, setStudentIds] = useState([]);
    console.log(studentIds, "studentIds");

    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate, "selectedDate");

    const [subject, setSubject] = useState('');
    console.log(subject, "subject");

    const [performances, setPerformances] = useState({});
    console.log(performances, "performances");

    const location = useLocation();

    useEffect(() => {
        const fetchstudentId = async () => {
            const queryParams = new URLSearchParams(location.search);
            const studentIdsString = queryParams.get('studentIds');
            if (studentIdsString) {
                const parsedStudentIds = JSON.parse(studentIdsString);
                setStudentIds(parsedStudentIds);

                const details = await fetchStudentDetails(parsedStudentIds);
                setstudentdetails(details);
            }
        };
        fetchstudentId();
    }, [location.search]);

    const fetchStudentDetails = async (studentIds) => {
        try {
            const studentdetails = [];
            for (const studentId of studentIds) {
                const response = await axios.post("http://localhost:8000/studentdetails", {
                    _id: studentId
                });
                studentdetails.push(response.data);
            }
            return studentdetails;
        } catch (error) {
            console.error("Error fetching student details:", error);
            return [];
        }
    };

    const handlePerformanceChange = (event, studentId) => {
        const { value } = event.target;
        setPerformances((prevPerformances) => ({
            ...prevPerformances,
            [studentId]: value,
        }));
    };

    const savedperformance = async (e) => {
        e.preventDefault();

        if (!selectedDate || !subject) {
            alert("Please select a date and enter a subject.");
            return;
        }

        for (const studentId of studentIds) {
            const performancestatus = performances[studentId];

            if (performancestatus) {
                const response = await axios.post("http://localhost:8000/multipleperformance", {
                    _id: studentId,
                    date: selectedDate,
                    performancestatus: performancestatus,
                    subject: subject
                });

                console.log(response.data, "response check--");
                if (response.data.status === 200) {
                    alert(response.data.message);
                } else {
                    alert(response.data.message);
                }
            }
        }

        // Clear the state after saving
        setSelectedDate(null);
        setSubject('');
        setPerformances({});
    }

    return (
        <div>

            <h1 className='student-drive'>Multiplereview</h1>

            <div className='teacher-eleven'>
                <div className='mul-review-one'>
                    <div className='mul-datepicker'>
                        <label className='review-sub'>Select your date</label>
                        <DatePicker className='review-date'
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a date"
                            minDate={new Date()}
                        // maxDate={new Date()}
                        />
                    </div>
                    <div className='mul-datepicker'>
                        <label className='review-sub'>Subject</label>
                        <input className='complain-input review-two'
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter subject"
                        />
                    </div>
                </div>
            </div>

            <div className='review-three'>
                <div className='teacher-twelve'>
                    <div className='review-dash'>
                        <p className='teacher-fifteen'>Name</p>
                    </div>
                    <div className='review-dash'>
                        <p className='teacher-fifteen'>Performance</p>
                    </div>
                </div>

                {studentdetails.map((student, index) => (
                    <div key={index}  className='show-data'>
                        <div className='review-dash'>
                            <p>{student.name}</p>
                        </div>
                        <div className='review-dash'>
                            <select className='review-input'
                                value={performances[student._id] || ''}
                                onChange={(event) => handlePerformanceChange(event, student._id)}
                            >
                                <option value="">Select your performance</option>
                                <option value="good">Good</option>
                                <option value="average">Average</option>
                                <option value="bad">Bad</option>
                                <option value="absent">Absent</option>
                            </select>
                        </div>
                    </div>
                ))}
                <button className='review-btn' onClick={savedperformance}>Save the performance</button>
            </div>


        </div>
    );
};

export default Multiplereview;

