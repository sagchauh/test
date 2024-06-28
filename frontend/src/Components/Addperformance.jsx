import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Addperformance = () => {

    const [selectperformance, setselectperformance] = useState("");
    console.log(selectperformance, "selectperformance");

    const [selectedDate, setSelectedDate] = useState(null);

    const [subject, setSubject] = useState('');
    console.log(subject, "subject");

    const route = useNavigate()

    const currentDate = new Date();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const { id } = useParams();
    console.log(id, "id heree");

    const handleperformance = (e) => {
        setselectperformance(e.target.value)
    }

    const checkperformance = async (e) => {
        e.preventDefault();

        if (selectperformance) {
            const response = await axios.post("http://localhost:8000/markperformance", {
                _id: id,
                performancestatus: selectperformance,
                date: selectedDate,
                subject: subject
            })
            console.log(response.data, "response heree");
            if (response.data.status === 200) {
                alert(response.data.message);
                setselectperformance("");
                setSelectedDate(null);
                setSubject('')
                route("/teacherdashboard")
            } else if (response.data.status === 400) {
                alert(response.data.message);
                setselectperformance("");
                setSelectedDate(null);
                setSubject('')
            } else if (response.data.status === 401) {
                alert(response.data.message);
                setselectperformance("");
                setSelectedDate(null);
                setSubject('')
            } else if (response.data.status === 402) {
                alert(response.data.message);
                setselectperformance("");
                setSelectedDate(null);
                setSubject('')
            }
        } else {
            alert("please fill all field")
        }
    }

    return (
        <div>

            <div className='performance-dash'>
                <h1 className='complain-one'>Addperformance</h1>
                <label>Select a Date</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    minDate={new Date()}
                    maxDate={currentDate}
                />


                <label>Subject</label>
                <input className='complain-input'
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject"
                />

              
                <label>write performance</label>
               
                <select className='complain-input' value={selectperformance} onChange={handleperformance}>
                    <option value="">select your performance</option>
                    <option value="good">good</option>
                    <option value="average">average</option>
                    <option value="bad">bad</option>
                    <option value="absent">absent</option>
                </select>
               
                <button className='complain-btn' onClick={(e) => checkperformance(e)}>review performance</button>
            </div>
        </div>
    )
}

export default Addperformance
