import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Alladminlist = () => {

    const [alladmindata, setalladmindata] = useState([]);
    console.log(alladmindata, "alladmindata");

    const route = useNavigate()

    useEffect(() => {

        async function alldata() {
            const response = await axios.post("http://15.207.248.127:8000/adminlist");
            console.log(response.data, "response");
            setalladmindata(response.data)
        }
        alldata()

    }, [])

    const editadmindata = (e) => {
        route(`/alladminlist/${e._id}`)
    }

    const deleteadmindata = async (id) => {
    
        const response = await axios.post("http://15.207.248.127:8000/deleteadmin", {
            _id: id
        })
        console.log(response.data, "reponse");
        if (response.data.status === 200) {
            alert(response.data.message);
            setalladmindata(alladmindata.filter(employee => employee._id !== id));
        } else if (response.data.status === 401) {
            alert(response.data.message)
        } else if (response.data.status === 400) {
            alert(response.data.message)
        }
    }



    return (
        <div>
            <div className='teacher-eleven'>
                <h1 className='adminname'>All Admin List</h1>
                <div className='teacher-twelve'>
                    <div className='admin-list'>
                        <p className='teacher-fifteen'>name</p>
                    </div>
                    <div className='admin-list'>
                        <p className='teacher-fifteen'>Email</p>
                    </div>
                    <div className='admin-list'>
                        <p className='teacher-fifteen'>edit data</p>
                    </div>
                    <div className='admin-list'>
                        <p className='teacher-fifteen'>Delete Admin</p>
                    </div>
                </div>

                {alladmindata && alladmindata.map((e, i) => (
                    <div key={i} className='teacher-seventeen'>
                        <div className='teacher-eighteen'>
                            <div className='admin-list'>
                                <p>{e.name}</p>
                            </div>
                            <div className='admin-list'>
                                <p>{e.email}</p>
                            </div>
                            <div className='admin-list'>
                                <button onClick={() => editadmindata(e)}>Edit</button>
                            </div>
                            <div className='admin-list'>
                                <button onClick={() => deleteadmindata(e._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Alladminlist
