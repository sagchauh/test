import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { ReactComponent as Forgoticon } from '../Svg/forgot.svg';

const Resetpassword = () => {

    const [newpassword, setnewpassword] = useState({ newpassword: "" });
    console.log(newpassword, "newpassword");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    console.log(id, "id check");

    const newpasswordandleclick = async (e) => {
        e.preventDefault();

        if (newpassword) {
            const response = await axios.post("http://15.207.248.127:8000/resetpassword", {
                _id: id,
                createnewpassword: newpassword.newpassword
            })
            console.log(response.data, "check--")
            if (response.data.status === 200) {
                alert(response.data.message);
            } else if (response.data.status === 400) {
                alert(response.data.message);
            }
        } else {
            alert("enter password")
        }
    }


    const newpasswordhandleform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setnewpassword({ ...newpassword, [name]: value });
    }


    return (
        <div>
            {/* <h1>Resetpassword</h1>
            <form onSubmit={(e) => newpasswordandleclick(e)}>
                <div className='awdiz-login-section'>
                    <label>Create new password</label>
                    <br />
                    <br />
                    <input type="text" className='complain-input' onChange={(e) => newpasswordhandleform(e)} name="newpassword" value={newpassword.newpassword} placeholder='enter your password' />
                    <br />
                    <br />
                    <input type="submit" value="submit" className='btn' />

                </div>
            </form> */}

            <form onSubmit={(e) => newpasswordandleclick(e)} className='forget-form'>
                <div>
                    <Forgoticon className="forgot-icon" />
                </div>

                <h1 className='complain-one'>Reset Password</h1>
                
                <label>Enter your new password</label>
                <input type="text" className='complain-input' onChange={(e) => newpasswordhandleform(e)} name="newpassword" value={newpassword.newpassword} placeholder='enter your password' />
                <input type="submit" value="submit" className='forgot-btn' />
            </form>
        </div>
    )
}

export default Resetpassword
