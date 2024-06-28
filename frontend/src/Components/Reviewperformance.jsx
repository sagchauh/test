import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Reviewperformance = () => {

    const [checkperformance, setcheckperformance] = useState([]);
    console.log(checkperformance, "checkperformance");

    const route = useNavigate()

    const { id } = useParams();
    console.log(id, "id heree");

    const userData = useSelector((state) => state.auth.withoutpass);
    console.log(userData, "userData check")

    useEffect(() => {
        async function check() {
            const response = await axios.post("http://localhost:8000/studentdetails", {
                _id: id,
            })
            console.log(response.data, "check response");
            setcheckperformance(response.data)
        }
        check()
    }, [id])

    const editperformancestatus = (checkperformance) => {
        route(`/editpreviewperformance/${checkperformance}`);
    }

    return (
        <div>
            <h1 className='student-drive'>review status</h1>

            <div className='teacher-eleven'>
                <div className='teacher-twelve'>
                    <div className='review-dash'>
                        <p className='teacher-fifteen'>name</p>
                    </div>
                    <div className='review-dash'>
                        <p className='teacher-fifteen'>date</p>
                    </div>
                    <div className='review-dash'>
                        <p className='teacher-fifteen'>subject</p>
                    </div>
                    <div className='review-dash'>
                        <p className='teacher-fifteen'>status</p>
                    </div>
                    {userData.role !== "student" && (
                        <div className='review-dash'>
                            <p className='teacher-fifteen'>edit</p>
                        </div>
                    )}
                </div>

                <div className='drive-one'>
                    <div className='review-dash'>
                        <p>{checkperformance.name}</p>
                    </div>
                    <div className='review-dash'>
                        {checkperformance.performance && checkperformance.performance.length > 0
                            ? checkperformance.performance.map((e, i) => (
                                <p key={i}>
                                    {new Date(e.date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                </p>
                            ))
                            : <p>No performance data available.</p>
                        }
                    </div>
                    <div className='review-dash'>
                        {/* {checkperformance.performance && checkperformance.performance.map((e, i) => (
                            <p key={i}>{e.subject}</p>
                        ))} */}

                        {checkperformance.performance && checkperformance.performance.length > 0
                            ? checkperformance.performance.map((e, i) => (
                                <p key={i}>{e.subject}</p>
                            ))
                            : <p>No performance data available.</p>
                        }

                    </div>
                    <div className='review-dash'>
                        {checkperformance.performance && checkperformance.performance.length > 0
                            ? checkperformance.performance.map((e, i) => (
                                <p key={i}>{e.performancestatus}</p>
                            ))
                            : <p>No performance data available.</p>
                        }

                    </div>

                    {userData.role !== "student" && (
                        <div className='review-dash'>
                            <button onClick={() => editperformancestatus(checkperformance._id)}>editperformancestatus</button>
                        </div>
                    )}
                </div>
            </div>






        </div>
    )
}

export default Reviewperformance
