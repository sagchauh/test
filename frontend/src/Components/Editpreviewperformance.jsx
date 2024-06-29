import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Editpreviewperformance = () => {

    const [performancedata, setperformancedata] = useState([]);
    console.log(performancedata, "performancedata");

    const [selectedDate, setSelectedDate] = useState();
    console.log(selectedDate, "selectedDate");

    const [editstatus, seteditstatus] = useState('');
    console.log(editstatus, "editstatus")

    const { id } = useParams();
    console.log(id, "id heree");

    useEffect(() => {
        async function review() {
            const response = await axios.post("http://15.207.248.127:8000/studentdetails", {
                _id: id,
            })
            console.log(response.data, "response heree");
            setperformancedata(response.data);
            if (response.data.performance && response.data.performance.length > 0) {
                setSelectedDate(response.data.performance[0]?.date);
                seteditstatus(response.data.performance[0]?.performancestatus);
            }
        }
        review()
    }, [id])

    useEffect(() => {
        if (selectedDate) {
            const selectedPerformance = performancedata.performance.find(perf => perf.date === selectedDate);
            if (selectedPerformance) {
                seteditstatus(selectedPerformance.performancestatus);
            }
        }
    }, [selectedDate, performancedata]);

    const handledate = (e) => {
        setSelectedDate(e.target.value)
    }

    const handleperformance = (e) => {
        seteditstatus(e.target.value)
    }

    const editperformance = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://15.207.248.127:8000/editperformance", {
            _id: id,
            date: selectedDate,
            performancestatus: editstatus,
        })
        console.log(response.data, "response");
        if (response.data.status === 200) {
            alert(response.data.message);
            setSelectedDate('')
        } else if (response.data.status === 401) {
            alert(response.data.message);
            setSelectedDate('')
        } else if (response.data.status === 402) {
            alert(response.data.message);
            setSelectedDate('')
        }
    }

    return (
        <div>


            <form className='complain-form'>
                <h1 className='complain-one'>Editpreviewperformance</h1>
                <label>Select Your Date</label>
                <select className='complain-input' value={selectedDate} onChange={handledate}>
                    {/* <option value="">Select your date</option> */}
                    {performancedata.performance ? (performancedata.performance.map((e, i) => (
                        <option key={e._id} value={e.date}>
                            {new Date(e.date).toLocaleDateString()}
                        </option>
                    ))) :
                        (
                            <option>No attendance data available</option>
                        )}
                </select>
                <label>Select performance</label>
                <select className='complain-input' value={editstatus} onChange={handleperformance}>
                    <option value="">select your performance</option>
                    <option value="good">good</option>
                    <option value="average">average</option>
                    <option value="bad">bad</option>
                    <option value="absent">absent</option>
                </select>
                
                <button className='complain-btn' onClick={(e) => editperformance(e)}>save update</button>

            </form>

        </div>
    )
}

export default Editpreviewperformance
