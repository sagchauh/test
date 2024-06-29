import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Allstudentdata = () => {
  const [originalStudentData, setOriginalStudentData] = useState([]);
  console.log(originalStudentData, "originalStudentData")

  const [allstudent, setallstudent] = useState([]);
  console.log(allstudent, "allstudent")

  const [search, setSearch] = useState('');
  console.log(search, "search")

  const [courses, setCourses] = useState([]);
  console.log(courses, "courses")

  const [batches, setBatches] = useState([]);
  console.log(batches, "batches")

  const [selectedCourse, setSelectedCourse] = useState('');
  console.log(selectedCourse, "selectedCourse")

  const [selectedBatch, setSelectedBatch] = useState('');
  console.log(selectedBatch, "selectedBatch");

  const [selectedMonth, setSelectedMonth] = useState(null);
  console.log(selectedMonth, "selectedMonth");;

  const navigate = useNavigate();

  useEffect(() => {
    const showAllStudent = async () => {
      const response = await axios.post("http://15.207.248.127:8000/getallstudentdata");
      setallstudent(response.data);
      setOriginalStudentData(response.data);

      const courseSet = new Set(response.data.map(item => item.course && item.course.course));
      setCourses([...courseSet]);

      const batchSet = new Set(response.data.map(item => item.batch && item.batch.batch));
      setBatches([...batchSet]);
    };
    showAllStudent();
  }, []);

  useEffect(() => {
    const filteredData = originalStudentData.filter(student => {
      const matchesMonth = !selectedMonth || new Date(student.date).getMonth() === selectedMonth.getMonth();
      const matchesSearch = !search || student.name.toLowerCase().includes(search.toLowerCase());
      const matchesCourse = !selectedCourse || (student.course && student.course.course === selectedCourse);
      const matchesBatch = !selectedBatch || (student.batch && student.batch.batch === selectedBatch);
      return matchesMonth && matchesSearch && matchesCourse && matchesBatch;
    });

    setallstudent(filteredData);
  }, [search, selectedCourse, selectedBatch, selectedMonth, originalStudentData]);

  const handleCourseSelect = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedBatch('');
  };

  const handleBatchSelect = (e) => {
    setSelectedBatch(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const handleNavigation = (path, e) => {
    navigate(path + `/${e._id}`);
  };

  const handleCreateSubject = () => {
    if (selectedCourse && selectedBatch && selectedMonth) {
      const filteredStudentIds = allstudent
        .filter(student => student.course && student.course.course === selectedCourse && student.batch && student.batch.batch === selectedBatch)
        .map(student => student._id);
      navigate(`/createsubject?studentIds=${JSON.stringify(filteredStudentIds)}`);
    } else {
      alert("Please select the course, batch, and month before creating a subject.");
    }
  };

  const handleMultipleAttendance = () => {
    if (selectedCourse && selectedBatch) {
      const filteredStudentIds = allstudent
        .filter(student => student.course && student.course.course === selectedCourse && student.batch && student.batch.batch === selectedBatch)
        .map(student => student._id);
      navigate(`/multipleattendance?studentIds=${JSON.stringify(filteredStudentIds)}`);
    } else {
      alert("Please select both the course and the batch before proceeding.");
    }
  };

  const handleMultiplePerformance = () => {
    if (selectedCourse && selectedBatch && selectedMonth) {
      const filteredStudentIds = allstudent
        .filter(student => student.course && student.course.course === selectedCourse && student.batch && student.batch.batch === selectedBatch)
        .map(student => student._id);
      navigate(`/multiplereview?studentIds=${JSON.stringify(filteredStudentIds)}`);
    } else {
      alert("Please select both the course and the batch before proceeding.");
    }
  };

  const hasWindowsOrCCNA = allstudent.some(e => e.course && (e.course.course === "windows" || e.course.course === "ccna"));

  return (
    <div>
      <h1 className='register-h1'>All Student Data</h1>

      <div className='teacher-twentyone'>
        <button className='teacher-eight' onClick={handleCreateSubject}>create subject</button>
        <button onClick={handleMultipleAttendance} className='teacher-eight'>Multiple Attendance</button>
        {hasWindowsOrCCNA && (
          <button onClick={handleMultiplePerformance} className='teacher-nine'>
            Multiple performance
          </button>
        )}
      </div>

      {/* <div style={{ textAlign: "right", marginTop: "30px" }}>
        <button onClick={handleCreateSubject} style={{ fontSize: "20px", marginRight: "30px" }}>Create Subject</button>
        <button onClick={handleMultipleAttendance} style={{ fontSize: "20px", marginRight: "30px" }}>Multiple Attendance</button>
        {hasWindowsOrCCNA && (
          <button onClick={handleMultiplePerformance} style={{ fontSize: "20px" }}>
            Multiple Performance
          </button>
        )}
      </div> */}

      <div className='teacher-filter'>
        <div className='all-four'>
          <label id='date-hide' className='all-month'>Select a Month</label>
          <DatePicker
            selected={selectedMonth}
            onChange={handleMonthChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            placeholderText="Select a month"
            className='all-date'
          />
        </div>

        <select value={selectedCourse} onChange={handleCourseSelect} className='teacher-ten'>
          <option value="">Select your course</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>

        <select value={selectedBatch} onChange={handleBatchSelect} className='teacher-ten'>
          <option value="">Select your batch</option>
          {batches.map((batch, index) => (
            <option key={index} value={batch}>{batch}</option>
          ))}
        </select>

        <input
          type="text"
          className='teacher-input'
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by name..."
        />
      </div>

      {/* <DatePicker
        selected={selectedMonth}
        onChange={handleMonthChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText="Select a month"
        style={{ margin: "10px" }}
      />

      <select value={selectedCourse} onChange={handleCourseSelect} style={{ margin: "10px" }}>
        <option value="">Select your course</option>
        {courses.map((course, index) => (
          <option key={index} value={course}>{course}</option>
        ))}
      </select>

      <select value={selectedBatch} onChange={handleBatchSelect} style={{ margin: "10px" }}>
        <option value="">Select your batch</option>
        {batches.map((batch, index) => (
          <option key={index} value={batch}>{batch}</option>
        ))}
      </select>

      <input
        type="text"
        style={{ width: "20%", margin: "10px" }}
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by name..."
      /> */}

      <div className='all-one'>
        <div className='all-two'>
          <div className='all-data'>
            <p className='teacher-fifteen'>name</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>Course</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>Batch</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>Teacher Name</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>Add Marks</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>See Marks</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>Assigned Teacher</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>Edit</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>Take Attendance</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>Track Attendance</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>Add Performance Review</p>
          </div>
          <div className='all-data'>
            <p className='teacher-fifteen'>Review Performance</p>
          </div>
        </div>

        {allstudent.map((e, i) => (
          <div key={i} className='all-three'>
            <div className='teacher-eighteen'>
              <div className='all-data'><p>{e.name}</p></div>
              <div className='all-data'><p>{e.course && e.course.course}</p></div>
              <div className='all-data'><p>{e.batch && e.batch.batch}</p></div>
              <div className='all-data'><p>{e.assignedteacher ? e.assignedteacher.name : 'Not Assigned'}</p></div>
              <div className='all-data'>
                <button onClick={() => handleNavigation('/allstudentdata', e)}>Add Marks</button>
              </div>
              <div className='all-data'>
                <button onClick={() => handleNavigation('/showstudentmarks', e)}>See Marks</button>
              </div>
              <div className='all-data'>
                <button onClick={() => handleNavigation('/assignedteacher', e)}>Assigned Teacher</button>
              </div>
              <div className='all-data'>
                <button onClick={() => handleNavigation('/updatestudentdata', e)}>Edit</button>
              </div>
              <div className='all-data'>
                <button onClick={() => handleNavigation('/addstudentattendance', e)}>Take Attendance</button>
              </div>
              <div className='all-data'>
                <button onClick={() => handleNavigation('/attendancetrack', e)}>Track Attendance</button>
              </div>
              <div className='all-data'>
                {e.course && (e.course.course === "windows" || e.course.course === "ccna") ? (
                  <button onClick={() => handleNavigation('/addperformance', e)}>Add Viva Performance</button>
                ) : (
                  <p>No viva for this course</p>
                )}
              </div>
              <div className='all-data'>
                {e.course && (e.course.course === "windows" || e.course.course === "ccna") ? (
                  <button onClick={() => handleNavigation('/reviewperformance', e)}>Review Performance</button>
                ) : (
                  <p>No viva for this course</p>
                )}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* <div style={{ border: "1px solid black", width: "100%", height: "100px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Name</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Course</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Batch</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Teacher Name</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Add Marks</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>See Marks</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Assigned Teacher</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Edit</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Take Attendance</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Track Attendance</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Add Performance Review</h3></div>
        <div style={{ border: "1px solid black", width: "20%", height: "100%" }}><h3>Review Performance</h3></div>
      </div> */}


    </div>
  );
};

export default Allstudentdata;
