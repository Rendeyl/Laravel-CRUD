// CREATE
export const handleSubmit = async (e, csrfToken, fileInputRef, setSummary, setIsOpen, setPfp) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_token", csrfToken);
    formData.append("fullName", e.target.fullName.value);
    formData.append("courseNsection", e.target.courseNsection.value);
    formData.append("studentID", e.target.studentID.value);
    formData.append("gwa", e.target.gwa.value);

    if (fileInputRef.current && fileInputRef.current.files[0]) formData.append("pfp", fileInputRef.current.files[0])

    try {
        const res = await fetch("/add-student", {
            method: "POST",
            body: formData,
            credentials: "same-origin"
        });

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        setSummary(prev => [...prev, data.student]);
        setIsOpen(false);
        setPfp(null);

    } catch (err) {
        console.error(err);
    }
};

// READ / VIEW
export const handleView = async (id, csrfToken, setFullName, setCourseNsection, setStudentID, setGwa, setPfpView) => {
    try {
        const res = await fetch(`/student-view/${id}`, {
            method: "GET",
            headers: { "X-CSRF-TOKEN": csrfToken }
        });

        if (!res.ok) throw new Error("Failed to fetch student data");

        const data = await res.json();
        setFullName(data.fullName);
        setCourseNsection(data.courseNsection);
        setStudentID(data.studentID);
        setGwa(data.gwa);
        setPfpView(data.pfp ? data.pfp : null);

    } catch (err) {
        console.error(err);
    }
};

// UPDATE (OPEN EDIT MODAL)
export const handleEdit = (id, summary, setEditingStudentId, setEditFullName, setEditCourse, setEditStudentID, setEditGwa, setEditPfp, setIsEditOpen) => {
    const student = summary.find(s => s.id === id);
    if (!student) return;

    setEditingStudentId(id);
    setEditFullName(student.fullName);
    setEditCourse(student.courseNsection);
    setEditStudentID(student.studentID);
    setEditGwa(student.gwa);
    setEditPfp(student.pfp ? student.pfp : null);
    setIsEditOpen(true);
};

// UPDATE SUBMIT
export const handleEditSubmit = async (e, csrfToken, editingStudentId, fileInputRef, editFullName, editCourse, editStudentID, editGwa, setSummary, setIsEditOpen, setEditPfp) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_token", csrfToken);
    formData.append("_method", "PUT"); // Laravel expects PUT
    formData.append("fullName", editFullName);
    formData.append("courseNsection", editCourse);
    formData.append("studentID", editStudentID);
    formData.append("gwa", editGwa);

    if (fileInputRef.current && fileInputRef.current.files[0])
        formData.append("pfp", fileInputRef.current.files[0]);

    try {
        const res = await fetch(`/students/${editingStudentId}`, {
            method: "POST", // Use POST with _method=PUT for Laravel
            body: formData,
            credentials: "same-origin"
        });

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        setSummary(prev => prev.map(s => s.id === editingStudentId ? data.student : s));
        setIsEditOpen(false);
        setEditPfp(null);

    } catch (err) {
        console.error(err);
    }
};

// DELETE
export const handleDelete = async (id, csrfToken, setSummary) => {
    try {
        const res = await fetch(`/students/${id}`, {
            method: "DELETE",
            headers: { "X-CSRF-TOKEN": csrfToken }
        });

        const data = await res.json();
        if (data.success) {
            setSummary(prev => prev.filter(student => student.id !== id));
        }

    } catch (err) {
        console.error(err);
    }
};
