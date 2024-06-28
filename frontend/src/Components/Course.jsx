// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const Course = () => {
//     const [course, setcourse] = useState({ course: "" });
//     console.log(course, "course");

//     const [selecttrainingmode, setselecttrainingmode] = useState([]);
//     console.log(selecttrainingmode, "selecttrainingmode");

//     const [updatetrainingmode, setupdatetrainingmode] = useState("");
//     console.log(updatetrainingmode, "updatetrainingmode");

//     const coursehandleclick = async (e) => {
//         e.preventDefault();

//         if (course.course) {
//             const response = await axios.post("http://localhost:8000/coursedata", {
//                 course: course.course,
//             })
//             console.log(response, "-check here");
//             if (response.data.status === 200) {
//                 alert(response.data.message)
//                 setcourse({ course: "" });
//             } else if (response.data.status === 202) {
//                 alert(response.data.message);
//                 setcourse({ course: "" });
//             } else if (response.data.status === 203) {
//                 alert(response.data.message);
//                 setcourse({ course: "" });
//             } else if (response.data.status === 400) {
//                 alert(response.data.message);
//                 setcourse({ course: "" });
//             }
//         } else {
//             alert("please fill all field")
//         }
//     }

//     const coursehandleform = (e) => {
//         var name = e.target.name;
//         var value = e.target.value;
//         setcourse({ ...course, [name]: value })
//     }

//     const selectedtraingmode = (e) => {
//         var name = e.target.name;
//         var value = e.target.value;
//         setupdatetrainingmode({ ...updatetrainingmode, [name]: value })
//     }

//     useEffect(() => {
//         async function fetchdata() {
//             const response = await axios.post("http://localhost:8000/getalltrainingmode");
//             console.log(response.data, "check here");
//             setselecttrainingmode(response.data)
//         }
//         fetchdata()
//     }, [])

//     return (
//         <div>
//             <h1>Course</h1>
//             <div className='awdiz-login'>
//                 <div className='awdiz-login-one'>
//                     <form onSubmit={(e) => coursehandleclick(e)}>
//                         <div className='awdiz-login-section'>
//                             <label>Enter your course</label>
//                             <input type="text" onChange={(e) => coursehandleform(e)} name="course" value={course.course} placeholder='enter your course' />
//                             <br />
//                             {selecttrainingmode && selecttrainingmode.map((e) => (
//                                 <div key={e.trainingmode}>
//                                     <input type="checkbox" value={e.trainingmode} onChange={(e) => selectedtraingmode(e)} />
//                                     <label htmlFor={e.trainingmode}>{e.trainingmode}</label>
//                                 </div>
//                             ))}
//                             <br />
//                             <br />
//                             <input type="submit" value="submit" className='btn' />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Course

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Course = () => {
    const [course, setCourse] = useState("");
    const [selectTrainingMode, setSelectTrainingMode] = useState([]);
    const [selectedTrainingModes, setSelectedTrainingModes] = useState([]);

    const route = useNavigate()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post("http://localhost:8000/getalltrainingmode");
                console.log(response.data, "check here");
                setSelectTrainingMode(response.data);
            } catch (error) {
                console.error("Error fetching training modes:", error);
            }
        }
        fetchData();
    }, []);

    const handleCourseInput = (e) => {
        setCourse(e.target.value);
    };

    const handleTrainingModeChange = (e) => {
        const value = e.target.value;
        setSelectedTrainingModes(prev => {
            if (prev.includes(value)) {
                return prev.filter(mode => mode !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!course || selectedTrainingModes.length === 0) {
            alert("Please fill all fields and select at least one training mode.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/coursedata", {
                course,
                trainingmodes: selectedTrainingModes,
            });
            console.log(response, "-check here");
            alert(response.data.message);
            if (response.data.status === 200) {
                setCourse("");
                setSelectedTrainingModes([]);
                route("/batch")
            }
        } catch (error) {
            console.error("Error submitting course data:", error);
            alert("Error submitting course data. Please try again.");
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit} className='mul-attendance'>
                <h1 className='complain-one'>Course</h1>
                <label>Enter your course</label>
                <input className='complain-input' type="text" onChange={handleCourseInput} name="course" value={course} placeholder='Enter your course' />
                <label>Select Training Mode</label>
                <div className='course-one'>
                    {selectTrainingMode && selectTrainingMode.map((mode) => (
                        <div key={mode.trainingmode} className='course-content'>
                            <input type="checkbox" className='mul-student-check' value={mode.trainingmode} checked={selectedTrainingModes.includes(mode.trainingmode)} onChange={handleTrainingModeChange} />
                            <label className='course-label' htmlFor={mode.trainingmode}>{mode.trainingmode}</label>
                        </div>

                    ))}
                </div>
                <input type="submit" value="Submit" className='complain-btn' />
            </form>
        </div>
    );
}

export default Course;
