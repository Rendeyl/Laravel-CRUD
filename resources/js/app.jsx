import React, { use } from "react";
import "../css/app.css";
import ReactDOM from "react-dom/client";
import Summary from "./components/Summary";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Temp from "./components/Temp";
import Edit from "./components/Edit";
import { handleSubmit, handleView, handleEdit, handleEditSubmit, handleDelete } from "./functions/mainFunctions";

function App() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const [summary, setSummary] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    //For Modal
    const [pfp, setPfp] = useState(null);
    const fileInputRef = React.useRef(null);

    //Current ID View
    const [fullName, setFullName] = useState("Full Name");
    const [courseNsection, setCourseNsection] = useState("Course & Section");
    const [StudentID, setStudentID] = useState("Studen ID");
    const [gwa, setGwa] = useState(0.00);
    const [pfpView, setPfpView] = useState(null);

    //Editing Values
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingStudentId, setEditingStudentId] = useState(null);
    const [editFullName, setEditFullName] = useState("");
    const [editCourse, setEditCourse] = useState("");
    const [editStudentID, setEditStudentID] = useState("");
    const [editGwa, setEditGwa] = useState(0.0);
    const [editPfp, setEditPfp] = useState(null);

    useEffect(() => {
        fetch("/students")
        .then(res => res.json())
        .then(data => setSummary(data))
        .catch(err => console.log(err))
    }, [])

    //For previewing selected pfp
    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPfp(URL.createObjectURL(file));
    };

    //For removing selected pfp
    function removePicture(){
      setPfp(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    };

    return( 
    <>
    <div id="panel">
        <button id="create-btn" onClick={() => setIsOpen(true)}>Add Student</button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}
        handleFileChange={handleFileChange}
        removePicture={removePicture}
        handleSubmit={handleSubmit}
        pfp={pfp}
        fileInputRef={fileInputRef}
        />

        <Edit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        handleFileChange={handleFileChange}
        removePicture={() => setEditPfp(null)}
        handleSubmit={(e) => handleEditSubmit(
        e,
        csrfToken,
        editingStudentId,
        fileInputRef,
        editFullName,
        editCourse,
        editStudentID,
        editGwa,
        setSummary,
        setIsEditOpen,
        setEditPfp
        )}
        pfp={editPfp}
        fileInputRef={fileInputRef}
        fullName={editFullName}
        setFullName={setEditFullName}
        course={editCourse}
        setCourse={setEditCourse}
        studentID={editStudentID}
        setStudentID={setEditStudentID}
        gwa={editGwa}
        setGwa={setEditGwa}
      />
        <div id="studen-panel">
        {summary.map(content =>(
           <Summary
          id={content.id}
          fullName={content.fullName}
          onDelete={(id) => handleDelete(id, csrfToken, setSummary)}
          onView={(id) => handleView(id, csrfToken, setFullName, setCourseNsection, setStudentID, setGwa, setPfpView)}
          onEdit={(id) => handleEdit(id, summary, setEditingStudentId, setEditFullName, setEditCourse, setEditStudentID, setEditGwa, setEditPfp, setIsEditOpen)}
          />
        ))}
        </div>
    </div>
    <div id="student-id">
        <Temp
        fullName={fullName}
        courseNsection={courseNsection}
        studentID={StudentID}
        gwa={gwa}
        image={pfpView}
        />
    </div>
    </>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);