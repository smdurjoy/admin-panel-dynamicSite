<?php

use Illuminate\Support\Facades\Route;

// Admin Login
Route::get('/login', 'AdminLoginController@loginPage');
Route::get('/onLogin/{userName}/{password}', 'AdminLoginController@onLogin');

Route::group(['middleware' => ['loginCheck']], function () {
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
    Route::post('/addCourse', 'CourseController@onCourseAdd');

    // Service data manage
    Route::get('/serviceData', 'ServiceController@getServiceData');
    Route::post('/serviceDelete', 'ServiceController@onServiceDelete');
    Route::post('/addService', 'ServiceController@onServiceAdd');
    Route::post('/serviceEditDetails', 'ServiceController@getServiceEditDetails');
    Route::post('/editService', 'ServiceController@onServiceEdit');

    // Project data manage
    Route::get('/projectData', 'ProjectController@getProjectData');
    Route::post('/projectDelete', 'ProjectController@onProjectDelete');
    Route::post('/addProject', 'ProjectController@onProjectAdd');
    Route::post('/projectEditDetails', 'ProjectController@getProjectEditDetails');
    Route::post('/editProject', 'ProjectController@onProjectEdit');

    // Client review data manage
    Route::get('/clientData', 'ClientReviewController@getClientData');
    Route::post('/clientDelete', 'ClientReviewController@onClientReviewDelete');
    Route::post('/addClientReview', 'ClientReviewController@onClientReviewAdd');
    Route::post('/clientReviewEditDetails', 'ClientReviewController@getClientReviewEditDetails');
    Route::post('/editClientReview', 'ClientReviewController@onClientReviewEdit');

    Route::get('/', function () {
        return view('index');
    });

    // Logout route
    Route::get('/logout', 'AdminLoginController@onLogout');

    // React frontend routes
    Route::get('{FrontEndRoute}', function () {
        return view('index');
    })->where('FrontEndRoute', '.*');
});