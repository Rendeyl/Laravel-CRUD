import React from "react";

function Modal({ isOpen, onClose, handleFileChange, removePicture, handleSubmit, pfp, fileInputRef }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add Student</h2>

            <div id="modal-box">

                <div id="box1">

                    <img id="pfp-preview"
                    src={pfp ? pfp : "/storage/pfp/pfp.jpg"}
                    alt="pfp-view"/>

                    <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef}/>
                    <button type="button" onClick={removePicture}>Remove Picture</button>

                </div>

                <form onSubmit={handleSubmit} id="student-form">
                    <input type="text" name="fullName" placeholder="Full Name"/>
                    <input type="text" name="courseNsection" placeholder="Course & Section"/>
                    <input type="text" name="studentID" placeholder="Student ID"/>
                    <input type="text" name="gwa" placeholder="GWA"/>
                    <input type="submit" name="Save" id=""/>
                </form>
            
            </div>
            </div>
        </div>
    );
}

export default Modal;
