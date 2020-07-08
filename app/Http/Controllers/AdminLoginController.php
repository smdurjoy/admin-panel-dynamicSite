<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AdminLoginModel;

class AdminLoginController extends Controller
{
    function loginPage() {
        return view('login');
    }

    function onLogin(Request $request) {
        $userName = $request->userName;
        $password = $request->password;

        $count = AdminLoginModel::where('user_name', $userName)->where('password', $password)->count();

        if($count == 1) {
            $request->session()->put('userName', $userName);
            return "1";
        } else {
            return "0";
        }
    }
}
