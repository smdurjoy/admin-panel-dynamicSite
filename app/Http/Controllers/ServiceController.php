<?php

namespace App\Http\Controllers;

use App\ServiceModel;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    function getServiceData() {
        $result = ServiceModel::all();
        return $result;
    }

    function onServiceDelete(Request $request) {
        $id = $request->input('id');
        $result = ServiceModel::where('id', $id)->delete();
        if($result == true) {
            return 1;
        } else {
            return 0;
        }
    }
}
