<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Http\Request;
use MeiliSearch\Endpoints\Indexes;

class SearchBuildingController extends Controller
{
    public function __invoke(Request $request)
    {
        $lat = $request->get('lat');
        $lng = $request->get('lng');
        $distance = $request->get('distance', 50);

        $callback = static function (Indexes $meilisearch, ?string $query, array $options) use ($lng, $lat, $distance) {
            if ($lat !== null && $lng !== null) {
                $options['filter'] = "_geoRadius(${lat},${lng}, ${distance})";
            }
            return $meilisearch->search($query, $options);
        };

        return Building::search($request->get('query'), $callback)
            ->take(100)
            ->get()
            ->load('prefecture');

    }
}
