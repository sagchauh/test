import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Addstudentmarks = () => {
    const { id } = useParams();
    console.log(id, "id")
    const route = useNavigate();

    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const [showallsubject, setshowallsubject] = useState([]);
    console.log(showallsubject, "showallsubject")

    const [studentmarks, setstudentmarks] = useState([]);
    console.log(studentmarks, "studentmarks")

    useEffect(() => {
        async function allsubject() {
            const response = await axios.post("http://localhost:8000/findupdatedata", { _id: id });
            setshowallsubject(response.data.uploadlink);
            setstudentmarks(response.data.uploadlink.map(() => ({ markobtained: "" })));

        }
        allsubject();
    }, [id]);

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const newStudentMarks = [...studentmarks];
        newStudentMarks[index][name] = value;
        setstudentmarks(newStudentMarks);
    };

    const handleSubmit = async (index, e) => {
        e.preventDefault();
        const subject = showallsubject[index];
        console.log(subject, "subject");

        const marks = studentmarks[index];
        console.log(marks, "marks");

        if (marks.markobtained) {
            const response = await axios.post("http://localhost:8000/updatemarks", {
                markobtained: marks.markobtained,
                _id: id,
                drivedataId: subject._id
            });

            if (response.data.status === 200) {
                alert(response.data.message);
                setSubmissionSuccess(true);
                const newStudentMarks = [...studentmarks];
                newStudentMarks[index] = { markobtained: "" };
                setstudentmarks(newStudentMarks);
                route("/teacherdashboard");
            } else if (response.data.status === 401) {
                alert(response.data.message);
                const newStudentMarks = [...studentmarks];
                newStudentMarks[index] = { markobtained: "" };
                setstudentmarks(newStudentMarks);
            } else if (response.data.status === 402) {
                alert(response.data.message);
                const newStudentMarks = [...studentmarks];
                newStudentMarks[index] = { markobtained: "" };
                setstudentmarks(newStudentMarks);
            } else if (response.data.status === 403) {
                alert(response.data.message);
                const newStudentMarks = [...studentmarks];
                newStudentMarks[index] = { markobtained: "" };
                setstudentmarks(newStudentMarks);
            }
        } else {
            alert("Please enter marks");
        }
    };

    return (
        <div>
            <h1 className='student-drive'>Add Student Marks</h1>
            <div className='teacher-eleven'>
                <div className='teacher-twelve'>
                    <div className='student-mark'>
                        <p className='teacher-fifteen'>Date</p>
                    </div>
                    <div className='student-mark'>
                        <p className='teacher-fifteen'>Subject</p>
                    </div>
                    <div className='student-mark'>
                        <p className='teacher-fifteen'>Drive Link</p>
                    </div>
                    <div className='student-mark'>
                        <p className='teacher-fifteen'>GitHub Link</p>
                    </div>
                    <div className='student-mark'>
                        <p className='teacher-fifteen'>Enter Marks</p>
                    </div>
                    <div className='student-mark'>
                        <p className='teacher-fifteen'>Button</p>
                    </div>
                </div>

                {showallsubject.map((e, i) => (
                    <div key={i} className='show-data'>
                        <div className='student-mark'>
                            <p>{new Date(e.date).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            })}</p>
                        </div>
                        <div className='student-mark'>
                            <p>{e.createsubject?.createsubject}</p>
                        </div>
                        <div className='student-mark'>
                            <p>{e.drivelink}</p>
                        </div>
                        <div className='student-mark'>
                            <p>{e.githublink}</p>
                        </div>
                        <div className='student-mark'>
                            <input
                                type="text"
                                onChange={(e) => handleInputChange(i, e)}
                                disabled={submissionSuccess}
                                name="markobtained"
                                value={studentmarks[i].markobtained}
                                placeholder='Enter your marks'
                            />
                        </div>
                        <div className='student-mark'>
                            <button onClick={(e) => handleSubmit(i, e)}>Submit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Addstudentmarks;