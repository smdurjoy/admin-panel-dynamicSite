<?php

namespace App\Http\Controllers;

use App\ClientReviewModel;
use Illuminate\Http\Request;

class ClientReviewController extends Controller
{
    function getClientData() {
        $result = ClientReviewModel::all();
        return $result;
    }

    function onClientReviewDelete(Request $request) {
        $id = $request->input('id');
        $result = ClientReviewModel::where('id', $id)->delete();
        if($result == true) {
            return 1;
        } else {
            return 0;
        }
    }
}
