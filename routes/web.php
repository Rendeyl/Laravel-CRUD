<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Student;

Route::get('/', function () {
    return view('index');
});

Route::get('/students', function () {
    return response()->json(Student::all())
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        ->header('Access-Control-Allow-Headers', '*');
});

Route::delete('/students/{id}', [StudentController::class, 'deleteStudent']);

Route::post('/add-student', [StudentController::class, 'addStudent']);

?>