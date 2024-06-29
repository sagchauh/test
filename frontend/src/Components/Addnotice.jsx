import axios from 'axios';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Addnotice = () => {

    const [notice, setnotice] = useState({ title: "" })
    console.log(notice, "notice");

    const currentDate = new Date();

    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate, "selectedDate");

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const noticeclick = async (e) => {
        e.preventDefault();

        if (notice.title && selectedDate) {
            const response = await axios.post("http://15.207.248.127:8000/addnotice", {
                title: notice.title,
                date: selectedDate,
            })
            console.log(response.data, "check heree")
            if (response.data.status === 200) {
                alert(response.data.message)
                setnotice({ title: "" });
                setSelectedDate(null)
            } else if (response.data.status === 400) {
                alert(response.data.message)
                setnotice({ title: "" });
                setSelectedDate(null)
            }
        } else {
            alert("please select all field")
        }

    }

    const noticeform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setnotice({ ...notice, [name]: value })
    }


    return (
        <div>
            <form onSubmit={(e) => noticeclick(e)} className='mul-attendance'>
                <h1 className='complain-one'>Addnotice</h1>
                <label>Select a Date</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    maxDate={currentDate}
                    minDate={new Date()}
                    className='date-css'
                />
                <label>Enter the Title</label>
                <input className='complain-input' type="text" onChange={(e) => noticeform(e)} name="title" value={notice.title} placeholder='enter your title' />
                <input type="submit" value="Add notice" className='complain-btn' />
            </form>
        </div>
    )
}

export default Addnotice
