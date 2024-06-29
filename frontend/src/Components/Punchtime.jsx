import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';

const Punchtime = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    console.log(selectedDate, "selectedDate");

    const [currentTime, setCurrentTime] = useState("");
    console.log(currentTime, "currentTime");

    const [day, setDay] = useState("");
    console.log(day, "day");

    const { id } = useParams();
    console.log(id, "id");

    useEffect(() => {
        if (selectedDate) {
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayOfWeek = daysOfWeek[selectedDate.getDay()];
            setDay(dayOfWeek);
        }
    }, [selectedDate]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            setCurrentTime(formattedTime);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (selectedDate && currentTime) {
            const formattedDate = selectedDate.toISOString().split('T')[0]; 
            const response = await axios.post("http://15.207.248.127:8000/intime", {
                _id: id,
                date: formattedDate,
                day: day,
                time: currentTime,
            });
            console.log(response.data, "response check");
            if (response.data.status === 200) {
                alert(response.data.message);
                setSelectedDate(new Date());
            } else if (response.data.status === 401) {
                alert(response.data.message);
                setSelectedDate(new Date());
            } else if (response.data.status === 402) {
                alert(response.data.message);
                setSelectedDate(new Date());
            }
        } else {
            alert("Please select all fields");
        }
    };
    
    const handleouttime = async (e) => {
        e.preventDefault();
    
        if (selectedDate && currentTime) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const response = await axios.post("http://15.207.248.127:8000/outtime", {
                _id: id,
                date: formattedDate,
                day: day,
                time: currentTime,
            });
            console.log(response.data, "response check");
            if (response.data.status === 200) {
                alert(response.data.message);
                setSelectedDate(new Date());
            } else if (response.data.status === 401) {
                alert(response.data.message);
                setSelectedDate(new Date());
            } else if (response.data.status === 402) {
                alert(response.data.message);
                setSelectedDate(new Date());
            }
        } else {
            alert("Please select all fields");
        }
    };
    

    return (
        <div>
            <div className='punchtime'>
                <form className='punch-one' onSubmit={handleSubmit}>
                    <h1 className='complain-one'>In Time</h1>
                    <label>Select a Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                        minDate={new Date()}
                        maxDate={new Date()}
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
                        value={currentTime}
                        readOnly
                    />
                    <button className='complain-btn' type="submit">Submit</button>
                </form>

                <form className='punch-one' onSubmit={handleouttime}>
                    <h1 className='complain-one'>Out Time</h1>
                    <label>Select a Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                        minDate={new Date()}
                        maxDate={new Date()}
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
                        value={currentTime}
                        readOnly
                    />
                    <button className='complain-btn' type="submit">Submit</button>
                </form>
            </div>

        </div>
    );
};

export default Punchtime;
