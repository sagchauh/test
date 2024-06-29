import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const Assignedteacher = () => {

    const [assignedteacher, setassignedteacher] = useState({ name: "" });
    console.log(assignedteacher, "assignedteacher")

    const { id } = useParams();
    console.log(id, "heree");

    const assignedteacherform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setassignedteacher({ ...assignedteacher, [name]: value });
    }

    const assignedteacherclick = async (e) => {
        e.preventDefault()

        if (assignedteacher.name) {
            const response = await axios.post("http://15.207.248.127:8000/assignedteacher", {
                _id: id,
                name: assignedteacher.name,
            })
            console.log(response.data, "response heree");
            if (response.data.status === 200) {
                alert(response.data.message);
                setassignedteacher({ name: "" });
            } else if (response.data.status === 400) {
                alert(response.data.message);
                setassignedteacher({ name: "" });
            } else if (response.data.status === 401) {
                alert(response.data.message);
                setassignedteacher({ name: "" });
            } else if (response.data.status === 402) {
                alert(response.data.message);
                setassignedteacher({ name: "" });
            }
        } else {
            alert("please select all field")
        }
    }
    return (
        <div>
            <h1>Assignedteacher</h1>
            <form onSubmit={(e) => assignedteacherclick(e)}>
                <div className='awdiz-login-section' style={{ height: "1000px" }}>

                    <label>Assigned Teacher</label>
                    <input type="text" onChange={(e) => assignedteacherform(e)} name="name" value={assignedteacher.name} placeholder='Assigned Teacher' />
                    <br />
                    <br />
                    <input type="submit" value="add marks" className='btn' />
                </div>
            </form>


        </div>
    )
}

export default Assignedteacher
