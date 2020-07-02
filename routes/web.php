<?php

use Illuminate\Support\Facades\Route;

// Home data manage
Route::get('/countSummary', 'HomeController@countSummary');

// Contact data manage
Route::get('/contactData', 'ContactController@getContactData');
Route::post('/contactDelete', 'ContactController@onContactDelete');

// Course data manage
Route::get('/courseData', 'CourseController@getCourseData');
Route::post('/courseDelete', 'CourseController@onCourseDelete');
Route::post('/editCourse', 'CourseController@onEditCourse');
Route::post('/courseEditDetails', 'CourseController@getCourseEditDetails');

// Service data manage
Route::get('/serviceData', 'ServiceController@getServiceData');
Route::post('/serviceDelete', 'ServiceController@onServiceDelete');

// Project data manage
Route::get('/projectData', 'ProjectController@getProjectData');
Route::post('/projectDelete', 'ProjectController@onProjectDelete');

// Client review data manage
Route::get('/clientData', 'ClientReviewController@getClientData');
Route::post('/clientDelete', 'ClientReviewController@onClientReviewDelete');

Route::get('/', function () {
    return view('index');
});

Route::get('{FrontEndRoute}', function () {
    return view('index');
})->where('FrontEndRoute', '.*');
