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

    function onServiceAdd(Request $request) {
        $serviceName = $request->input('service_name');
        $serviceDes = $request->input('service_description');
        $serviceImg = $request->input('service_image');

        $result = ServiceModel::insert(['service_name' => $serviceName, 'service_description' => $serviceDes, 'service_image' => $serviceImg]);

        if($result == true) {
            return 1;
        } else {
            return 0;
        }
    }

    function getServiceEditDetails(Request $request) {
        $id = $request->input('id');
        $result = ServiceModel::where('id', $id)->get();
        return $result;
    }

    function onServiceEdit(Request $request) {
        $id = $request->input('id');
        $serviceName = $request->input('service_name');
        $serviceDes = $request->input('service_description');
        $serviceImg = $request->input('service_image');

        ServiceModel::where('id', $id)->update(['service_name' => $serviceName, 'service_description' => $serviceDes, 'service_image' => $serviceImg]);

    }
}
