import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Addstudentattendance = () => {
  const [selectattendance, setselectattendance] = useState("")
  console.log(selectattendance, "selectattendance");

  const route = useNavigate()

  const currentDate = new Date();

  const { id } = useParams()
  console.log(id, "id heree");

  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate, "selectedDate")

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const attendanceclick = async (e) => {
    e.preventDefault();

    if (selectattendance && selectedDate) {
      const response = await axios.post("http://localhost:8000/attendace", {
        _id: id,
        date: selectedDate,
        subjectstatus: selectattendance
      })
      console.log(response.data, "check hereee")
      if (response.data.status === 200) {
        alert(response.data.message)
        setselectattendance("")
        setSelectedDate(null);
        route("/teacherdashboard")
      } else if (response.data.status === 400) {
        alert(response.data.message)
        setselectattendance("")
        setSelectedDate(null)
      } else if (response.data.status === 401) {
        alert(response.data.message)
        setselectattendance("")
        setSelectedDate(null)
      } else if (response.data.status === 402) {
        alert(response.data.message)
        setselectattendance("")
        setSelectedDate(null)
      }
    } else {
      alert("please select all field")
    }
  }

  const selectattendanceinfo = (e) => {
    setselectattendance(e.target.value)
  }

  return (
    <div>


      <form className='complain-form' onSubmit={(e) => attendanceclick(e)}>

        <h1 className='complain-one'>Add Attendance</h1>
        <label>Select a Date</label>

        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          minDate={new Date()}
          maxDate={currentDate} className='date-css'
        />

        <label>select your attendace</label>
        <select className='complain-input' onChange={selectattendanceinfo} value={selectattendance}>
          <option>select your attendace</option>
          <option value="present">present</option>
        </select>
        <br />
        <br />
        <input type="submit" value="add attendace" className='complain-btn' />

      </form>

    </div>
  )
}

export default Addstudentattendance
