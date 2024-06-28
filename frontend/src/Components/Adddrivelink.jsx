import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Adddrivelink = () => {
    const { id } = useParams();
    console.log(id, "id");

    const route = useNavigate();

    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    console.log(submissionSuccess, "submissionSuccess");

    const [showstudent, setshowstudent] = useState([]);
    console.log(showstudent, "showstudent");

    const [uploadlinks, setuploadlinks] = useState([]);
    console.log(uploadlinks, "uploadlinks");

    useEffect(() => {
        async function showdata() {
            const response = await axios.post("http://localhost:8000/subjectstudentdata", {
                _id: id
            });
            setshowstudent(response.data.createsubjectData);
            setuploadlinks(response.data.createsubjectData.map(() => ({ drivelink: "", githublink: "" })));
        }
        showdata();
    }, [id]);

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const newUploadLinks = [...uploadlinks];
        newUploadLinks[index][name] = value;
        setuploadlinks(newUploadLinks);
    };

    const handleSubmit = async (index, e) => {
        e.preventDefault();
        const subject = showstudent[index];
        const links = uploadlinks[index];

        if (links.drivelink && links.githublink) {
            const response = await axios.post("http://localhost:8000/uploaddrivelink", {
                _id: id,
                drivelink: links.drivelink,
                githublink: links.githublink,
                createsubject: subject._id,
                date: new Date(subject.date).toISOString(),
            });

            if (response.data.status === 200) {
                alert(response.data.message);
                setSubmissionSuccess(true);
                const newUploadLinks = [...uploadlinks];
                newUploadLinks[index] = { drivelink: "", githublink: "" };
                setuploadlinks(newUploadLinks);
                route("/studentdashboard");
            } else {
                alert(response.data.message);
            }
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <div>
            <h1 className='student-drive'>Add Drive Link</h1>
            <div className='teacher-eleven'>
                <div className='teacher-twelve'>
                    <div className='drive-dash'>
                        <p className='teacher-fifteen'>Name</p>
                    </div>
                    <div className='drive-dash'>
                        <p className='teacher-fifteen'>Date</p>
                    </div>
                    <div className='drive-dash'>
                        <p className='teacher-fifteen'>Drive Link</p>
                    </div>
                    <div className='drive-dash'>
                        <p className='teacher-fifteen'>GitHub Link</p>
                    </div>
                    <div className='drive-dash'>
                        <p className='teacher-fifteen'>Button</p>
                    </div>
                </div>

                {showstudent.map((e, i) => (
                    <div key={i} className='drive-one'>
                        <div className='teacher-eighteen'>
                            <div className='drive-dash'>
                                <p>{e.createsubject}</p>
                            </div>
                            <div className='drive-dash'>
                                <p>{new Date(e.date).toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                })}</p>
                            </div>
                            <div className='drive-dash'>
                                <input
                                    type="text"
                                    onChange={(e) => handleInputChange(i, e)}
                                    disabled={submissionSuccess}
                                    name="drivelink"
                                    value={uploadlinks[i].drivelink}
                                    placeholder='Upload drive link'
                                />
                            </div>
                            <div className='drive-dash'>
                                <input
                                    type="text"
                                    onChange={(e) => handleInputChange(i, e)}
                                    disabled={submissionSuccess}
                                    name="githublink"
                                    value={uploadlinks[i].githublink}
                                    placeholder='Upload GitHub link'
                                />
                            </div>
                            <div className='drive-dash'>
                                <button onClick={(e) => handleSubmit(i, e)}>Submit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Adddrivelink;
