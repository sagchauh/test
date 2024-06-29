import axios from 'axios';
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { login } from '../redux/userrelated/authslice';

const Adminlogin = () => {
    const [adminlogin, setadminlogin] = useState({ email: "", password: "" });
    console.log(adminlogin, "adminlogin");

    // const dispatch = useDispatch();

    const route = useNavigate();

    const adminhandleclick = async (e) => {
        e.preventDefault();

        if (adminlogin.email && adminlogin.password) {
            const response = await axios.post("http://15.207.248.127:8000/adminlogin", {
                email: adminlogin.email,
                password: adminlogin.password
            })
            console.log(response.data, "adminlogin");
            if (response.data.status === 200) {
                alert(response.data.message);
                route(`/otp?number=${response.data.adminData.number}&_id=${response.data.adminData._id}`);
                setadminlogin({ email: "", password: "" });
            }
            else if (response.data.status === 201) {
                alert(response.data.message);
                setadminlogin({ email: "", password: "" });
            } else if (response.data.status === 401) {
                alert(response.data.message);
                setadminlogin({ email: "", password: "" });
            }
            else if (response.data.status === 400) {
                alert(response.data.message);
                setadminlogin({ email: "", password: "" });
            }
        }
        else {
            alert("please select all field")
        }
    }


    const adminhandleform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setadminlogin({ ...adminlogin, [name]: value })
    }
    return (
        <div>

            {/* <div style={{ border: "1px solid black", width: "30%", margin: "auto", marginTop: "50px" }}>
                <div>
                    <h1>Admin-login</h1>
                    <form onSubmit={(e) => adminhandleclick(e)}>
                        <div className='awdiz-login-section'>
                            <label>Email</label>
                            <input type="text" onChange={(e) => adminhandleform(e)} name="email" value={adminlogin.email} placeholder='enter your username' />
                            <br />
                            <br />
                            <label>Password</label>
                            <input type="password" onChange={(e) => adminhandleform(e)} name="password" value={adminlogin.password} placeholder='enter your password' />
                            <br />
                            <p style={{display:"inline-block"}} className='login-forget' onClick={() => route("/forgetpassword")}>Forget Password ?</p>
                            <br />
                            <input type="submit" value="login" className='btn' />
                            <br />
                            <br />
                        </div>
                    </form>
                    <input type="submit" value="Admin register" className='btn' onClick={() => route("/adminregister")} />
                </div>
            </div> */}

            <form className='update-form' onSubmit={(e) => adminhandleclick(e)}>
                <h1 className='complain-one' >Adminlogin</h1>
                <label>Email</label>
                <input className='complain-input' type="text" onChange={(e) => adminhandleform(e)} name="email" value={adminlogin.email} placeholder='enter your username' />

                <label>Password</label>
                <input className='login-input' type="password" onChange={(e) => adminhandleform(e)} name="password" value={adminlogin.password} placeholder='Enter your password' />

                <p onClick={() => route("/forgetpassword")} style={{ cursor: "pointer", display: "inline-block", textAlign: "left" }}>Forget Password ?</p>

                <input type="submit" value="login" className='complain-btn' />

                <a href="adminregister" className='teach-btn'>Create an Account</a>

            </form>
        </div>
    )
}

export default Adminlogin
