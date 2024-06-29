import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Multipleattendance = () => {
    const [studentIds, setStudentIds] = useState([]);
    console.log(studentIds, "studentIds");

    const route = useNavigate()

    const [studentDetails, setStudentDetails] = useState([]);
    console.log(studentDetails, "studentDetails");

    const [selectedStudents, setSelectedStudents] = useState([]);
    console.log(selectedStudents, "selectedStudents");

    const [selectattendance, setselectattendance] = useState("")
    console.log(selectattendance, "selectattendance");

    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate, "selectedDate");

    const [search, setSearch] = useState('');
    console.log(search, "search");

    const currentDate = new Date();

    const location = useLocation();

    useEffect(() => {
        const fetchStudentIds = async () => {
            const queryParams = new URLSearchParams(location.search);
            const studentIdsString = queryParams.get('studentIds');
            if (studentIdsString) {
                const parsedStudentIds = JSON.parse(studentIdsString);
                setStudentIds(parsedStudentIds);

                // Fetch student details for each student ID
                const details = await fetchStudentDetails(parsedStudentIds);
                setStudentDetails(details);
            }
        };

        fetchStudentIds();
    }, [location.search]);

    // Function to fetch student details by ID
    const fetchStudentDetails = async (studentIds) => {
        try {
            const studentDetails = [];
            for (const studentId of studentIds) {
                const response = await axios.post("http://15.207.248.127:8000/studentdetails", {
                    _id: studentId
                });
                studentDetails.push(response.data);
            }
            return studentDetails;
        } catch (error) {
            console.error("Error fetching student details:", error);
            return [];
        }
    };

    // Function to handle checkbox toggle
    const handleCheckboxChange = (studentId) => {
        if (selectedStudents.includes(studentId)) {
            // If studentId is already selected, remove it from selectedStudents
            setSelectedStudents(selectedStudents.filter(id => id !== studentId));
        } else {
            // If studentId is not selected, add it to selectedStudents
            setSelectedStudents([...selectedStudents, studentId]);
        }
    };

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const selectattendanceinfo = (e) => {
        setselectattendance(e.target.value)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const filteredStudents = studentDetails.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    const attendanceclick = async (e) => {
        e.preventDefault();

        if (selectedStudents.length > 0 && selectattendance) {

            const attendanceData = studentDetails.map(student => ({
                studentId: student._id,
                status: selectedStudents.includes(student._id) ? selectattendance : "absent",
                date: selectedDate
            }));

            const response = await axios.post("http://15.207.248.127:8000/multiplestudentattendance", {
                attendanceData
            });
            console.log(response.data, "check hereee");
            if (response.data.status === 200) {
                alert(response.data.message);
                setselectattendance("");
                setSelectedDate(null);
                setSelectedStudents([]);
                route("/teacherdashboard")
            } else if (response.data.status === 400) {
                alert(response.data.message);
                setselectattendance("");
                setSelectedDate(null);
                setSelectedStudents([])
            } else if (response.data.status === 401) {
                alert(response.data.message);
                setselectattendance("");
                setSelectedDate(null);
                setSelectedStudents([])
            } else if (response.data.status === 402) {
                alert(response.data.message);
                setselectattendance("");
                setSelectedDate(null);
                setSelectedStudents([])
            }

        } else {
            alert("Please select all fields")
        }
    }


    return (
        <div>

            <form className='mul-attendance' >
                <h1 className='complain-one'>Multipleattendance</h1>
                <label>Select a Date</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    minDate={new Date()}
                    maxDate={currentDate}
                    className='date-css'
                />
               
                <label>Search Student Name</label>
                <input className='complain-input' type="text" placeholder='Search by name' value={search} onChange={handleSearchChange} />
               
                <label>select multiple Student Name</label>
                {filteredStudents.map((student, index) => (
                    <div key={index} className='mul-student'>
                        <input className='mul-student-check'
                            type="checkbox"
                            checked={selectedStudents.includes(student._id)}
                            onChange={() => handleCheckboxChange(student._id)}
                        />
                        <label className='mul-label'>{student.name}</label>
                    </div>
                ))}
                
                <label id='mul-label'>select attendace</label>
                <select className='complain-input' onChange={selectattendanceinfo} value={selectattendance}>
                    <option>select your attendace</option>
                    <option value="present">present</option>
                </select>
               
                <button className='complain-btn' onClick={(e) => attendanceclick(e)}>Multiple Attendance</button>
            </form>
        </div>
    );
};

export default Multipleattendance;
