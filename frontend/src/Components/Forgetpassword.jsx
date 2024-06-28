import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ReactComponent as Forgoticon } from '../Svg/forgot.svg';

const Forgetpassword = () => {

    const [registeredemail, setregisteredemail] = useState({ email: "" });
    console.log(registeredemail, "registeredemail");

    const route = useNavigate();

    const forgetandleclick = async (e) => {
        e.preventDefault();

        if (registeredemail.email) {
            const response = await axios.post("http://localhost:8000/forgetpassword", {
                email: registeredemail.email,
            });
            console.log(response.data, "check--"); // Log the entire response
            if (response.data.status === 200) {
                alert(response.data.message);
                setregisteredemail({ email: "" });
                route(`/forgetpassotp?number=${response.data.findemail.number}&_id=${response.data.findemail._id}`);
            } else if (response.data.status === 401) {
            } else if (response.data.status === 401) {
                alert(response.data.message);
                setregisteredemail({ email: "" });
            } else if (response.data.status === 400) {
                alert(response.data.message);
                setregisteredemail({ email: "" });
            }
        } else {
            alert("Please fill email");
        }
    };


    const forgethandleform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setregisteredemail({ ...registeredemail, [name]: value })
    }

    return (
        <div>

            <form onSubmit={(e) => forgetandleclick(e)} className='forget-form'>
                <div>
                    <Forgoticon className="forgot-icon" />
                </div>

                <h1 className='complain-one'>Forgot Password</h1>
                <p className='forget-para'>Enter the email you used to create your account so we can send you the <strong>OTP</strong> to reset your password</p>
                <label>Enter your registered Email</label>
                <input className='complain-input' type="text" onChange={(e) => forgethandleform(e)} name="email" value={registeredemail.email} placeholder='enter your Email' />
                <input type="submit" value="Send OTP" className='forgot-btn' />
                <input type="button" value="Back to login" className='back-btn' onClick={() => route("/adminlogin")} />
            </form>
        </div>
    )
}

export default Forgetpassword
