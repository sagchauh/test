import React, { useState } from 'react'
import axios from "axios"

const Createtrainingmode = () => {

    const [createtrainingmode, setcreatetrainingmode] = useState({ trainingmode: "" });
    console.log(createtrainingmode, "createtrainingmode");

    const trainingmodehandleclick = async (e) => {
        e.preventDefault();

        if (createtrainingmode.trainingmode) {
            const response = await axios.post("http://localhost:8000/trainingmode", {
                trainingmode: createtrainingmode.trainingmode
            })
            console.log(response.data, "--check");
            if (response.data.status === 200) {
                alert(response.data.message)
            } else if (response.data.status === 400) {
                alert(response.data.message)
            } else if (response.data.status === 401) {
                alert(response.data.message)
            }
        } else {
            alert("please fill all field")
        }
    }

    const trainingmodehandleform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setcreatetrainingmode({ ...createtrainingmode, [name]: value })
    }

    return (
        <div>
            {/* <h1>Createtrainingmode</h1>
            <div className='awdiz-login'>
                <div className='awdiz-login-one'>
                    <form onSubmit={(e) => trainingmodehandleclick(e)}>
                        <div className='awdiz-login-section'>
                            <label>enter training mode</label>
                            <br />
                            <br />
                            <input type="text" onChange={(e) => trainingmodehandleforme()} name="trainingmode" value={createtrainingmode.trainingmode} placeholder='enter your trainingmode' />
                            <input type="submit" value="submit" className='btn' />
                        </div>
                    </form>
                </div>
            </div> */}


            <form onSubmit={(e) => trainingmodehandleclick(e)} className='mul-attendance' id='traning'>
                <h1 className='complain-one'>Createtrainingmode</h1>
                <label>Enter Training Mode</label>
                <input className='complain-input' type="text" onChange={trainingmodehandleform} name="trainingmode" value={createtrainingmode.trainingmode} placeholder='enter your trainingmode' />
               
                <input type="submit" value="Submit" className='complain-btn' />
            </form>
        </div>

    )
}

export default Createtrainingmode
