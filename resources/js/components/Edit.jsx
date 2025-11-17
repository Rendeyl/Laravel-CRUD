import React from "react";

function Edit({
  isOpen,
  onClose,
  handleFileChange,
  removePicture,
  handleSubmit,
  pfp,
  fileInputRef,
  fullName,
  setFullName,
  course,
  setCourse,
  studentID,
  setStudentID,
  gwa,
  setGwa
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Student</h2>

        <div id="modal-box">
          <div id="box1">
            <img
              id="pfp-preview"
              src={pfp ? pfp : "/storage/pfp/pfp.jpg"}
              alt="pfp-view"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <button type="button" onClick={removePicture}>
              Remove Picture
            </button>
          </div>

          <form onSubmit={handleSubmit} id="student-form">
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              type="text"
              name="courseNsection"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Course & Section"
            />
            <input
              type="text"
              name="studentID"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              placeholder="Student ID"
            />
            <input
              type="text"
              name="gwa"
              value={gwa}
              onChange={(e) => setGwa(e.target.value)}
              placeholder="GWA"
            />
            <input type="submit" value="Save Changes" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
