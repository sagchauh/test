import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Editemployeeattendance = () => {
    const [employeedata, setemployeedata] = useState({});
    console.log(employeedata, "employeedata");

    const [selectedIntimeDate, setSelectedIntimeDate] = useState(null);
    console.log(selectedIntimeDate, "selectedIntimeDate");

    const [selectedOuttimeDate, setSelectedOuttimeDate] = useState(null);
    console.log(selectedOuttimeDate, "selectedOuttimeDate");

    const [day, setDay] = useState('');
    console.log(day, "day");

    const [outday, setoutday] = useState('');
    console.log(outday, "outday");

    const [time, setTime] = useState('');
    console.log(time, "time");

    const [outTime, setOutTime] = useState('');
    console.log(outTime, "outTime");

    const { id } = useParams();
    console.log(id, "id");

    const route = useNavigate()

    useEffect(() => {
        async function showdata() {
            const response = await axios.post("http://localhost:8000/showsingleemployee", { _id: id });
            setemployeedata(response.data);
        }
        showdata();
    }, [id]);

    useEffect(() => {
        if (selectedIntimeDate && employeedata.intime) {
            const selectedDateString = selectedIntimeDate.toDateString();
            const attendance = employeedata.intime.find(
                intime => new Date(intime.date).toDateString() === selectedDateString
            );
            if (attendance) {
                setDay(attendance.day);
                setTime(attendance.time);
            } else {
                setDay('');
                setTime('');
            }
        }
    }, [selectedIntimeDate, employeedata]);

    useEffect(() => {
        if (selectedOuttimeDate && employeedata.outtime) {
            const selectedDateString = selectedOuttimeDate.toDateString();
            const attendance = employeedata.outtime.find(
                outtime => new Date(outtime.date).toDateString() === selectedDateString
            );
            if (attendance) {
                setoutday(attendance.day);
                setOutTime(attendance.time);
            } else {
                setoutday('');
                setOutTime('');
            }
        }
    }, [selectedOuttimeDate, employeedata]);

    const handleIntimeDateChange = (date) => {
        setSelectedIntimeDate(date);
    };

    const handleOuttimeDateChange = (date) => {
        setSelectedOuttimeDate(date);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleOutTimeChange = (e) => {
        setOutTime(e.target.value);
    };

    const includedIntimeDates = employeedata.intime ? employeedata.intime.map(intime => new Date(intime.date)) : [];
    const includedOuttimeDates = employeedata.outtime ? employeedata.outtime.map(outtime => new Date(outtime.date)) : [];

    const handleIntimeSubmit = async (e) => {
        e.preventDefault();
        if (selectedIntimeDate && day && time) {
            const response = await axios.post("http://localhost:8000/editintime", {
                _id: id,
                date: selectedIntimeDate,
                day: day,
                time: time
            });
            if (response.data.status === 200) {
                alert(response.data.message);
                setSelectedIntimeDate(null);
                setDay('');
                setTime('');
                route("/admindashboard")
            } else if (response.data.status === 401) {
                alert(response.data.message);
                setSelectedIntimeDate(null);
                setDay('');
                setTime('');
            } else if (response.data.status === 402) {
                alert(response.data.message);
                setSelectedIntimeDate(null);
                setDay('');
                setTime('');
            }
        } else {
            alert("Please fill all fields");
        }
    };

    const handleOuttimeSubmit = async (e) => {
        e.preventDefault();
        if (selectedOuttimeDate && outday && outTime) {
            const response = await axios.post("http://localhost:8000/editouttime", {
                _id: id,
                date: selectedOuttimeDate,
                day: outday,
                time: outTime
            });
            console.log(response.data, "response out")
            if (response.data.status === 200) {
                alert(response.data.message);
                setSelectedOuttimeDate(null);
                setoutday('');
                setOutTime('');
                route("/admindashboard")
            }  else if (response.data.status === 401) {
                alert(response.data.message);
                setSelectedOuttimeDate(null);
                setoutday('');
                setOutTime('');
            } else if (response.data.status === 402) {
                alert(response.data.message);
                setSelectedOuttimeDate(null);
                setoutday('');
                setOutTime('');
            }
        } else {
            alert("Please fill all fields");
        }
    };

    return (
        <div>
            <div className='punchtime'>
                <form className='punch-one' onSubmit={handleIntimeSubmit}>
                    <h1 className='complain-one'>In Time</h1>
                    <label>Select a Date</label>
                    <DatePicker
                        selected={selectedIntimeDate}
                        onChange={handleIntimeDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                        includeDates={includedIntimeDates}
                        className='date-css'
                    />
                    <label>Day</label>
                    <input
                        className='complain-input'
                        type="text"
                        placeholder='Day'
                        name='day'
                        value={day}
                        readOnly
                    />
                    <label>Time</label>
                    <input
                        className='complain-input'
                        type="text"
                        placeholder='Enter time'
                        name='time'
                        value={time}
                        onChange={handleTimeChange}
                    />
                    <button className='complain-btn' type="submit">Submit</button>
                </form>

                <form className='punch-one' onSubmit={handleOuttimeSubmit}>
                    <h1 className='complain-one'>Out Time</h1>
                    <label>Select a Date</label>
                    <DatePicker
                        selected={selectedOuttimeDate}
                        onChange={handleOuttimeDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                        includeDates={includedOuttimeDates}
                        className='date-css'
                    />
                    <label>Day</label>
                    <input
                        className='complain-input'
                        type="text"
                        placeholder='Day'
                        name='day'
                        value={outday}
                        readOnly
                    />
                    <label>Time</label>
                    <input
                        className='complain-input'
                        type="text"
                        placeholder='Enter time'
                        value={outTime}
                        onChange={handleOutTimeChange}
                    />
                    <button className='complain-btn' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Editemployeeattendance;
