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
}
