import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const Adminregister = () => {
    const [adminregisterdata, setadminregisterdata] = useState({ name: "", email: "", password: "", image: null, number: "" });
    console.log(adminregisterdata, "adminregisterdata");

    const route = useNavigate();

    const adminregisterclick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", adminregisterdata.name);
        formData.append("email", adminregisterdata.email);
        formData.append("number", adminregisterdata.number);
        formData.append("password", adminregisterdata.password);
        if (adminregisterdata.image) formData.append("image", adminregisterdata.image);

        const response = await axios.post("http://15.207.248.127:8000/adminregister", formData)
        console.log(response.data, "check--");
        if (response.data.status === 200) {
            alert(response.data.message)
            setadminregisterdata({ name: "", email: "", password: "", image: null, number: "" });
            route("/adminlogin")
        } else if (response.data.status === 400) {
            alert(response.data.message)
            setadminregisterdata({ name: "", email: "", password: "", image: null, number: "" });
        } else if (response.data.status === 401) {
            alert(response.data.message)
            setadminregisterdata({ name: "", email: "", password: "", image: null, number: "" });
        }
        else if (response.data.status === 402) {
            alert(response.data.message)
            setadminregisterdata({ name: "", email: "", password: "", image: null, number: "" });
        } else if (response.data.status === 403) {
            alert(response.data.message)
            setadminregisterdata({ name: "", email: "", password: "", image: null, number: "" });
        } else if (response.data.status === 404) {
            alert(response.data.message)
            setadminregisterdata({ name: "", email: "", password: "", image: null, number: "" });
        } else {
            alert("please select all field")
        }


    }

    const adminregisterform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setadminregisterdata({ ...adminregisterdata, [name]: value })
    }

    return (
        <div>
            {/* <div style={{ height: "500px", border: "1px solid black", width: "40%", margin: "auto" }}>
                <form onSubmit={(e) => adminregisterclick(e)}>
                    <h1>Admin Registerform</h1>
                    <div className='awdiz-login-section' style={{ height: "1000px" }}>
                        <label>name</label>
                        <input type="text" onChange={(e) => adminregisterform(e)} name="name" value={adminregisterdata.name} placeholder='enter your name' />
                        <br />
                        <br />
                        <label>email</label>
                        <input type="text" onChange={(e) => adminregisterform(e)} name="email" value={adminregisterdata.email} placeholder='enter your email' />
                        <br />
                        <br />
                        <label>number</label>
                        <input type="text" onChange={(e) => adminregisterform(e)} name="number" value={adminregisterdata.number} placeholder='enter your number' />
                        <br />
                        <br />
                        <label>Profile Image</label>
                        <input type="file" onChange={(e) => setadminregisterdata({ ...adminregisterdata, image: e.target.files[0] })} />
                        <br />
                        <br />
                        <label>password</label>
                        <input type="text" onChange={(e) => adminregisterform(e)} name="password" value={adminregisterdata.password} placeholder='enter your password' />
                        <br />
                        <br />
                        <input type="submit" value="register" className='btn' />
                    </div>
                </form>
            </div> */}

            <h1 className='register-h1'>Admin Registration</h1>
            <form className='register-one'>
                {/* <p className='register-two'>Personal Information</p> */}
                <div className='register-three'>
                    <div className='register-four'>
                        <label>Name</label>
                        <input className='register-input' type="text" onChange={(e) => adminregisterform(e)} name="name" value={adminregisterdata.name} placeholder='enter your name' />
                    </div>
                    <div className='register-four'>
                        <label>Number</label>
                        <input className='register-input' type="text" onChange={(e) => adminregisterform(e)} name="number" value={adminregisterdata.number} placeholder='enter your number' />
                    </div>
                    <div className='register-four'>
                        <label>Email</label>
                        <input className='register-input' type="text" onChange={(e) => adminregisterform(e)} name="email" value={adminregisterdata.email} placeholder='enter your email' />
                    </div>
                    <div className='register-four'>
                        <label>Password</label>
                        <input className='register-input' type="text" onChange={(e) => adminregisterform(e)} name="password" value={adminregisterdata.password} placeholder='enter your password' />
                    </div>
                    <div className='register-four'>
                        <label>Upload Profile Image</label>
                        <input className='register-profile' type="file" onChange={(e) => setadminregisterdata({ ...adminregisterdata, image: e.target.files[0] })} />
                    </div>
                </div>
            </form>

            <input type="submit" value="register" className='register-btn' onClick={(e) => adminregisterclick(e)} />
        </div>
    )
}

export default Adminregister





