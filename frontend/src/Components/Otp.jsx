import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { login } from '../redux/userrelated/authslice';
import { useDispatch } from 'react-redux';
import { ReactComponent as Forgototpicon } from '../Svg/forgototp.svg';

const Otp = () => {

    const [sendotp, setsendotp] = useState({ otp: "" });
    const dispatch = useDispatch();
    const route = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const number = queryParams.get("number");
    const id = queryParams.get("_id");

    const params = useParams();
    console.log(params, "params");

    // const [timer, settimer] = useState(30);

    // useEffect(() => {
    //     const countdown = setInterval(() => {
    //         settimer(prevTimer => {
    //             if (prevTimer === 0) {
    //                 clearInterval(countdown);
    //             }
    //             return prevTimer > 0 ? prevTimer - 1 : prevTimer;
    //         });
    //     }, 1000);
    //     return () => clearInterval(countdown);
    // }, []);

    const submitotp = async (e) => {
        e.preventDefault();

        if (sendotp.otp && id) {
            const response = await axios.post("http://15.207.248.127:8000/verifyotp", {
                _id: id,
                otp: sendotp.otp
            });
            if (response.data.status === 200) {
                alert(response.data.message);
                dispatch(login({ logindata: response.data.logindata, withoutpass: response.data.withoutpass }));
                setsendotp({ otp: "" });
                route("/admindashboard")
            } else if (response.data.status === 400) {
                alert(response.data.message);
            } else if (response.data.status === 401) {
                alert(response.data.message);
            } else if (response.data.status === 402) {
                alert(response.data.message);
            } else if (response.data.status === 403) {
                alert(response.data.message);
            }
        }
    };

    const handleotp = (e) => {
        const { name, value } = e.target;
        setsendotp({ ...sendotp, [name]: value });
    };

    return (
        <div>
            {/* <h1>OTP Verification</h1>
            <p>The OTP is sent to: +{number}</p>
            <input type="text" placeholder="Enter your OTP" onChange={handleotp} name="otp" value={sendotp.otp} />
            <p>otp expired in 30 second</p>
            {timer === 0 ? (
                <>
                    <p>OTP Expired</p>
                    <button>go to login</button>
                </>
            ) : (
                <>
                    <p>OTP expires in {timer} seconds</p>
                    <button onClick={submitotp}>Submit</button>
                </>
            )} */}

            <form onSubmit={submitotp} className='forget-form'>
                <div>
                    <Forgototpicon className="forgot-icon" />
                </div>

                <h1 className='complain-one'>OTP Verification</h1>
                <p className='forgotpara'>The OTP is sent to <strong>+ 91 ******2255</strong>  and is valid for <strong>30 seconds</strong></p>
                <input className='complain-input' type="text" placeholder="Enter your OTP" onChange={handleotp} name="otp" value={sendotp.otp} />
                <input type="submit" value="submit" className='forgot-btn' />
            </form>
        </div>
    );
};

export default Otp;
