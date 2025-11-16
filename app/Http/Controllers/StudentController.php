<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
   public function addStudent(Request $request)
{
    // Validate only required fields
    $incomingFields = $request->validate([
        'fullName' => 'required',
        'courseNsection' => 'required',
        'studentID' => 'required|unique:students,studentID',
        'gwa' => 'required',
    ]);

    if ($request->hasFile('pfp')) {
        $file = $request->file('pfp');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('public/pfp', $filename);
        $incomingFields['pfp'] = 'storage/pfp/' . $filename;
    }

    $student = Student::create($incomingFields);

    return response()->json([
        'success' => true,
        'student' => $student
    ]);
}

    public function deleteStudent($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Not Found'
            ], 404);
        }

        $student->delete();

        return response()->json(['success' => true]);
    }

    public function show($id)
{
    // Find the student by ID
    $student = Student::find($id);

    if (!$student) return response()->json(['message' => 'Student not found'], 404);

    return response()->json($student);
}

}
