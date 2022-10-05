<?php

namespace App\Providers;

use App\Models\Building;
use Illuminate\Support\ServiceProvider;
use MeiliSearch\Client;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $client = new Client(
            url: config('scout.meilisearch.host'),
            apiKey: config('scout.meilisearch.key')
        );

        $client->index('buildings')->updateFilterableAttributes([
            '_geo'
        ]);
    }
}
