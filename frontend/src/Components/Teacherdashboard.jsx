import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



const Teacherdashboard = () => {
  const [originalStudentData, setOriginalStudentData] = useState([]);
  console.log(originalStudentData, "originalStudentData");

  const [teacherRespectiveData, setTeacherRespectiveData] = useState([]);
  console.log(teacherRespectiveData, "teacherRespectiveData");

  const studentdata = useSelector((state) => state.auth.withoutpass)
  console.log(studentdata, "studentdata");

  const [search, setSearch] = useState('');
  console.log(search, "search");

  const [courses, setCourses] = useState([]);
  console.log(courses, "courses");

  const [batches, setBatches] = useState([]);
  console.log(batches, "batches");

  const [selectedCourse, setSelectedCourse] = useState('');
  console.log(selectedCourse, "selectedCourse");

  const [selectedBatch, setSelectedBatch] = useState('');
  console.log(selectedBatch, "selectedBatch");

  const [shownotice, setshownotice] = useState([]);
  console.log(shownotice, "shownotice");

  const [selectedMonth, setSelectedMonth] = useState(null);
  console.log(selectedMonth, "selectedMonth");

  const teacherData = useSelector((state) => state.auth.withoutpass);

  const route = useNavigate();

  useEffect(() => {
    async function notice() {
      const response = await axios.post("http://localhost:8000/shownotice");
      setshownotice(response.data);
    }
    notice();
  }, []);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      const response = await axios.post("http://localhost:8000/teacherstudentdata", {
        _id: teacherData._id,
      });
      const data = response.data || [];
      setOriginalStudentData(data);
      setTeacherRespectiveData(data);

      // Filter courses to remove duplicates
      const uniqueCourses = Array.from(new Set(data.map(item => item.course._id)))
        .map(id => data.find(item => item.course._id === id).course);

      setCourses(uniqueCourses);

      const batchSet = new Set(data.map(item => item.batch.batch));
      setBatches([...batchSet]);
    };

    fetchTeacherInfo();
  }, [teacherData._id]);

  useEffect(() => {
    let filteredData = originalStudentData.filter(student => {
      const matchesMonth = !selectedMonth || new Date(student.date).getMonth() === selectedMonth.getMonth();
      const matchesSearch = !search || student.name.toLowerCase().includes(search.toLowerCase());
      const matchesCourse = !selectedCourse || student.course._id === selectedCourse;
      const matchesBatch = !selectedBatch || student.batch.batch === selectedBatch;
      return matchesMonth && matchesSearch && matchesCourse && matchesBatch;
    });

    setTeacherRespectiveData(filteredData);
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

  const singlestudentdata = (student) => {
    route(`/allstudentdata/${student._id}`);
  };

  const singlestudent = (student) => {
    route(`/showstudentmarks/${student._id}`);
  };

  const takeattendace = (student) => {
    route(`/addstudentattendance/${student._id}`);
  };

  // const createsub = () => {
  //   if (selectedCourse && selectedBatch && selectedMonth) {
  //     const formattedDate = format(selectedMonth, 'yyyy-MM-dd');
  //     route(`/createsubject?course=${selectedCourse}&batch=${selectedBatch}&month=${formattedDate}`);
  //   } else {
  //     alert("Please select both the course, batch, and month before creating a subject.");
  //   }
  // };

  const createsub = () => {
    if (selectedCourse && selectedBatch && selectedMonth) {
      const filteredStudentIds = teacherRespectiveData
        .filter(student => student.course._id === selectedCourse && student.batch.batch === selectedBatch)
        .map(student => student._id);
      route(`/createsubject?studentIds=${JSON.stringify(filteredStudentIds)}`);
    } else {
      alert("Please select both the course, batch, and month before creating a subject.");
    }
  };

  const multipleattendance = () => {
    if (selectedCourse && selectedBatch) {
      const filteredStudentIds = teacherRespectiveData
        .filter(student => student.course._id === selectedCourse && student.batch.batch === selectedBatch)
        .map(student => student._id);
      route(`/multipleattendance?studentIds=${JSON.stringify(filteredStudentIds)}`);
    } else {
      alert("Please select both the course and the batch before proceeding.");
    }
  };

  const multipleperformance = () => {
    if (selectedCourse && selectedBatch && selectedMonth) {
      const filteredStudentIds = teacherRespectiveData
        .filter(student => student.course._id === selectedCourse && student.batch.batch === selectedBatch)
        .map(student => student._id);
      route(`/multiplereview?studentIds=${JSON.stringify(filteredStudentIds)}`);
    } else {
      alert("Please select both the course and the batch before proceeding.");
    }
  };

  const addperformance = (student) => {
    route(`/addperformance/${student._id}`);
  };

  const attendacetrack = (student) => {
    route(`/attendancetrack/${student._id}`);
  };

  const reviewperformance = (student) => {
    route(`/reviewperformance/${student._id}`);
  };

  const hasWindowsOrCCNA = teacherRespectiveData.some(e => e.course.course === "windows" || e.course.course === "ccna");

  return (
    <div>

      <h1 className='teacher-main'>Notice Dashboard</h1>

      <div className='teacher-one'>
        <div className='teacher-two'>
          <div className='teacher-three'>
            <h1 style={{ margin: "0px" }}>date</h1>
          </div>
          <div className='teacher-four'>
            <h1 style={{ margin: "0px", }}>title</h1>
          </div>
        </div>

        {shownotice.map(e => (
          <div key={e._id} className='teacher-five'>
            <div className='teacher-six'>
              <p>{new Date(e.date).toLocaleDateString()}</p>
            </div>
            <div className='teacher-seven'>
              <p>{e.title}</p>
            </div>
          </div>
        ))}
      </div>

      <h1 className='teach-h1'>Teacher Dashboard</h1>

      <div className='teacher-twentyone'>
        <button className='teacher-eight' onClick={createsub}>create subject</button>
        <button onClick={multipleattendance} className='teacher-eight'>Multiple Attendance</button>
        {hasWindowsOrCCNA && (
          <button onClick={multipleperformance} className='teacher-nine'>
            Multiple performance
          </button>
        )}
      </div>


      <div className='teacher-filter'>
        <div className='teacher-filter-one'>
          <label id='date-hide'>Select a Month</label>
          <DatePicker
            selected={selectedMonth}
            onChange={handleMonthChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            placeholderText="Select a month"
            className='teacher-date'
          />
        </div>

        <select value={selectedCourse} onChange={handleCourseSelect} className='teacher-ten'>
          <option value="">Select your course</option>
          {courses.map((course, index) => (
            <option key={index} value={course._id}>{course.course}</option>
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



      <div className='teacher-eleven'>
        <div className='teacher-twelve'>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>name</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>course</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>batch</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>button1</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>button2</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>teacher name</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>Take attendance</p>
          </div>
          <div className='teacher-thirteen'>
            <p className='teacher-fifteen'>track attendace</p>
          </div>
          {studentdata.course && studentdata.course.course === "windows" && (
            <div className='teacher-thirteen'>
              <p className='teacher-fifteen'>add performance review</p>
            </div>
          )}
          {studentdata.course && studentdata.course.course === "windows" && (
            <div className='teacher-sixteen'>
              <p className='teacher-fifteen'>review performance</p>
            </div>
          )}
        </div>

        {
          teacherRespectiveData && teacherRespectiveData.map((student, i) => (
            <div key={i} className='teacher-seventeen'>
              {student ? (
                <div className='teacher-eighteen'>
                  <div className='teacher-nineteen'>
                    <p>{student.name}</p>
                  </div>
                  <div className='teacher-nineteen'>
                    <p>{student.course.course}</p>
                  </div>
                  <div className='teacher-nineteen'>
                    <p>{student.batch.batch}</p>
                  </div>
                  <div className='teacher-twenty'>
                    <button onClick={() => singlestudentdata(student)}>add marks</button>
                  </div>
                  <div className='teacher-twenty'>
                    <button onClick={() => singlestudent(student)}>see marks</button>
                  </div>
                  <div className='teacher-nineteen'>
                    <p>{student.assignedteacher ? student.assignedteacher.name : 'Not Assigned'}</p>
                  </div>
                  <div className='teacher-twenty'>
                    <button onClick={() => takeattendace(student)}>take attendace</button>
                  </div>
                  <div className='teacher-twenty'>
                    <button onClick={() => attendacetrack(student)}>attendace track</button>
                  </div>

                  {studentdata.course && studentdata.course.course === "windows" && (
                    <div className='teacher-twenty'>
                      <button onClick={() => addperformance(student)}>add viva performance</button>
                    </div>
                  )}
                  {studentdata.course && studentdata.course.course === "windows" && (
                    <div className='teacher-twenty'>
                      <button onClick={() => reviewperformance(student)}>review performance</button>
                    </div>
                  )}
                </div>
              ) : <p>
                No data available
              </p>}
            </div>
          ))
        }
      </div>
    </div >
  )
}

export default Teacherdashboard;
