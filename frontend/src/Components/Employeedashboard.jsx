import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Employeedashboard = () => {

    const Employeedata = useSelector((state) => state.auth.withoutpass);
    console.log(Employeedata, "Employeedata");

    const [employeedetails, setemployeedetails] = useState(null);
    console.log(employeedetails, "employeedetails");

    const route = useNavigate()

    useEffect(() => {
        async function showdata() {
            if (Employeedata && Employeedata._id) {
                const response = await axios.post("http://15.207.248.127:8000/showsingleemployee", {
                    _id: Employeedata._id
                })
                console.log(response.data, "check response");
                setemployeedetails(response.data);
            }
        }
        showdata()
    }, [Employeedata]);

    // const addattendacne = () => {

    // }

    // const attendancetrack = () => {

    // }

    return (
        <div>

            <h1 className='register-h1'>Employeeashboard</h1>

            <div className='teacher-eleven'>
                <div className='teacher-twelve'>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>name</p>
                    </div>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>Number</p>
                    </div>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>Email</p>
                    </div>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>Add Attendace</p>
                    </div>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>Attendace Track</p>
                    </div>
                </div>


                {employeedetails ? (
                    <div className='teacher-seventeen'>
                        <div className='teacher-eighteen'>
                            <div className='student-one'>
                                <p>{employeedetails.name}</p>
                            </div>
                            <div className='student-one'>
                                <p>{employeedetails.number}</p>
                            </div>
                            <div className='student-one'>
                                <p>{employeedetails.email}</p>
                            </div>
                            <div className='student-one'>
                                <button onClick={() => route(`/punchtime/${employeedetails._id}`)}>Add Attendance</button>
                            </div>
                            <div className='student-one'>
                                <button onClick={() => route(`/employeeattendancetrack/${employeedetails._id}`)}>See Attendance</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading employee details...</p>
                )}

            </div>

        </div>
    )
}

export default Employeedashboard
