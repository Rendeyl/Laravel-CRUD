import React from "react";
import "../css/app.css";
import ReactDOM from "react-dom/client";
import Temp from "./components/Temp";
import Summary from "./components/Summary";
import { useEffect, useState } from "react";

function App() {
    const [summary, setSummary] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("http://localhost/laravel-crud/public/students")
        .then(res => res.json())
        .then(data => setSummary(data))
        .catch(err => console.log(err))
    }, [])

    /*
    useEffect(() => {
        fetch("http://localhost/laravel-crud/public/students")
        .then(res => res.json())
        .then(data => setStudents(data))
        .catch(err => console.log(err))
    }, []);
    */

    return( 
    <>

    <div id="panel">

        <button id="create-btn">Add Student</button>

        <div id="studen-panel">

        {summary.map(content =>(
            <Summary
            fullName={content.fullName}
            />
        ))};

        </div>

    </div>

    <div>temp</div>

    {/*
        {students.map(student => (
            <Temp
            key={student.id}
            fullName={student.fullName}
            courseNsection={student.courseNsection}
            studentID={student.studentID}
            />
        ))}
    */}
    </>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
