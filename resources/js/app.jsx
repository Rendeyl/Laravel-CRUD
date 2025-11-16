import React, { use } from "react";
import "../css/app.css";
import ReactDOM from "react-dom/client";
import Summary from "./components/Summary";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";

function App() {

  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    const [summary, setSummary] = useState([]);
    const [students, setStudents] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    //For Modal
    const [pfp, setPfp] = useState(null);
    const fileInputRef = React.useRef(null);

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

  //For adding new student
  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("_token", csrfToken);
  formData.append("fullName", e.target.fullName.value);
  formData.append("courseNsection", e.target.courseNsection.value);
  formData.append("studentID", e.target.studentID.value);
  formData.append("gwa", e.target.gwa.value);

  if (fileInputRef.current && fileInputRef.current.files[0]) formData.append("pfp", fileInputRef.current.files[0]);

  //console.log([...formData]);

  fetch("/add-student", {
    method: "POST",
    body: formData,
    credentials: "same-origin"
  })
  .then(async res => {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }
    return res.json();
  })
    .then(data => {
    console.log(data);
    setIsOpen(false);
    setSummary(prev => [...prev, data.student]);
    setPfp(null);
  })
  .catch(err => console.error(err));
};

  //Delete Student Data
  const handleDelete = (id) => {
    fetch(`/students/${id}`, {
        method: "DELETE",
        headers: {
            "X-CSRF-TOKEN": csrfToken
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) setSummary(prev => prev.filter(student => student.id !== id));
    })
    .catch(err => console.error(err));
};


    return( 
    <>

    <div id="panel">

        <button id="create-btn" onClick={() => setIsOpen(true)}>Add Student</button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        
            <h2>Add Student</h2>

            <div id="modal-box">

                <div id="box1">

                    <img id="pfp-preview" 
                    src={pfp ? pfp : 
                    "/storage/pfp/pfp.jpg"} alt="pfp-view"/>

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

        </Modal>

        <div id="studen-panel">

        {summary.map(content =>(
            <Summary
            id={content.id}
            fullName={content.fullName}
            onDelete={handleDelete}
            />
        ))}

        </div>

    </div>

    <div>temp</div>
    </>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
