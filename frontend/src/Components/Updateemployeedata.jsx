import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Updateemployeedata = () => {

    const [updateemployee, setupdateemployee] = useState({});
    console.log(updateemployee, "updateemployee");

    const { id } = useParams();
    console.log(id, "id heree");

    useEffect(() => {
        async function showdata() {
            const response = await axios.post("http://localhost:8000/showsingleemployee", {
                _id: id
            })
            console.log(response.data, "response")
            setupdateemployee(response.data)
        }
        showdata()
    }, [id]);

    const updateemployeeform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setupdateemployee({ ...updateemployee, [name]: value })
    };

    const updateemployeeclick = async (e) => {
        e.preventDefault();

        const response = await axios.post("http://localhost:8000/updateemployee", {
            _id: id,
            name: updateemployee.name,
            email: updateemployee.email,
            number: updateemployee.number
        })
        console.log(response.data, "response check--");
        if (response.data.status === 200) {
            alert(response.data.message)
        } else if (response.data.status === 401) {
            alert(response.data.message)
        }

    }


    return (
        <div>
            <h1 className='register-h1'>Update Employee Data</h1>
            <form className='register-one'>
                <p className='register-two'>Personal Information</p>
                <div className='register-three'>
                    <div className='register-four'>
                        <label>Name</label>
                        <input className='register-input' type="text" onChange={(e) => updateemployeeform(e)} name="name" value={updateemployee.name} placeholder='Enter your name' />
                    </div>
                    <div className='register-four'>
                        <label>Number</label>
                        <input className='register-input' type="text" onChange={(e) => updateemployeeform(e)} name="number" value={updateemployee.number} placeholder='Enter your number' />
                    </div>
                    <div className='register-four'>
                        <label>Email</label>
                        <input className='register-input' type="text" onChange={(e) => updateemployeeform(e)} name="email" value={updateemployee.email} placeholder='Enter your email' />
                    </div>
                </div>
            </form>
            <input type="submit" value="Update" onClick={(e) => updateemployeeclick(e)} className='register-btn' />
        </div>
    )
}

export default Updateemployeedata
