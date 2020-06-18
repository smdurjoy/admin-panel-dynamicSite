<?php

namespace App\Http\Controllers;

use App\CourseModel;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    function getCourseData() {
        $result = CourseModel::all();
        return $result;
    }

    function onCourseDelete(Request $request) {
        $id = $request->input('id');
        $result = CourseModel::where('id', $id)->delete();
        if($result == true) {
            return 1;
        } else {
            return 0;
        }
    }
}
