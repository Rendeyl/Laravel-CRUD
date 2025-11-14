import React from "react";

function Summary({fullName}){
    return(
        <div id="summary-container">

            <div id="summary-box">
            <h3>{fullName}</h3>
            </div>

            <button>View</button>
            <button>Edit</button>
            <button>Delete</button>

        </div>
    );
}

export default Summary;