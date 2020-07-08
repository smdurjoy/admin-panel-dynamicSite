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

    function onClientReviewAdd(Request $request) {
        $clientName = $request->input('client_name');
        $clientComment = $request->input('client_comment');
        $clientImg = $request->input('client_image');

        $result = ClientReviewModel::insert(['client_name' => $clientName, 'client_comment' => $clientComment, 'client_image' => $clientImg]);

        if($result == true) {
            return 1;
        } else {
            return 0;
        }
    }

    function getClientReviewEditDetails(Request $request) {
        $id = $request->input('id');
        $result = ClientReviewModel::where('id', $id)->get();
        return $result;
    }

    function onClientReviewEdit(Request $request) {
        $id = $request->input('id');
        $clientName = $request->input('client_name');
        $clientComment = $request->input('client_comment');
        $clientImg = $request->input('client_image');

        ClientReviewModel::where('id', $id)->update(['client_name' => $clientName, 'client_comment' => $clientComment, 'client_image' => $clientImg]);

    }
}
