import React from "react";

function Summary({fullName}){
    return(
        <div id="summary-container">

            <div id="summary-box">
            <h3>{fullName}</h3>
            </div>

            <button className="ved-btns">
            <img className="summary-btn" id="view-btn" src="http://localhost/laravel-crud/public/storage/view.png" alt="view"/>
            </button>

            <button className="ved-btns">
            <img className="summary-btn" id="edit-btn" src="http://localhost/laravel-crud/public/storage/edit.png" alt="edit"/>
            </button>

            <button className="ved-btns">
            <img className="summary-btn" id="delete-btn" src="http://localhost/laravel-crud/public/storage/delete.png" alt="delete"/>
            </button>

        </div>
    );
}

export default Summary;