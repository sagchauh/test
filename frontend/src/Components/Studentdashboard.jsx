import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Forgoticon } from '../Svg/forgot.svg';

const Studentdashboard = () => {

    const studentdata = useSelector((state) => state.auth.withoutpass)
    console.log(studentdata, "studentdata");

    const [showstudentdata, setshowstudentdata] = useState([]);
    console.log(showstudentdata, "showstudentdata");

    const [shownotice, setshownotice] = useState([]);

    const route = useNavigate()

    useEffect(() => {
        async function notice() {
            const response = await axios.post("http://15.207.248.127:8000/shownotice")
            setshownotice(response.data)
        }
        notice()
    }, [])

    useEffect(() => {
        async function showdata() {
            const response = await axios.post("http://15.207.248.127:8000/studentdata", {
                _id: studentdata._id
            })
            console.log(response.data, "response heree")
            setshowstudentdata(response.data)
        }
        showdata()
    }, [studentdata._id])

    const singlestudent = (student) => {
        route(`/showstudentmarks/${student._id}`);
    }

    const attendacetrack = (student) => {
        route(`/attendancetrack/${student._id}`);
    }

    const addcomplain = (student) => {
        route(`/addcomplain/${student._id}`);
    }

    const addlink = (student) => {
        route(`/adddrivelink/${student._id}`);
    }

    const reviewperformance = (student) => {
        route(`/reviewperformance/${student._id}`);
    };

    // const [activeComponent, setActiveComponent] = useState('course');

    // const handleMenuClick = (componentName) => {
    //     setActiveComponent(componentName);
    // };

    


    return (
        <div>

            <h1 className='teacher-main'>Notice Dashboard</h1>
            <div className='teacher-one'>
                <div className='teacher-two'>
                    <div className='teacher-three'>
                        <h1 style={{ margin: "0px" }}>date</h1>
                    </div>
                    <div className='teacher-four'>
                        <h1 style={{ margin: "0px", }}>title</h1>
                    </div>
                </div>

                {shownotice.map(e => (
                    <div key={e._id} className='teacher-five'>
                        <div className='teacher-six'>
                            <p>{new Date(e.date).toLocaleDateString()}</p>
                        </div>
                        <div className='teacher-seven'>
                            <p>{e.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h1 className='student-dash'>Studentdashboard</h1>

            <div className='teacher-eleven'>
                <div className='teacher-twelve'>
                    {/* <div className='student-one'>
                        <p className='teacher-fifteen'>name</p>
                    </div>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>course</p>
                    </div>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>batch</p>
                    </div> */}
                    <div className='student-one'>
                        <p className='teacher-fifteen'>see marks</p>
                    </div>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>see attendance</p>
                    </div>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>teacher name</p>
                    </div>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>add complain</p>
                    </div>
                    <div className='student-one'>
                        <p className='teacher-fifteen'>add link </p>
                    </div>
                    {showstudentdata && showstudentdata.map((student, i) => (
                        student.course && student.course.course === "windows" && (
                            <div key={i} className='student-one'>
                                <p className='teacher-fifteen'>Review Performance</p>
                            </div>
                        )
                    ))}
                </div>

                {showstudentdata && showstudentdata.map((student, i) => (
                    <div key={i} className='teacher-seventeen'>
                        {student ? (
                            <div className='teacher-eighteen'>
                                {/* <div className='student-one'>
                                    <p>{student.name}</p>
                                </div>
                                <div className='student-one'>
                                    <p>{student.course.course}</p>
                                </div>
                                <div className='student-one'>
                                    <p>{student.batch.batch}</p>
                                </div> */}
                                <div className='student-one'>
                                    <button onClick={() => singlestudent(student)}>see marks</button>
                                </div>
                                <div className='student-one'>
                                    <button onClick={() => attendacetrack(student)}>attendace track</button>
                                </div>
                                <div className='student-one'>
                                    <p>{student.assignedteacher ? student.assignedteacher.name : 'Not Assigned'}</p>
                                </div>
                                <div className='student-one'>
                                    <button onClick={() => addcomplain(student)}>add complain</button>
                                </div>
                                <div className='student-one'>
                                    <button onClick={() => addlink(student)}>add drive link</button>
                                </div>

                                {student.course && (student.course.course === "windows" || student.course.course === "ccna") && (
                                    <div className='student-one'>
                                        <button onClick={() => reviewperformance(student)}>review performance</button>
                                    </div>
                                )}
                            </div>
                        ) : <p>
                            No data available
                        </p>}
                    </div>
                ))}
            </div>

            <div className='student-item-one'>
                <div className='student-item-two'>
                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p>Home</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p>Marks</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p>Attendance</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p>Link</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p>Complain</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>
                </div>
                <div className='student-item-three'>

                </div>
            </div>

        </div>
    )
}

export default Studentdashboard
