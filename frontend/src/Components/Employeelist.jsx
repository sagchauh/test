import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Employeelist = () => {

  const [employeedetail, setemployeedetail] = useState([]);
  console.log(employeedetail, "employeedetail");

  const route = useNavigate()

  useEffect(() => {
    async function showdata() {
      const response = await axios.post("http://localhost:8000/showemployeelist");
      console.log(response.data, "check");
      setemployeedetail(response.data)
    }
    showdata()
  }, [])

  const attendancetrack = (e) => {
    route(`/employeeattendancetrack/${e._id}`)
  }

  const editdata = (e) => {
    route(`/updateemployeedata/${e._id}`)
  }

  const deletedata = async (id) => {

    const response = await axios.post(`http://localhost:8000/deleteemployee`, {
      _id: id
    });
    console.log(response.data, "response check")
    if (response.data.status === 200) {
      alert(response.data.message)
      setemployeedetail(employeedetail.filter(employee => employee._id !== id));
    } else if (response.data.status === 401) {
      alert(response.data.message)
    }
  }


  return (
    <div>

      <h1 className='register-h1'>All Employee List</h1>

      <div className='teacher-eleven'>
        <div className='teacher-twelve'>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>name</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>number</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>Email</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>Edit details</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>deleteUser</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>Attendance track</p>
          </div>
        </div>

        {
          employeedetail && employeedetail.map((e, i) => (
            <div key={i} className='teacher-seventeen'>

              <div className='teacher-eighteen'>
                <div className='teacher-nineteen'>
                  <p>{e.name}</p>
                </div>
                <div className='teacher-nineteen'>
                  <p>{e.number}</p>
                </div>
                <div className='teacher-nineteen'>
                  <p>{e.email}</p>
                </div>
                <div className='teacher-twenty'>
                  <button onClick={() => editdata(e)}>edit</button>
                </div>
                <div className='teacher-twenty'>
                  <button onClick={() => deletedata(e._id)}>delete</button>
                </div>
                <div className='teacher-twenty'>
                  <button onClick={() => attendancetrack(e)}>attendance Track</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Employeelist
