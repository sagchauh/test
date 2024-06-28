import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

const Updateadmindata = () => {

    const [singleadmin, setsingleadmin] = useState({ name: "", email: "" });
    console.log(singleadmin, "singleadmin");

    const [image, setImage] = useState(null);
    console.log(image, "image")

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const { id } = useParams();
    console.log(id, "id here");

    useEffect(() => {
        async function showdata() {
            const response = await axios.post("http://localhost:8000/showsingleadmindata", {
                _id: id
            })
            console.log(response.data, "check---")
            setsingleadmin(response.data)
        }
        showdata()
    }, [id])


    const updateadminclick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_id", id);
        formData.append("name", singleadmin.name);
        formData.append("email", singleadmin.email);
        if (image) {
            formData.append("image", image);
        }
        const response = await axios.post("http://localhost:8000/updateadmindata", formData)
        console.log(response.data);
        setsingleadmin(response.data)
        if (response.data.status === 200) {
            alert(response.data.message);
        } else if (response.data.status === 400) {
            alert(response.data.message);
        }

    }

    const updateadminform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setsingleadmin({ ...singleadmin, [name]: value })
    }



    return (
        <div>
            <h1 className='register-h1'>Updateadmindata</h1>
            <form  className='register-one'>
                <p className='register-two'>Personal Information</p>
                <div className='register-three'>
                    <div className='register-four'>
                        <label>name</label>
                        <input className='register-input' type="text" onChange={(e) => updateadminform(e)} name="name" value={singleadmin.name} placeholder='enter your name' />
                    </div>
                    <div className='register-four'>
                        <label>email</label>
                        <input className='register-input' type="text" onChange={(e) => updateadminform(e)} name="email" value={singleadmin.email} placeholder='enter your email' />
                    </div>
                    <div className='register-four'>
                        <label>Profile Image</label>
                        <input className='register-profile' type="file" onChange={handleImageChange} />
                    </div>
                </div>
            </form>
            <input onClick={(e) => updateadminclick(e)} type="submit" value="update" className='register-btn' />

        </div>
    )
}

export default Updateadmindata
