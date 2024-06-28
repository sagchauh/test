import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Showstudentmarks = () => {

    const [singlestudentdata, setsinglestudentdata] = useState(null);
    console.log(singlestudentdata, "singlestudentdata");

    const { id } = useParams();
    console.log(id, "id heree");

    const userData = useSelector((state) => state.auth.withoutpass);
    console.log(userData, "userData check")

    const route = useNavigate();

    useEffect(() => {
        async function singlestudent() {
            const response = await axios.post("http://localhost:8000/showparticularstudentdata", {
                _id: id
            })
            console.log(response.data, "response heree")
            setsinglestudentdata(response.data.marks)
        }
        singlestudent()
    }, [id])

    if (!singlestudentdata) {
        return <p>Loading student data...</p>;
    }

    const editmarks = (studentData) => {
        route(`/updatestudentmark/${studentData._id}`)
    }



    return (
        <div>
            <h1 className='student-drive'>Show Student Marks</h1>

            <div className='teacher-eleven'>
                <div className='teacher-twelve'>
                    <div className='show-dash'>
                        <p className='teacher-fifteen'>Name</p>
                    </div>
                    <div className='show-dash'>
                        <p className='teacher-fifteen'>Date</p>
                    </div>
                    <div className='show-dash'>
                        <p className='teacher-fifteen'>subject</p>
                    </div>
                    <div className='show-dash'>
                        <p className='teacher-fifteen'>drive link</p>
                    </div>
                    <div className='show-dash'>
                        <p className='teacher-fifteen'>github link</p>
                    </div>
                    <div className='show-dash'>
                        <p className='teacher-fifteen'>Test Results</p>
                    </div>
                    {userData.role !== "student" && (
                        <div className='show-dash'>
                            <p className='teacher-fifteen'>edit marks</p>
                        </div>
                    )}
                </div>


                {singlestudentdata?.testresult?.map((e, i) => (
                    <div className='show-data'>
                        <div className='show-dash'>
                            {singlestudentdata?.name}
                        </div>
                        <div className='show-dash'>
                            <p>{new Date(e?.uploadmarks?.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                        </div>
                        <div className='show-dash'>
                            <p>{e?.uploadmarks?.createsubject?.createsubject}</p>
                        </div>
                        <div className='show-dash'>
                            <p>{e?.uploadmarks?.drivelink}</p>
                        </div>
                        <div className='show-dash'>
                            <p>{e?.uploadmarks?.githublink}</p>
                        </div>
                        <div className='show-dash'>
                            <p>{e?.markobtained}</p>
                        </div>
                        {userData.role !== "student" && (
                            <div className='show-dash'>
                                <button onClick={() => editmarks(singlestudentdata)}>edit marks</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>




            {/* 
            {singlestudentdata ? (
                <>

                    <div style={{ border: "1px solid black", width: "100%", height: "100px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}>
                            <h1>name</h1>
                        </div>
                        <div style={{ border: "1px solid black", width: "80%", height: "100%" }}>
                            <h1>Test Results</h1>
                        </div>
                    </div>


                    <div style={{ border: "1px solid black", width: "100%", height: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ border: "1px solid black", width: "20%", height: "auto" }}>
                            <h2>{singlestudentdata.name}</h2>
                        </div>
                        <div style={{ border: "1px solid black", width: "80%", height: "100%" }}>
                            {singlestudentdata.testresult.length > 0 ? (
                                <div style={{ border: "1px solid black", width: "80%", height: "auto" }}>
                                    {singlestudentdata.testresult.map((e, index) => (
                                        <div key={index}>
                                            <p>Subject: {e.subjectname ? e.subjectname.subjectname : "Unknown"} - Marks Obtained: {e.markobtained}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No test results available.</p>
                            )}
                        </div>
                    </div>


                </>
            ) : (
                <p>Loading student data...</p>
            )} */}
        </div>
    )
}

export default Showstudentmarks
