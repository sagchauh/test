import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Teacherregister = () => {
    const [teacheregisterdata, setteacheregisterdata] = useState({ name: "", email: "", password: "", image: null });
    console.log(teacheregisterdata, "teacheregisterdata");

    const route = useNavigate();

    const teacherregisterclick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", teacheregisterdata.name);
        formData.append("email", teacheregisterdata.email);
        formData.append("password", teacheregisterdata.password);
        formData.append("course", selectcourse)
        if (teacheregisterdata.image) formData.append("image", teacheregisterdata.image);
        const response = await axios.post("http://localhost:8000/teacherregister", formData);
        if (response.data.status === 200) {
            alert(response.data.message)
            // dispatch(removebatch())
            // dispatch(removedropdown())
            setteacheregisterdata({ name: "", email: "", password: "", image: null });
            route("/studentregister")
        } else if (response.data.status === 400) {
            alert(response.data.message)
            setteacheregisterdata({ name: "", email: "", password: "", image: null });
        }
        else if (response.data.status === 401) {
            alert(response.data.message)
            setteacheregisterdata({ name: "", email: "", password: "", image: null });
        } else if (response.data.status === 402) {
            alert(response.data.message)
            setteacheregisterdata({ name: "", email: "", password: "", image: null });
        } else {
            alert("please select all field")
        }
    }

    const teacherregisterform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setteacheregisterdata({ ...teacheregisterdata, [name]: value })
    }

    const [selectcourse, setselectcourse] = useState("");
    console.log(selectcourse, "selectcourse");

    const [showallcourse, setshowallcourse] = useState([]);
    console.log(showallcourse, "showallcourse");

    useEffect(() => {
        async function course() {
            const response = await axios.post("http://localhost:8000/getallcourse");
            console.log(response.data, "check here--");
            setshowallcourse(response.data)

            if (response.data.length > 0) {
                setselectcourse(response.data[0].course)
            }
        }
        course()

    }, [])


    const handlecourse = (e) => {
        setselectcourse(e.target.value)
    }
    return (
        <div>

            {/* <div style={{ height: "500px", border: "1px solid black", width: "40%", margin: "auto" }}>
                <form onSubmit={(e) => teacherregisterclick(e)}>
                    <h1>teacher-Register-form</h1>
                    <div className='awdiz-login-section' style={{ height: "1000px" }}>
                        <label>name</label>
                        <input type="text" onChange={(e) => teacherregisterform(e)} name="name" value={teacheregisterdata.name} placeholder='enter your name' />
                        <br />
                        <br />
                        <label>email</label>
                        <input type="text" onChange={(e) => teacherregisterform(e)} name="email" value={teacheregisterdata.email} placeholder='enter your email' />
                        <br />
                        <br />
                        <select onChange={handlecourse}>
                            <option value="">select your course</option>
                            {showallcourse.map((e, i) => (
                               <option key={i} value={e.course}> {e.course}</option>
                            ))}
                        </select>
                        <br />
                        <br />
                        <label>Profile Image</label>
                        <input type="file" onChange={(e) => setteacheregisterdata({ ...teacheregisterdata, image: e.target.files[0] })} />
                        <br /><br />
                        <label>password</label>
                        <input type="text" onChange={(e) => teacherregisterform(e)} name="password" value={teacheregisterdata.password} placeholder='enter your password' />
                        <br />
                        <br />
                        <input type="submit" value="register" className='btn' />
                    </div>
                </form>
            </div> */}

            <h1 className='register-h1'>Teacher Registration</h1>
            <form className='register-one' >
                
                <div className='register-three'>
                    <div className='register-four'>
                        <label>Name</label>
                        <input className='register-input' type="text" onChange={(e) => teacherregisterform(e)} name="name" value={teacheregisterdata.name} placeholder='enter your name' />
                    </div>
                    <div className='register-four'>
                        <label>Email</label>
                        <input className='register-input' type="text" onChange={(e) => teacherregisterform(e)} name="email" value={teacheregisterdata.email} placeholder='enter your email' />
                    </div>
                    <div className='register-four'>
                        <label>Password</label>
                        <input className='register-input' type="text" onChange={(e) => teacherregisterform(e)} name="password" value={teacheregisterdata.password} placeholder='enter your password' />
                    </div>
                    <div className='register-four'>
                        <label>Select Your Course</label>
                        <select className='register-input' onChange={handlecourse}>
                            <option value="">select your course</option>
                            {showallcourse.map((e, i) => (
                                <option key={i} value={e.course}> {e.course}</option>
                            ))}
                        </select>
                    </div>
                    <div className='register-four'>
                        <label>Upload Profile Image</label>
                        <input className='register-profile' type="file" onChange={(e) => setteacheregisterdata({ ...teacheregisterdata, image: e.target.files[0] })} />
                    </div>
                </div>
            </form>
            <input type="submit" value="register" className='register-btn' onClick={(e) => teacherregisterclick(e)} />
        </div>
    )
}

export default Teacherregister
