<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//contact page route
Route::get('/contactData', 'ContactController@getContactData');
Route::post('/contactDelete', 'ContactController@onContactDelete');

//course page route
Route::get('/courseData', 'CourseController@getCourseData');
Route::post('/courseDelete', 'CourseController@onCourseDelete');

//service page route
Route::get('/serviceData', 'ServiceController@getServiceData');
Route::post('/serviceDelete', 'ServiceController@onServiceDelete');

//project page route
Route::get('/projectData', 'ProjectController@getProjectData');
Route::post('/projectDelete', 'ProjectController@onProjectDelete');

//client review page route
Route::get('/clientData', 'ClientReviewController@getClientData');
Route::post('/clientDelete', 'ClientReviewController@onClientReviewDelete');

Route::get('/', function () {
    return view('index');
});

Route::get('{FrontEndRoute}', function () {
    return view('index');
})->where('FrontEndRoute', '.*');
