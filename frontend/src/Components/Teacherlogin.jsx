import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from "../redux/userrelated/authslice"
import { useDispatch } from 'react-redux';

const Teacherlogin = () => {
    const [teacherlogin, setteacherlogin] = useState({ email: "", password: "" });
    console.log(teacherlogin, "teacherlogin");

    const dispatch = useDispatch();
    const route = useNavigate()

    const teacherhandleclick = async (e) => {
        e.preventDefault();

        if (teacherlogin.email && teacherlogin.password) {
            const response = await axios.post("http://15.207.248.127:8000/teacherlogin", {
                email: teacherlogin.email,
                password: teacherlogin.password,
            })
            console.log(response.data, "response");
            if (response.data.status === 200) {
                alert(response.data.message);
                dispatch(login({ logindata: response.data.logindata, withoutpass: response.data.withoutpass }))
                setteacherlogin({ email: "", password: "" });
                route("/teacherdashboard");
            } else if (response.data.status === 400) {
                alert(response.data.message);
                setteacherlogin({ email: "", password: "" });
            } else if (response.data.status === 401) {
                alert(response.data.message);
                setteacherlogin({ email: "", password: "" });
            }
        } else {
            alert("please select all field")
        }
    }

    const teacherhandleform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setteacherlogin({ ...teacherlogin, [name]: value })
    }

    const forgetpass = () => {
        alert("please contact to admin")
    }


    return (
        <div>

            {/* <div style={{ border: "1px solid black", width: "30%", margin: "auto", marginTop: "50px" }}>
                <h1>Teacherlogin</h1>
                <form onSubmit={(e) => teacherhandleclick(e)}>
                    <div className='teacher-login-section'>
                        <label>Email</label>
                        <input type="text" onChange={(e) => teacherhandleform(e)} name="email" value={teacherlogin.email} placeholder='enter your username' />
                        <br />
                        <br />
                        <label>Password</label>
                        <input type="password" onChange={(e) => teacherhandleform(e)} name="password" value={teacherlogin.password} placeholder='enter your password' />
                        <br />
                        <br />
                        <p onClick={(e) => forgetpass(e)} style={{cursor:"pointer", display:"inline-block"}}>Forget Password ?</p>
                        <br />
                        <br />
                        <input type="submit" value="login" className='btn' />
                        <br />
                        <br />
                    </div>
                </form>
                <input type="submit" value="Teacher register" className='btn' onClick={() => route("/teacherregister")} />
            </div> */}

            <form className='update-form' onSubmit={(e) => teacherhandleclick(e)}>
                <h1 className='complain-one' >Teacherlogin</h1>

                <label>Email</label>
                <input className='complain-input' type="text" onChange={(e) => teacherhandleform(e)} name="email" value={teacherlogin.email} placeholder='enter your username' />

                <label>Password</label>
                <input className='login-input' type="password" onChange={(e) => teacherhandleform(e)} name="password" value={teacherlogin.password} placeholder='Enter your password' />
                <p onClick={forgetpass} style={{ cursor: "pointer", display: "inline-block", textAlign: "left" }}>Forget Password ?</p>

                <input type="submit" value="login" className='complain-btn' />

                {/* <a href="teacherregister" className='teach-btn'>Create an Account</a> */}
                
            </form>


        </div>
    )
}

export default Teacherlogin
