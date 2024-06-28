import axios from 'axios';
import React, { useState } from 'react'
import "../Components/style.css"
import { useDispatch } from 'react-redux';
import { login } from "../redux/userrelated/authslice"
import { useNavigate } from 'react-router-dom';

const Employeelogin = () => {

    const [employeelogin, setemployeelogin] = useState({ email: "", password: "" });
    console.log(employeelogin, "employeelogin");

    const dispatch = useDispatch();

    const route = useNavigate();


    const employeethandleform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setemployeelogin({ ...employeelogin, [name]: value })
    }

    const forgetpass = () => {
        alert("Please contact the admin");
    }

    const employeehandleclick = async (e) => {
        e.preventDefault()
        if (employeelogin.email && employeelogin.password) {
            const response = await axios.post("http://localhost:8000/employeelogin", {
                email: employeelogin.email,
                password: employeelogin.password
            });
            console.log(response.data, "response check");
            if (response.data.status === 200) {
                alert(response.data.message);
                dispatch(login({ logindata: response.data.logindata, withoutpass: response.data.withoutpass }));
                // route(`/punchtime/${response.data.withoutpass._id}`)
                route("/employeedashboard")
                setemployeelogin({ email: "", password: "" });
            } else if (response.data.status === 401) {
                alert(response.data.message);
                setemployeelogin({ email: "", password: "" });
            } else if (response.data.status === 402) {
                alert(response.data.message);
                setemployeelogin({ email: "", password: "" });
            }
        }
        else {
            alert("please select all field")
        }
    }

    return (
        <div>
            <form className='update-form' onSubmit={employeehandleclick}>
                <h1 className='complain-one' >Employeelogin</h1>
                <label>Email</label>
                <input className='complain-input' type="text" onChange={employeethandleform} name="email" value={employeelogin.email} placeholder='Enter your username' />
                <label>Password</label>
                <input className='login-input' type="password" onChange={employeethandleform} name="password" value={employeelogin.password} placeholder='Enter your password' />
                <p onClick={forgetpass} className='forgot'>Forget Password ?</p>
                <input type="submit" value="Login" className='complain-btn' />
            </form>
        </div>
    )
}

export default Employeelogin
