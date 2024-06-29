import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';

const Addcomplain = () => {
    const [complain, setcomplain] = useState({ complain: "" })
    console.log(complain, "complain");

    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate, "selectedDate");

    const currentDate = new Date();

    const route = useNavigate();

    const { id } = useParams();
    console.log(id, "_id heree");

    const handleDateChange = (date) => {
        setSelectedDate(date)
    };

    const noticeclick = async (e) => {
        e.preventDefault();

        if (complain.complain && selectedDate) {
            const response = await axios.post("http://15.207.248.127:8000/addcomplain", {
                complain: complain.complain,
                date: selectedDate,
                _id: id,
            })
            console.log(response.data, "check heree")
            if (response.data.status === 200) {
                alert(response.data.message)
                setcomplain({ complain: "" });
                setSelectedDate(null);
                route("/studentdashboard")
            } else if (response.data.status === 400) {
                alert(response.data.message)
                setcomplain({ complain: "" });
                setSelectedDate(null)
            }
        } else {
            alert("please select all field")
        }

    }

    const noticeform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setcomplain({ ...complain, [name]: value })
    }


    return (
        <div>

            <form onSubmit={(e) => noticeclick(e)} className='mul-attendance'>
                <h1 className='complain-one'>Addcomplain</h1>
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
                <label>Enter the complain</label>
                <input className='complain-input' type="text" onChange={(e) => noticeform(e)} name="complain" value={complain.complain} placeholder='enter your complain' />
                <input type="submit" value="Add complain" className='complain-btn' />
            </form>

            {/* <form className='complain-form' onSubmit={(e) => noticeclick(e)}>
                <h1 className='complain-one'>Addcomplain</h1>
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

                <label>complain</label>

                <input className='complain-input' type="text" onChange={(e) => noticeform(e)} name="complain" value={complain.complain} placeholder='enter your complain' />

                <input type="submit" value="Add complain" className='complain-btn' />
            </form> */}


        </div>
    )
}

export default Addcomplain
