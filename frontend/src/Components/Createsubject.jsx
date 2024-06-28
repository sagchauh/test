import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Createsubject = () => {
    const [createsubject, setcreatesubject] = useState({ subject: "" });
    console.log(createsubject, "createsubject");

    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate, "selectedDate");

    const route = useNavigate()

    const currentDate = new Date();

    const location = useLocation();
    const queryparams = new URLSearchParams(location.search);

    const studentIds = JSON.parse(queryparams.get('studentIds'));
    console.log(studentIds, "studentIds");

    const teacherData = useSelector((state) => state.auth.withoutpass);
    console.log(teacherData._id, "teacherData");

    const createsub = async (e) => {
        e.preventDefault();

        if (createsubject.subject && selectedDate) {

            const adjustedDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            console.log(adjustedDate, "adjustedDate")

            const response = await axios.post("http://localhost:8000/createtest", {
                studentIds: studentIds,
                createsubject: createsubject.subject,
                assignedteacher: teacherData._id,
                date: adjustedDate,
            });

            if (response.data.status === 200) {
                alert(response.data.message);
                setcreatesubject({ subject: "" });
                setSelectedDate(null);
                route("/teacherdashboard");
            } else if (response.data.status === 400) {
                alert(response.data.message);
            } else if (response.data.status === 401) {
                alert(response.data.message);
            } else if (response.data.status === 402) {
                alert(response.data.message);
            } else if (response.data.status === 403) {
                alert(response.data.message);
            }

        } else {
            alert("Please fill in all fields");
        }
    }

    const handlesubject = (e) => {
        const { name, value } = e.target;
        setcreatesubject({ ...createsubject, [name]: value });
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <form className='create-sub'>
                <h1 className='complain-one'>In time</h1>
                <label>Select a Date</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    minDate={new Date()}
                    maxDate={currentDate}
                    className='date-css'
                />

                <label>Create subject</label>
                <input className='complain-input'
                    type="text"
                    placeholder='Enter your time'
                    name='subject'
                    value={createsubject.subject}
                    onChange={handlesubject}
                />

                <button className='complain-btn' onClick={createsub}>Submit</button>
            </form>
        </div>
    )
}

export default Createsubject;






