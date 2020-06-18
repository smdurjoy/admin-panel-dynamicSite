<?php

namespace App\Http\Controllers;

use App\ContactModel;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    function getContactData() {
        $result = ContactModel::all();
        return $result;
    }

    function onContactDelete(Request $request) {
        $id = $request->input('id');
        $result = ContactModel::where('id', $id)->delete();
        if($result == true) {
            return 'Contact Delete Successfully';
        } else {
            return 'Delete Failed';
        }
    }
}
