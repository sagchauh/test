import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const EditAttendance = () => {
    const [updateattendace, setupdateattendace] = useState([]);
    console.log(updateattendace, "updateattendace")

    const [editedSubjectStatus, setEditedSubjectStatus] = useState('');
    console.log(editedSubjectStatus, "editedSubjectStatus")

    const [selectedDate, setSelectedDate] = useState('');
    console.log(selectedDate, "selectedDate");

    const route = useNavigate()

    const { id } = useParams();
    console.log(id, "check id heree")

    useEffect(() => {
        async function update() {
            const response = await axios.post("http://localhost:8000/studentdetails", {
                _id: id
            });
            setupdateattendace(response.data);
            if (response.data.studenattendance && response.data.studenattendance.length > 0) {
                setEditedSubjectStatus(response.data.studenattendance[0]?.subjectstatus);
                setSelectedDate(response.data.studenattendance[0]?.date);
            }
        }
        update();
    }, [id]);

    useEffect(() => {
        if (selectedDate) {
            const selecteddateattendance = updateattendace.studenattendance.find(att => att.date === selectedDate)
            if (selecteddateattendance) {
                setEditedSubjectStatus(selecteddateattendance.subjectstatus)
            }
        }
    }, [selectedDate, updateattendace])

    const handleSubjectStatusChange = (e) => {
        setEditedSubjectStatus(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:8000/editattendance", {
            _id: id,
            subjectstatus: editedSubjectStatus,
            date: selectedDate
        });
        console.log(response.data, "response check--")
        if (response.data.status === 200) {
            alert(response.data.message);
            route("/teacherdashboard")
        } else if (response.data.status === 400) {
            alert(response.data.message);
        } else if (response.data.status === 401) {
            alert(response.data.message);
        } else if (response.data.status === 402) {
            alert(response.data.message);
        } else if (response.data.status === 403) {
            alert(response.data.message);
        }
    }

    return (
        <div>


            <form className='complain-form' onSubmit={handleSubmit}>
                <h1 className='complain-one'>Edit Student Attendance</h1>
                <label>Select a Date</label>

                <select className='complain-input' value={selectedDate} onChange={handleDateChange}>
                    {updateattendace.studenattendance ? (
                        updateattendace.studenattendance.map((attendance) => (
                            <option key={attendance._id} value={attendance.date}>
                                {new Date(attendance.date).toLocaleDateString()}
                            </option>
                        ))
                    ) : (
                        <option>No attendance data available</option>
                    )}
                </select>
               
                <label>Take Attendance</label>
                
                <select className='complain-input' onChange={handleSubjectStatusChange} value={editedSubjectStatus}>
                    <option value="present">present</option>
                    <option value="absent">absent</option>
                </select>
               
                <input type="submit" value="Update Attendance" className='complain-btn' />

            </form>

        </div>
    )
}

export default EditAttendance;
