import React from "react";

function Temp({fullName, courseNsection, studentID}){
    return(
        <>

        <div className="student-card">

            <img id="student-image" src="http://localhost/laravel-crud/public/storage/pfp/pfp.jpg" alt="default"/>
            <h2 id="student-name">{fullName}</h2>
            <h3 id="student-course">{courseNsection}</h3>
            <h4 id="student-id">{studentID}</h4>

        </div>

        </>
    );
}

export default Temp;