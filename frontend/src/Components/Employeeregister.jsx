import axios from 'axios';
import React, { useState } from 'react'

const Employeeregister = () => {

    const [teacherregisterdata, setteacherregisterdata] = useState({ name: "", email: "", number: "", password: "", image: null });
    console.log(teacherregisterdata, "teacherregisterdata");


    const employeeregisterform = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setteacherregisterdata({ ...teacherregisterdata, [name]: value })
    }

    const teacherregisterclick = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", teacherregisterdata.name);
        formData.append("email", teacherregisterdata.email);
        formData.append("number", teacherregisterdata.number);
        formData.append("password", teacherregisterdata.password);

        if (teacherregisterdata.image) formData.append("image", teacherregisterdata.image);

        const response = await axios.post("http://15.207.248.127:8000/employeeregister", formData);
        console.log(response.data, "check heree");
        if (response.data.status === 200) {
            alert(response.data.message);
            setteacherregisterdata({ name: "", email: "", number: "", password: "", image: null });
        } else if (response.data.status === 201) {
            alert(response.data.message);
            setteacherregisterdata({ name: "", email: "", number: "", password: "", image: null });
        } else if (response.data.status === 202) {
            alert(response.data.message);
            setteacherregisterdata({ name: "", email: "", number: "", password: "", image: null });
        }

    }

    return (
        <div>
            <h1 className='register-h1'>Employee Registration</h1>

            <form className='register-one'>
                <p className='register-two'>Personal Information</p>
                <div className='register-three'>
                    <div className='register-four'>
                        <label>Name</label>
                        <input className='register-input' type="text" onChange={employeeregisterform} name="name" value={teacherregisterdata.name} placeholder='enter your name' />
                    </div>
                    <div className='register-four'>
                        <label>Number</label>
                        <input className='register-input' type="text" onChange={employeeregisterform} name="number" value={teacherregisterdata.number} placeholder='enter your number' />
                    </div>
                    <div className='register-four'>
                        <label>Email</label>
                        <input className='register-input' type="text" onChange={employeeregisterform} name="email" value={teacherregisterdata.email} placeholder='enter your email' />
                    </div>
                    <div className='register-four'>
                        <label>Password</label>
                        <input className='register-input' type="text" onChange={employeeregisterform} name="password" value={teacherregisterdata.password} placeholder='enter your password' />
                    </div>
                    <div className='register-four'>
                        <label>Upload Profile Image</label>
                        <input className='register-profile' type="file" onChange={(e) => setteacherregisterdata({ ...teacherregisterdata, image: e.target.files[0] })} />
                    </div>
                </div>
            </form>

            <input type="submit" value="register" onClick={teacherregisterclick} className='register-btn' />
        </div>
    )
}

export default Employeeregister
