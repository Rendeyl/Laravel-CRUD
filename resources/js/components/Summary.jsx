import React from "react";

function Summary({id, fullName, onDelete, onView, onEdit}){
    return(
        <div id="summary-container">

            <div id="summary-box">
            <h3>{fullName}</h3>
            </div>

            <button className="ved-btns">
            <img className="summary-btn" id="view-btn" src="http://localhost/laravel-crud/public/storage/view.png" alt="view"
            onClick={() => onView(id)}/>
            </button>

            <button className="ved-btns">
            <img className="summary-btn" id="edit-btn" src="http://localhost/laravel-crud/public/storage/edit.png" alt="edit"
            onClick={() => onEdit(id)}/>
            </button>

            <button className="ved-btns">
            <img className="summary-btn" id="delete-btn" src="http://localhost/laravel-crud/public/storage/delete.png" alt="delete"
            onClick={() => onDelete(id)}/>
            </button>

        </div>
    );
}

export default Summary;