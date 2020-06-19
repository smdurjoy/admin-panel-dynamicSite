<?php

namespace App\Http\Controllers;

use App\ClientReviewModel;
use App\ContactModel;
use App\CourseModel;
use App\ProjectModel;
use App\ServiceModel;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    function countSummary() {
        $course = CourseModel::count();
        $clientReview = ClientReviewModel::count();
        $project = ProjectModel::count();
        $service = ServiceModel::count();
        $contact = ContactModel::count();

        $totalCount = array('course' => $course, 'clientReview' => $clientReview, 'project' => $project, 'service' => $service, 'contact' => $contact);
        return $totalCount;
    }
}
