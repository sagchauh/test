import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Updatestudentmark = () => {
    const [showeditdata, setshoweditdata] = useState([]);
    console.log(showeditdata, "showeditdata");

    const [selectedDate, setSelectedDate] = useState("");
    console.log(selectedDate, "selectedDate")

    const [selectedSubject, setSelectedSubject] = useState("");
    console.log(selectedSubject, "selectedSubject")

    const [markobtained, setMarkobtained] = useState("");
    console.log(markobtained, "markobtained");

    const [filteredSubjects, setFilteredSubjects] = useState([]);
    console.log(filteredSubjects, "filteredSubjects");

    const [selectedTestResult, setSelectedTestResult] = useState(null);
    console.log(selectedTestResult, "filteredSubjects");

    const { id } = useParams();
    console.log(id, "id");

    const route = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post("http://localhost:8000/editmarksdata", { _id: id });
            setshoweditdata(response.data.testresult);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (selectedDate) {
            const subjects = showeditdata
                .filter(result => new Date(result.uploadmarks.date).toISOString().split('T')[0] === selectedDate)
                .map(result => result.uploadmarks.createsubject.createsubject);
            setFilteredSubjects([...new Set(subjects)]);
            setSelectedSubject("");
            setSelectedTestResult(null);
            setMarkobtained("");
        } else {
            setFilteredSubjects([]);
            setSelectedSubject("");
            setSelectedTestResult(null);
            setMarkobtained("");
        }
    }, [selectedDate, showeditdata]);

    useEffect(() => {
        if (selectedDate && selectedSubject) {
            const testResult = showeditdata.find(result =>
                new Date(result.uploadmarks.date).toISOString().split('T')[0] === selectedDate &&
                result.uploadmarks.createsubject.createsubject === selectedSubject
            );
            setSelectedTestResult(testResult);
            setMarkobtained(testResult ? testResult.markobtained : "");
        } else {
            setSelectedTestResult(null);
            setMarkobtained("");
        }
    }, [selectedDate, selectedSubject, showeditdata]);

    const finalupdatemark = async (e) => {
        e.preventDefault();

        if (!selectedTestResult) {
            alert("Test result not found for the selected date and subject.");
            return;
        }

        const response = await axios.post("http://localhost:8000/editfinalmarks", {
            _id: id,
            testResultId: selectedTestResult._id,
            markobtained: markobtained
        });
        console.log(response.data, "res check--")
        if (response.data.status === 200) {
            alert(response.data.message);
            route("/teacherdashboard")
        } else if (response.data.status === 400) {
            alert(response.data.message);
        } else if (response.data.status === 401) {
            alert(response.data.message);
        } else if (response.data.status === 402) {
            alert(response.data.message);
        }
    };

    return (
        <div>
            <form className='update-form' onSubmit={finalupdatemark}>
                <h1 className='complain-one'>Update Student Mark</h1>
                <label>Date</label>
                <select className='complain-input' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                    <option value="" disabled>Select Date</option>
                    {[...new Set(showeditdata.map(testResult => new Date(testResult.uploadmarks.date).toISOString().split('T')[0]))].map((date, index) => (
                        <option key={index} value={date}>
                            {new Date(date).toLocaleDateString("en-US")}
                        </option>
                    ))}
                </select>
                <label>Subject</label>
                <select className='complain-input' value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                    <option value="" disabled>Select Subject</option>
                    {filteredSubjects.map((subject, index) => (
                        <option key={index} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>

                <label>Marks Obtained</label>
                <input className='complain-input'
                    type="text"
                    onChange={(e) => setMarkobtained(e.target.value)}
                    value={markobtained}
                    placeholder='Enter your marks'
                />

                <input type="submit" value="Submit" className='complain-btn' />
            </form>
        </div>
    );
};

export default Updatestudentmark;
