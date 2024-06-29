import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from "../redux/userrelated/authslice"
import { useNavigate } from 'react-router-dom';

const Studentlogin = () => {
    const [studentlogin, setstudentlogin] = useState({ email: "", password: "" });
    console.log(studentlogin, "studentlogin");

    const [policy, setPolicy] = useState(false);
    console.log(policy, "policy");

    const [savedEmail, setSavedEmail] = useState("");
    console.log(savedEmail, "savedEmail");

    const dispatch = useDispatch();
    const route = useNavigate();

    const studenthandleclick = async (e) => {
        e.preventDefault();

        if (studentlogin.email && studentlogin.password) {
            try {
                const response = await axios.post("http://15.207.248.127:8000/studentlogin", {
                    email: studentlogin.email,
                    password: studentlogin.password,
                });

                if (response.data.status === 200) {
                    alert(response.data.message);
                    setSavedEmail(studentlogin.email);
                    if (!response.data.termsaccepted) {
                        setPolicy(true);
                    } else {
                        dispatch(login({ logindata: response.data.logindata, withoutpass: response.data.withoutpass }));
                        route("/studentdashboard");
                    }
                    setstudentlogin({ email: "", password: "" });
                } else {
                    alert(response.data.message);
                    setstudentlogin({ email: "", password: "" });
                }
            } catch (error) {
                console.error("Error logging in:", error);
            }
        } else {
            alert("Please fill in all fields");
        }
    }

    const studenthandleform = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setstudentlogin({ ...studentlogin, [name]: value });
    }

    const forgetpass = () => {
        alert("Please contact the admin");
    }

    const agreebtn = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://15.207.248.127:8000/acceptpolicy", {
            email: savedEmail,
        });
        console.log(response.data, "check heree---");
        if (response.data.status === 200) {
            alert(response.data.message);
            dispatch(login({ logindata: response.data.logindata, withoutpass: response.data.withoutpass }));
            route("/studentdashboard");
        }
    }

    const disagree = () => {
        alert("You must accept the terms and conditions to proceed.");
    }

    const modalStyles = {
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const modalContentStyles = {
        backgroundColor: '#fefefe',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #888',
        width: '80%',
        maxWidth: '600px',
    };



    return (
        <div>
            <div className='office-login'>
                <button onClick={() => route("/mainpage")}>Institue Login</button>
            </div>

            <form className='update-form' onSubmit={studenthandleclick}>
                <h1 className='complain-one' >Studentlogin</h1>
                <label>Email</label>
                <input className='complain-input' type="text" onChange={studenthandleform} name="email" value={studentlogin.email} placeholder='Enter your username' />
                <label>Password</label>
                <input className='login-input' type="password" onChange={studenthandleform} name="password" value={studentlogin.password} placeholder='Enter your password' />
                <p onClick={forgetpass} className='forgot' style={{ cursor: "pointer", display: "inline-block", textAlign: "left" }}>Forget Password ?</p>
                <input type="submit" value="Login" className='complain-btn' />
            </form>



            {policy && (
                <div style={modalStyles}>
                    <div style={modalContentStyles}>
                        <h5 className='term-one'>TERMS & Conditions – Master Program</h5>
                        <div className='term-main'>
                            <p className='term-two'>Any student failing to fulfil the below criteria’s will not be eligible to attend our placements. This will
                                be a legal re-affirmation from the candidate that he will be serious through out his training program
                                duration and failing which, AWDIZ will not be or should not be blamed for students not getting jobs.</p>
                            <p className='term-three'>1. <b>To ensure successful completion of the course, attendance in all classroom or online sessions
                                must exceed 85%.</b> If a session is missed, the student can attend it in another batch by notifying the HR
                                team of Awdiz. Maximum 3 session can be missed and backup is permitted per module beyond which
                                you need to take a special approval from the center manager or you will not be permitted to attend our
                                placement programs.</p>
                            <p className='term-three'>2. To meet the requirements of the course, all assignments, quizzes, internships, mock sessions,
                                and self-learning activities must be completed in full and before their respective deadlines for each
                                module. Failing on the above terms can make you ineligible for the placement programs.</p>
                            <p className='term-three'>3. <b>Periodic assessments will be administered both online and offline,</b> and candidates must
                                achieve an overall score of 85% per module. If a candidate does not meet this requirement, they can
                                take a re-test to improve their score but maximum of 2 re-test per module is allowed.</p>
                            <p className='term-three'>4. Attending all soft skill trainings like English, Aptitude and Personality development sessions are
                                mandatory for candidates. 100% attendance will be recorded and is mandatory. Usually this are
                                conducted on Weekends so that student technical learning should not get effected during normal days</p>
                            <p className='term-three'>5. Per Module Projects must be completed and submitted as per the specification given by the
                                trainer and a live working demo has to be presented to and approved by the trainer.</p>
                            <p className='term-three'>6. <b>Changing batches is generally not permitted,</b> except under certain circumstances such as
                                medical or educational reasons. If approved by the Center Manager, a processing fee of INR 15,000/- will
                                be charged for the batch change and only once throughout the duration of the training.</p>
                            <p className='term-three'>7. The course is considered complete when the candidate finishes complete fee payment, finishes
                                all the modules, assignments, assessments, mock sessions and submits the final project assigned by the
                                faculty for each module. Attendance for both technical soft skill trainings will be considered before
                                giving a final go ahead by the Center Manager. Upon completion, a final certificate will be issued and a
                                go ahead would be given for the placement team to initiate the placement services.</p>
                            <p className='term-three'><b>8. In order to be deemed job-ready, a go ahead from Center Manager on student attendance,
                                final training assessments and complete fee payment confirmation would be needed.</b> </p>
                            <p className='term-three'>9. Awdiz cannot be held responsible for any commitments or consequences that arise if the course
                                is delayed by the student for any personal, educational or medical reason, during the course which may
                                result in delays in completing the course or finding a job placement.</p>
                            <p className='term-three'>10. Ongoing students are permitted <b>to take a break for a maximum of 15 days,</b> which must be
                                approved in writing by the Center Manager and only in the case of exams, medical emergencies, or
                                other valid, considerate reasons.</p>
                            <p className='term-three'>11. If a candidate takes a <b>break from the course for a period exceeding 7 days</b> without obtaining
                                prior written permission or leave approval that has been approved by the Center Manager, their training
                                admission would be cancelled and no refund would be approved.</p>
                            <p className='term-three'>12. Candidates are required to attend all interviews arranged by AWDIZ or its authorized placement
                                associates. If a candidate is unable to attend an interview, they must seek approval from the placement
                                manager via email. <b>If a candidate misses two or more interviews arranged by AWDIZ, they will be
                                    ineligible to participate</b> in the further placement or interview process.</p>
                            <p className='term-three'>13. <b>Only after three months of completing their graduation,</b> students pursuing regular degree
                                courses will become eligible for the Job Guarantee programs provided by AWDIZ. If the candidate opts
                                for further higher education, the Job Guarantee agreement will be canceled.</p>
                            <p className='term-three'>14. <b>AWDIZ will not be held responsible if a candidate leaves the company voluntarily or if they are
                                terminated by the employer due to poor performance or misbehavior.</b> If a candidate accepts a job
                                offer from any company, whether self-obtained or through AWDIZ, they will not be eligible for further
                                job placements through AWDIZ 100% job guarantee program.</p>
                            <p className='term-three'>15. The Master programs are 100% Job guarantee package but we do not commit a fixed salary for
                                the candidate but it will be in the range of 2.0 Lpa – 6 Lpa. Salary negotiation has to be done by the
                                candidate during their interview process so we train the students how to face that question so that our
                                student gets maximum package for that position.</p>
                            <p className='term-three'>16. <b>AWDIZ has the authority to utilize the placement information, images, and videos</b> of the
                                candidate for promotional and marketing purposes, regardless of whether the candidate secured
                                placement through AWDIZ or by themselves.</p>
                            <p className='term-three'>17. <b>There is a non-refundable and non-transferable policy for all our courses at AWDIZ.</b> AWDIZ
                                does not offer refunds for any reason after a candidate has been admitted into a course. Once the
                                candidate pays the course fee and is admitted, he/she is committed to completing the course. It is
                                important for the candidate to fully understand the course and the associated requirements before
                                enrolling and making the payment. In case of any doubts or queries, the candidate should get in touch
                                with the Admissions team for clarification before making the payment.</p>
                            <p className='term-three'>18. If the client specifies a bond period in the offer letter, <b>the candidate must be open to it, and
                                should be ready to sign a bond agreement</b> as many clients are specific to offer job position to freshers
                                on this condition.</p>
                            <p className='term-three'>19. <b>The candidate should be ready to work anywhere in PAN India</b> Metropolitan cities like
                                Mumbai, New Delhi, Pune, Ahmedabad, Kolkata, Chennai, Lucknow, Hyderabad, Bengaluru etc. In
                                exceptional cases, we may accept candidates for a particular location but there will be no guarantee
                                that number of interviews for that location would be more. A special approval during admission has to
                                be taken and approved by Center Manager before admission.</p>
                            <p className='term-three'>20. Once a candidate completes our master training program and has been approved for placement
                                services by Center Manager after verification on full fee payment, they become eligible to receive job
                                openings from our side. We take our commitment to students very seriously, and we strive to place our
                                job-ready candidates in good companies within 180 days after the go-ahead for placement post
                                successful training completion</p>
                            <p className='term-three'>21. <b>Each student would be provided with multiple interviews.</b> If the candidate's performance
                                feedback from client ( Companies HR ) is not satisfactory, they should be open to considering roles in IT
                                Support, Application Support, or fulfilling Product Support requirements as offered by Awdiz.</p>
                            <p className='term-three'>22. AWDIZ management team may at any time in its sole discretion change the rules set forth
                                above as per the market demand and dynamics to stay updated. AWDIZ reserves the right to modify or
                                change the course structure, content, and syllabus at anypoint in time.</p>
                            <p className='term-three'><b>Note: Complete fee payment is mandatory to apply for interviews. Candidate with pending fees (for
                                any reason) will strictly not be allowed for any interviews arranged by Awdiz. Center Manager
                                approval for complete full payment needs to be submitted to placement team for initiating interviews
                                after training.</b></p>
                        </div>
                        <div className='term-btn-five'>
                            <button onClick={agreebtn}>Agree</button>
                            <button onClick={disagree}>Disagree</button>
                        </div>
                    </div>
                </div>
            )}

            {/* <div style={modalStyles}>
                    <div style={modalContentStyles}>
                        <h5 className='term-one'>TERMS & Conditions – Master Program</h5>
                        <div className='term-main'>
                            <p className='term-two'>Any student failing to fulfil the below criteria’s will not be eligible to attend our placements. This will
                                be a legal re-affirmation from the candidate that he will be serious through out his training program
                                duration and failing which, AWDIZ will not be or should not be blamed for students not getting jobs.</p>
                            <p className='term-three'>1. <b>To ensure successful completion of the course, attendance in all classroom or online sessions
                                must exceed 85%.</b> If a session is missed, the student can attend it in another batch by notifying the HR
                                team of Awdiz. Maximum 3 session can be missed and backup is permitted per module beyond which
                                you need to take a special approval from the center manager or you will not be permitted to attend our
                                placement programs.</p>
                            <p className='term-three'>2. To meet the requirements of the course, all assignments, quizzes, internships, mock sessions,
                                and self-learning activities must be completed in full and before their respective deadlines for each
                                module. Failing on the above terms can make you ineligible for the placement programs.</p>
                            <p className='term-three'>3. <b>Periodic assessments will be administered both online and offline,</b> and candidates must
                                achieve an overall score of 85% per module. If a candidate does not meet this requirement, they can
                                take a re-test to improve their score but maximum of 2 re-test per module is allowed.</p>
                            <p className='term-three'>4. Attending all soft skill trainings like English, Aptitude and Personality development sessions are
                                mandatory for candidates. 100% attendance will be recorded and is mandatory. Usually this are
                                conducted on Weekends so that student technical learning should not get effected during normal days</p>
                            <p className='term-three'>5. Per Module Projects must be completed and submitted as per the specification given by the
                                trainer and a live working demo has to be presented to and approved by the trainer.</p>
                            <p className='term-three'>6. <b>Changing batches is generally not permitted,</b> except under certain circumstances such as
                                medical or educational reasons. If approved by the Center Manager, a processing fee of INR 15,000/- will
                                be charged for the batch change and only once throughout the duration of the training.</p>
                            <p className='term-three'>7. The course is considered complete when the candidate finishes complete fee payment, finishes
                                all the modules, assignments, assessments, mock sessions and submits the final project assigned by the
                                faculty for each module. Attendance for both technical soft skill trainings will be considered before
                                giving a final go ahead by the Center Manager. Upon completion, a final certificate will be issued and a
                                go ahead would be given for the placement team to initiate the placement services.</p>
                            <p className='term-three'><b>8. In order to be deemed job-ready, a go ahead from Center Manager on student attendance,
                                final training assessments and complete fee payment confirmation would be needed.</b> </p>
                            <p className='term-three'>9. Awdiz cannot be held responsible for any commitments or consequences that arise if the course
                                is delayed by the student for any personal, educational or medical reason, during the course which may
                                result in delays in completing the course or finding a job placement.</p>
                            <p className='term-three'>10. Ongoing students are permitted <b>to take a break for a maximum of 15 days,</b> which must be
                                approved in writing by the Center Manager and only in the case of exams, medical emergencies, or
                                other valid, considerate reasons.</p>
                            <p className='term-three'>11. If a candidate takes a <b>break from the course for a period exceeding 7 days</b> without obtaining
                                prior written permission or leave approval that has been approved by the Center Manager, their training
                                admission would be cancelled and no refund would be approved.</p>
                            <p className='term-three'>12. Candidates are required to attend all interviews arranged by AWDIZ or its authorized placement
                                associates. If a candidate is unable to attend an interview, they must seek approval from the placement
                                manager via email. <b>If a candidate misses two or more interviews arranged by AWDIZ, they will be
                                    ineligible to participate</b> in the further placement or interview process.</p>
                            <p className='term-three'>13. <b>Only after three months of completing their graduation,</b> students pursuing regular degree
                                courses will become eligible for the Job Guarantee programs provided by AWDIZ. If the candidate opts
                                for further higher education, the Job Guarantee agreement will be canceled.</p>
                            <p className='term-three'>14. <b>AWDIZ will not be held responsible if a candidate leaves the company voluntarily or if they are
                                terminated by the employer due to poor performance or misbehavior.</b> If a candidate accepts a job
                                offer from any company, whether self-obtained or through AWDIZ, they will not be eligible for further
                                job placements through AWDIZ 100% job guarantee program.</p>
                            <p className='term-three'>15. The Master programs are 100% Job guarantee package but we do not commit a fixed salary for
                                the candidate but it will be in the range of 2.0 Lpa – 6 Lpa. Salary negotiation has to be done by the
                                candidate during their interview process so we train the students how to face that question so that our
                                student gets maximum package for that position.</p>
                            <p className='term-three'>16. <b>AWDIZ has the authority to utilize the placement information, images, and videos</b> of the
                                candidate for promotional and marketing purposes, regardless of whether the candidate secured
                                placement through AWDIZ or by themselves.</p>
                            <p className='term-three'>17. <b>There is a non-refundable and non-transferable policy for all our courses at AWDIZ.</b> AWDIZ
                                does not offer refunds for any reason after a candidate has been admitted into a course. Once the
                                candidate pays the course fee and is admitted, he/she is committed to completing the course. It is
                                important for the candidate to fully understand the course and the associated requirements before
                                enrolling and making the payment. In case of any doubts or queries, the candidate should get in touch
                                with the Admissions team for clarification before making the payment.</p>
                            <p className='term-three'>18. If the client specifies a bond period in the offer letter, <b>the candidate must be open to it, and
                                should be ready to sign a bond agreement</b> as many clients are specific to offer job position to freshers
                                on this condition.</p>
                            <p className='term-three'>19. <b>The candidate should be ready to work anywhere in PAN India</b> Metropolitan cities like
                                Mumbai, New Delhi, Pune, Ahmedabad, Kolkata, Chennai, Lucknow, Hyderabad, Bengaluru etc. In
                                exceptional cases, we may accept candidates for a particular location but there will be no guarantee
                                that number of interviews for that location would be more. A special approval during admission has to
                                be taken and approved by Center Manager before admission.</p>
                            <p className='term-three'>20. Once a candidate completes our master training program and has been approved for placement
                                services by Center Manager after verification on full fee payment, they become eligible to receive job
                                openings from our side. We take our commitment to students very seriously, and we strive to place our
                                job-ready candidates in good companies within 180 days after the go-ahead for placement post
                                successful training completion</p>
                            <p className='term-three'>21. <b>Each student would be provided with multiple interviews.</b> If the candidate's performance
                                feedback from client ( Companies HR ) is not satisfactory, they should be open to considering roles in IT
                                Support, Application Support, or fulfilling Product Support requirements as offered by Awdiz.</p>
                            <p className='term-three'>22. AWDIZ management team may at any time in its sole discretion change the rules set forth
                                above as per the market demand and dynamics to stay updated. AWDIZ reserves the right to modify or
                                change the course structure, content, and syllabus at anypoint in time.</p>
                            <p className='term-three'><b>Note: Complete fee payment is mandatory to apply for interviews. Candidate with pending fees (for
                                any reason) will strictly not be allowed for any interviews arranged by Awdiz. Center Manager
                                approval for complete full payment needs to be submitted to placement team for initiating interviews
                                after training.</b></p>
                        </div>
                        <div className='term-btn-five'>
                            <button onClick={agreebtn}>Agree</button>
                            <button onClick={disagree}>Disagree</button>
                        </div>
                    </div>
                </div> */}
        </div>
    )
}

export default Studentlogin;
