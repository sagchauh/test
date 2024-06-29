import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Adminicon } from '../Svg/admin.svg';
import { ReactComponent as Teachericon } from '../Svg/teacher.svg';

const Mainpage = () => {

    const route = useNavigate();
    return (
        <div>
            <div className='main-one'>
                <h1 className='main-h1'>Login as a</h1>
                <div className='main-two'>
                    <div className='main-three' onClick={() => route("/adminlogin")}>
                        <Adminicon className="icon" />
                        <p className='teacher-fifteen'>Admin Login</p>
                    </div>
                    <div className='main-three' onClick={() => route("/teacherlogin")}>
                    <Teachericon className="icon" />
                        <p className='teacher-fifteen'>Teacher Login</p>
                    </div>
                    <div className='main-three' onClick={() => route("/employeelogin")}>
                    <Teachericon className="icon" />
                        <p className='teacher-fifteen'>Staff Login</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainpage
