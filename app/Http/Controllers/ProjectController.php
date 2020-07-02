<?php

namespace App\Http\Controllers;

use App\ProjectModel;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    function getProjectData() {
        $result = ProjectModel::all();
        return $result;
    }

    function onProjectDelete(Request $request) {
        $id = $request->input('id');
        $result = ProjectModel::where('id', $id)->delete();
        if($result == true) {
            return 1;
        } else {
            return 0;
        }
    }

    function onProjectAdd(Request $request) {
        $proName = $request->input('project_name');
        $shortDes = $request->input('short_description');
        $imgOne = $request->input('image_one');
        $imgTwo = $request->input('image_two');
        $livePreview = $request->input('live_preview');
        $proFeatures = $request->input('project_features');

        $result = ProjectModel::insert(['project_name' => $proName, 'short_description' => $shortDes, 'image_one' => $imgOne, 'image_two' => $imgTwo, 'live_preview' => $livePreview, 'project_features' => $proFeatures]);

        if($result == true) {
            return 1;
        } else {
            return 0;
        }
    }
}
