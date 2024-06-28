import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Showcomplain = () => {

    const [seecomplain, setseecomplain] = useState([]);
    console.log(seecomplain, "seecomplain");


    useEffect(() => {
        async function complain() {
            const response = await axios.post("http://localhost:8000/showcomplain");
            console.log(response.data, "response check");
            setseecomplain(response.data)
        }
        complain()
    }, [])

    const deletecomplain = async (e) => {
        e.preventDefault();

        const firstComplainId = seecomplain[0]._id;
        console.log(firstComplainId, "id");

        const response = await axios.post("http://localhost:8000/deletecomplain", {
            _id: firstComplainId
        })
        console.log(response, "response")
        if (response.data.status === 200) {
            alert(response.data.message)
            const refreshresponse = await axios.post("http://localhost:8000/showcomplain");
            setseecomplain(refreshresponse.data);
        } else if (response.data.status === 400) {
            alert(response.data.message)
        }

    }
    return (
        <div>
            <h1 className='register-h1'>Showcomplain</h1>

            <div className='teacher-eleven'>
                <div className='teacher-twelve'>
                    <div className='complain-dash'>
                        <p className='teacher-fifteen'>name</p>
                    </div>
                    <div className='complain-dash'>
                        <p className='teacher-fifteen'>course</p>
                    </div>
                    <div className='complain-dash'>
                        <p className='teacher-fifteen'>batch</p>
                    </div>
                    <div className='complain-dash'>
                        <p className='teacher-fifteen'>teacher name</p>
                    </div>
                    <div className='complain-dash'>
                        <p className='teacher-fifteen'>Date</p>
                    </div>
                    <div className='complain-dash'>
                        <p className='teacher-fifteen'>Complain</p>
                    </div>
                    <div className='complain-dash'>
                        <p className='teacher-fifteen'>delete</p>
                    </div>
                </div>

                {seecomplain ? seecomplain.map((e, i) => (

                    <div key={i} className='teacher-seventeen'>
                        <div className='teacher-eighteen'>
                            <div className='complain-dash'>
                                <p >{e.studentId.name}</p>
                            </div>
                            <div className='complain-dash'>
                                <p >{e.studentId.course.course}</p>
                            </div>
                            <div className='complain-dash'>
                                <p >{e.studentId.batch.batch}</p>
                            </div>
                            <div className='complain-dash'>
                                {e.studentId.assignedteacher ? (
                                    <p >{e.studentId.assignedteacher.name}</p>
                                ) : (
                                    <p >No assigned teacher</p>
                                )}

                            </div>
                            <div className='complain-dash'>
                                <p >{new Date(e.date).toLocaleDateString()}</p>
                            </div>
                            <div className='complain-dash'>
                                <p >{e.complain}</p>
                            </div>
                            <div className='complain-dash'>
                                <button onClick={(e) => deletecomplain(e)}>delete</button>
                            </div>
                        </div>
                    </div>
                )) : <p> no complain found</p>}


            </div>
        </div>






    )
}

export default Showcomplain
