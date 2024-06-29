import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Employeeattendancetrack = () => {

    const [updateattendance, setupdateattendance] = useState(null);
    console.log(updateattendance, "updateattendance");

    const [selectedMonth, setSelectedMonth] = useState(null);
    console.log(selectedMonth, "selectedMonth");

    const userData = useSelector((state) => state.auth.withoutpass);
    console.log(userData, "userData check");

    const route = useNavigate()

    const { id } = useParams();
    console.log(id, "id");

    useEffect(() => {
        async function showdata() {
            const response = await axios.post("http://15.207.248.127:8000/showsingleemployee", {
                _id: id
            })
            console.log(response.data, "check");
            setupdateattendance(response.data)
        }
        showdata()
    }, [id]);

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
    };

    const selectedMonthFormatted = selectedMonth ? selectedMonth.toISOString().slice(0, 7) : null;

    return (
        <div>
            <h1 className='student-drive'>Attendancetrack</h1>

            <div className='attendance-edit'>

                <div className='month-picker'>
                    <label id='employee-label'>Select Month:</label>
                    <DatePicker
                        selected={selectedMonth}
                        onChange={handleMonthChange}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        id='employedate'
                        placeholderText="Select a month"
                    />
                </div>
                <div>
                    {userData.role !== "Employee" && (
                        <div className='attendance-edit-btn'>
                            <button onClick={() => route(`/editemployeeattendance/${id}`)}>Edit Attendance</button>
                        </div>

                    )}
                </div>
            </div>

            <div className='attendance-lelo'>
                <div id='attendacetrack' className='teacher-twelve'>
                    <div className='attendance-dash'>
                        <p className='teacher-fifteen'>date</p>
                    </div>
                    <div className='attendance-dash'>
                        <p className='teacher-fifteen'>Day</p>
                    </div>
                    <div className='attendance-dash'>
                        <p className='teacher-fifteen'>In Time</p>
                    </div>
                    <div className='attendance-dash'>
                        <p className='teacher-fifteen'>Out Time</p>
                    </div>
                    {/* {userData.role !== "Employee" && (
                        <div className='attendance-dash'>
                            <p className='teacher-fifteen'>Edit Attendance</p>
                        </div>
                    )} */}
                </div>

                {updateattendance ? (
                    <div id='attendacetrack'>
                        {updateattendance.intime.length > 0 || updateattendance.outtime.length > 0 ? (
                            updateattendance.intime
                                .filter(intime => {   
                                    if (!selectedMonthFormatted) return true;
                                    return new Date(intime.date).toISOString().slice(0, 7) === selectedMonthFormatted;
                                })
                                .map((intime, i) => (
                                    <div key={i} className='show-data'>
                                        <div className='attendance-dash'>
                                            <p>{new Date(intime.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className='attendance-dash'>
                                            <p>{intime.day}</p>
                                        </div>
                                        <div className='attendance-dash'>
                                            <p>{intime.time}</p>
                                        </div>
                                        <div className='attendance-dash'>
                                            <p>{updateattendance.outtime[i] ? updateattendance.outtime[i].time : 'Not recorded'}</p>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p>No attendance records found.</p>
                        )}
                    </div>
                ) : (
                    <p>Loading attendance data...</p>
                )}

            </div>
        </div>
    )
}

export default Employeeattendancetrack
