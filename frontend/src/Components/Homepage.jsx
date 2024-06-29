import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../redux/userrelated/authslice";
import { useNavigate } from 'react-router-dom';
import "./style.css"

const Homepage = () => {
    const userData = useSelector((state) => state.auth.withoutpass);
    console.log(userData, "userData check")

    const dispatch = useDispatch();

    const route = useNavigate();


    const logoutfunction = () => {
        dispatch(logout());
        localStorage.removeItem('state');
        route("/")
    };

    const imageUrl = userData && userData.image ? `http://15.207.248.127:8000/${userData.image.replace(/\\/g, '/')}` : '';
    console.log(imageUrl, "imageUrl")

    return (
        <div>
            <div className='homepage-one'>
                <div className='homepage-two' >
                    <div className='homepage-three' >
                        <img src="https://res.cloudinary.com/www-awdiz-in/image/upload/v1675932002/logo/awdiz.png" alt="awdiz-logo" />
                    </div>
                </div>
                <div className='homepage-four'>
                    <p>Awdiz LMS</p>
                </div>
                <div className='homepage-five'>
                    {/* {userData ? (
                        <div style={{display: "flex", flexDirection: "column-reverse", alignItems:"center",}}>
                            <h1 style={{marginTop:"0px"}} onClick={logoutfunction}>{userData.name}</h1>
                            <div style={{ border: "1px solid black", width: "50px", height: "50px", borderRadius: "25px", overflow: "hidden", marginTop:"12px" }}>
                                <img src={imageUrl} alt="" style={{ width: "100%", height: "100%" }} />
                            </div>

                        </div>
                    ) : (
                        <h1></h1>

                    )} */}

                    {userData && (
                        <div className='homepage-six'>
                            <p onClick={logoutfunction}>
                                {userData.name}
                            </p>
                            <div className='homepage-seven'>
                                {imageUrl && <img src={imageUrl} alt={userData.name} style={{ width: "100%", height: "100%" }} />}
                            </div>
                        </div>
                    )}
                </div>
            </div>


        </div>
    );
};

export default Homepage;
