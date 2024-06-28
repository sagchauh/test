import React, { useState } from 'react';
import Course from './Course';
import Studentregister from './Studentregister';
import Batch from './Batch';
import Teacherregister from './Teacherregister';
import Allstudentdata from './Allstudentdata';
import Addnotice from './Addnotice';
import Showcomplain from './Showcomplain';
import Employeeregister from './Employeeregister';
import Employeelist from './Employeelist';
import { ReactComponent as Forgoticon } from '../Svg/forgot.svg';
import { ReactComponent as Hamburg } from '../Svg/hamburg.svg';
import { ReactComponent as CrossIcon } from '../Svg/crossicon.svg';
import Alladminlist from './Alladminlist';
import Createtrainingmode from './Createtrainingmode';

const Admindashboard = () => {
    const [activeComponent, setActiveComponent] = useState('createtrainingmode');

    const screenwidth = window.screen.width;

    const ismobileview = screenwidth <= 810;
    console.log(ismobileview, "ismobileview");

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log(isMenuOpen, "isMenuOpen");

    const handleMenuClick = (componentName) => {
        setActiveComponent(componentName);
        setIsMenuOpen(false);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'course':
                return <Course />;
            case 'student':
                return <Studentregister />;
            case 'batch':
                return <Batch />;
            case 'teacherregister':
                return <Teacherregister />
            case 'allstudentdata':
                return <Allstudentdata />
            case 'addnotice':
                return <Addnotice />
            case 'showcomplain':
                return <Showcomplain />
            case 'employeeregister':
                return <Employeeregister />
            case 'employeelist':
                return <Employeelist />
            case 'alladminlist':
                return <Alladminlist />
            case 'createtrainingmode':
                return <Createtrainingmode />
            default:
                return null;
        }
    };



    return (
        <div>
            {/* <div style={{ border: "1px solid black", width: "100%", height: "2000px" }}>
                <h1>Admindashboard</h1>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", border: "1px solid black", height: "1500px" }}>
                    <div style={{ border: "1px solid black", width: "20%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <h1 onClick={() => handleMenuClick('course')} style={yourStyle}>Add Course</h1>
                        <h1 onClick={() => handleMenuClick('batch')} style={yourStyle}>Add Batch</h1>
                        <h1 onClick={() => handleMenuClick('teacherregister')} style={yourStyle}>Add teacher</h1>
                        <h1 onClick={() => handleMenuClick('student')} style={yourStyle}>Add Student</h1>
                        <h1 onClick={() => handleMenuClick('allstudentdata')} style={yourStyle}>student list</h1>
                        <h1 onClick={() => handleMenuClick('allstudentdata')} style={yourStyle}>Add marks</h1>
                        <h1 onClick={() => handleMenuClick('addnotice')} style={yourStyle}>Add notice</h1>
                        <h1 onClick={() => handleMenuClick('addcomplain')} style={yourStyle}>Add complain</h1>
                        <h1 onClick={() => handleMenuClick('showcomplain')} style={yourStyle}>See complain</h1>
                    </div>
                    <div style={{ border: "1px solid black", width: "80%", height: "100%" }}>
                        {renderComponent()}
                    </div>
                </div>
            </div> */}

            {ismobileview ? (
                <>
                    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                        <div className="menu-item" onClick={() => handleMenuClick('createtrainingmode')}>
                            <Forgoticon id="forgot-icon" />
                            <p>Create Trainingmode</p>
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('course')}>
                            <Forgoticon id="forgot-icon" />
                            <p>Create Course</p>
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('batch')}>
                            <Forgoticon id="forgot-icon" />
                            <p>Create Batch</p>
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('teacherregister')}>
                            <Forgoticon id="forgot-icon" />
                            <p>Register Teacher</p>
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('student')}>
                            <Forgoticon id="forgot-icon" />
                            <p>Register Student</p>
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('allstudentdata')}>
                            <Forgoticon id="forgot-icon" />
                            <p>See Student List</p>
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('addnotice')}>
                            <Forgoticon id="forgot-icon" />
                            <p>Add Notice</p>
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('employeeregister')}>
                            <Forgoticon id="forgot-icon" />
                            <p>Register Employee</p>
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('employeelist')}>
                            <Forgoticon id="forgot-icon" />
                            <p>See Employee list</p>
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('alladminlist')}>
                            <Forgoticon id="forgot-icon" />
                            <p>See Admin List</p>
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('showcomplain')}>
                            <Forgoticon id="forgot-icon" />
                            <p>See Complain</p>
                        </div>
                    </div>
                    <div className="cross-icon-container" onClick={() => setIsMenuOpen(false)}>
                        <CrossIcon id="cross-icon" />
                    </div>
                    <div className="hamburg-icon-container" onClick={() => setIsMenuOpen(true)}>
                        <Hamburg id="hamburg-icon" />
                    </div>
                </>
            ) : (

                <div className='student-item-one'>
                    <div className='student-item-two'>

                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('createtrainingmode')}>Create Trainingmode</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>

                        {/* Create Course Section */}
                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('course')}>Create Course</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>

                        {/* Create Batch Section */}
                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('batch')}>Create Batch</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>

                        {/* Register Teacher Section */}
                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('teacherregister')}>Register Teacher</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>

                        {/* Register Student Section */}
                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('student')}>Register Student</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>

                        {/* See Student List Section */}
                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('allstudentdata')}>See Student List</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>

                        {/* Add Notice Section */}
                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('addnotice')}>Add Notice</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>

                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('employeeregister')}>Register Employee</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>

                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('employeelist')}>See Employee list</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>


                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('alladminlist')}>See Admin list</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>

                        {/* See Complain Section */}
                        <div className='student-subitem-one'>
                            <div className='student-subitem-two'>
                                <Forgoticon id="forgot-icon" />
                                <p onClick={() => handleMenuClick('showcomplain')}>See Complain</p>
                            </div>
                            <div className='student-subitem-three'>
                                <Forgoticon id="forgot-icon" />
                            </div>
                        </div>

                    </div>
                    <div className='student-item-three'>
                        {renderComponent()}
                    </div>
                </div>
            )}

            {isMenuOpen && <div>
                <div className={`menu ${isMenuOpen ? 'open' : ''}`}>

                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('createtrainingmode')}>Create Trainingmode</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('course')}>Create Course</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    {/* Create Batch Section */}
                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('batch')}>Create Batch</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    {/* Register Teacher Section */}
                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('teacherregister')}>Register Teacher</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    {/* Register Student Section */}
                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('student')}>Register Student</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    {/* See Student List Section */}
                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('allstudentdata')}>See Student List</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    {/* Add Notice Section */}
                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('addnotice')}>Add Notice</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('employeeregister')}>Register Employee</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('employeelist')}>See Employee list</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    {/* Admin list Section */}
                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('alladminlist')}>See Admin list</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>

                    {/* See Complain Section */}
                    <div className='student-subitem-one'>
                        <div className='student-subitem-two'>
                            <Forgoticon id="forgot-icon" />
                            <p onClick={() => handleMenuClick('showcomplain')}>See Complain</p>
                        </div>
                        <div className='student-subitem-three'>
                            <Forgoticon id="forgot-icon" />
                        </div>
                    </div>
                </div>

            </div>}

            <div className='dashboard-hide' id='student-item-three'>
                {renderComponent()}
            </div>

        </div>
    );
}

export default Admindashboard;
