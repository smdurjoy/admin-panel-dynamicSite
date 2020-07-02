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

    function getCourseEditDetails(Request $request) {
        $id = $request->input('id');
        $result = CourseModel::where('id', $id)->get();
        return $result;
    }

    function onEditCourse(Request $request) {
        $id = $request->input('id');
        $sTitle = $request->input('short_title');
        $sDes = $request->input('short_des');
        $sImg = $request->input('short_img');
        $lTitle = $request->input('long_title');
        $lDes = $request->input('long_des');
        $tLecture = $request->input('total_lecture');
        $tStudent = $request->input('total_students');
        $skill = $request->input('skill_all');
        $videoUrl = $request->input('video_url');
        $cLink = $request->input('course_link');

        $result = CourseModel::where('id', $id)->update(['short_title' => $sTitle, 'short_des' => $sDes, 'short_img' => $sImg, 'long_title' => $lTitle, 'long_des' => $lDes, 'total_lecture' => $tLecture, 'total_students' => $tStudent, 'skill_all' => $skill, 'video_url' => $videoUrl, 'course_link' => $cLink]);

        if($result == true) {
            return 1;
        } else {
            return 0;
        }
    }
}
