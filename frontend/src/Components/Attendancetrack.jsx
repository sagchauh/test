import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';


const Attendancetrack = () => {

    const { id } = useParams();
    console.log(id, "_id here");

    const route = useNavigate();

    const userData = useSelector((state) => state.auth.withoutpass);
    console.log(userData, "userData check")

    const [attendupdate, setattendupdate] = useState([]);
    console.log(attendupdate, "attendupdate");

    useEffect(() => {
        async function track() {
            const response = await axios.post("http://15.207.248.127:8000/attendacetrack", {
                _id: id
            })
            console.log(response.data, "response");
            setattendupdate(response.data.attendaceupdate)
        }
        track()
    }, [id])

    const editattendancetrack = (studentId) => {
        route(`/editAttendance/${studentId}`);
    };

    return (
        <div>
            <h1 className='student-drive'>Attendancetrack</h1>

            <div  className='attendance-lelo'>
                <div id='attendacetrack' className='teacher-twelve'>
                    <div className='attendance-dash'>
                        <p className='teacher-fifteen'>date</p>
                    </div>
                    <div className='attendance-dash'>
                        <p className='teacher-fifteen'>status</p>
                    </div>
                    {userData.role !== "student" && (
                        <div className='attendance-dash'>
                            <p className='teacher-fifteen'>Edit Attendance</p>
                        </div>
                    )}
                </div>

                {attendupdate && attendupdate.map((student, i) => (
                    <div key={i}>
                        {student ? (
                            <div id='attendacetrack' className='show-data'>
                                <div className='attendance-dash'>
                                    {student.studenattendance?.length > 0
                                        ? student.studenattendance.map((attendance, attendanceIndex) => {
                                            const dateObj = new Date(attendance.date);
                                            const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
                                            return (
                                                <p key={attendanceIndex}>{formattedDate}</p>
                                            );
                                        })
                                        : <p>Attendance not taken.</p>
                                    }

                                </div>
                                <div className='attendance-dash'>
                                    {student.studenattendance.map((attendance, attendanceIndex) => (
                                        <p key={attendanceIndex} className='status-design'>{attendance.subjectstatus}</p>
                                    ))}
                                </div>
                                {userData.role !== "student" && (
                                    <div className='attendance-dash'>
                                        <button onClick={() => editattendancetrack(student._id)}>edit Attendance</button>
                                    </div>
                                )}

                            </div>
                        ) : <p>
                            No data available
                        </p>}
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Attendancetrack
