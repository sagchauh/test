import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addbatch } from '../redux/batchrelated/batchslice';
// import { adddropdownbatch } from '../redux/batchrelated/batchdropdownslice';



const Batch = () => {
  const [batch, setbatch] = useState({ batch: "", maxStudents: "" });
  console.log(batch, "batch");

  const [showdropdown, setshowdropdown] = useState([]);
  console.log(showdropdown, "showdropdown");

  const [selectcourse, setselectcourse] = useState('');
  console.log(selectcourse, "selectcourse");

  const route = useNavigate()

  const batchhandleclick = async (e) => {
    e.preventDefault();
    if (batch.batch && batch.maxStudents && selectcourse) {
      const response = await axios.post("http://localhost:8000/batchdata", {
        batch: batch.batch,
        course: selectcourse,
        maxStudents: batch.maxStudents
      })
      console.log(response, "-check here");
      if (response.data.status === 200) {
        alert(response.data.message);
        console.log(response, "-check here");
        // dispatch(addbatch(response.data.bathchdata,));
        setbatch({ batch: "", maxStudents: "" });
        setselectcourse('');
        route("/studentregister");
      } else if (response.data.status === 201) {
        alert(response.data.message);
        setbatch({ batch: "", maxStudents: "" });
        setselectcourse('');
      } else if (response.data.status === 202) {
        alert(response.data.message);
        setselectcourse('');
        setbatch({ batch: "", maxStudents: "" });
      } else if (response.data.status === 400) {
        alert(response.data.message);
        setselectcourse('');
        setbatch({ batch: "", maxStudents: "" });
      }
    } else {
      alert("please fill all field")
    }
  }

  const coursehandleform = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setbatch({ ...batch, [name]: value })
  }

  const selectcourseinfo = (e) => {
    setselectcourse(e.target.value)
  }


  useEffect(() => {
    async function showdropdown() {
      const response = await axios.post("http://localhost:8000/getallcourse")
      console.log(response.data, "-check");
      setshowdropdown(response.data)
    }
    showdropdown()
  }, [])


  return (
    <div>


      <form onSubmit={(e) => batchhandleclick(e)} className='mul-attendance'>
        <h1 className='complain-one'>Batch</h1>
        <label>selet your course</label>
        <select onChange={selectcourseinfo} value={selectcourse} className='register-input'>
          <option>selet your course</option>
          {showdropdown && showdropdown.map((e, i) => (
            <option key={i} value={e.course}>{e.course}</option>
          ))}
        </select>

        <label>Enter the Batch Name</label>
        <input className='complain-input' type="text" onChange={(e) => coursehandleform(e)} name="batch" value={batch.batch} placeholder='Enter the Batch Name' /> 
        <label>Enter the Batch Strength</label>
        <input className='complain-input' type="text" onChange={(e) => coursehandleform(e)} name='maxStudents' value={batch.maxStudents} placeholder='Enter the Batch Strength' />
        <input type="submit" value="submit" className='complain-btn' />
      </form>

    </div>
  )
}

export default Batch
