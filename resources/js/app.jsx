import React from "react";
import "../css/app.css";
import ReactDOM from "react-dom/client";
import Temp from "./components/Temp";
import { useEffect, useState } from "react";

function App() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("http://localhost/laravel-crud/public/students")
        .then(res => res.json())
        .then(data => setStudents(data))
        .catch(err => console.log(err))
    }, []);

    return( 
    <>
        {students.map(student => (
            <Temp
            key={student.id}
            fullName={student.fullName}
            courseNsection={student.courseNsection}
            studentID={student.studentID}
            />
        ))}
    </>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
