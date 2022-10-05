<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Http\Request;

class SearchBuildingController extends Controller
{
    public function __invoke(Request $request)
    {
        return Building::search($request->get('keyword'))->get();
    }
}
