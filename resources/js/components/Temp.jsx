import React from "react";
import { useState } from "react";

function Temp({fullName, courseNsection, studentID, gwa, image}){

    const defaultPfp = "/storage/pfp/pfp.jpg";

    return(
        <>

        <div className="student-card">

            <img id="student-image" src={image ? image : defaultPfp} alt="default"/>
            <h2 id="student-name">{fullName}</h2>
            <h3 id="student-course">{courseNsection}</h3>
            <h4 id="student-school-id">{studentID}</h4>
            <h3>GWA: {gwa}</h3>

        </div>

        </>
    );
}

export default Temp;