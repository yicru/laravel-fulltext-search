<?php

namespace Database\Factories;

use App\Models\Building;
use App\Models\Prefecture;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class BuildingFactory extends Factory
{
    protected $model = Building::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'postal_code' => $this->faker->postcode,
            'city' => $this->faker->city,
            'block' => $this->faker->streetAddress,
            'building' => $this->faker->secondaryAddress,
            'latitude' => $this->faker->latitude(20.25319768, 45.557228),
            'longitude' => $this->faker->longitude(122.9325, 153.986667),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'prefecture_id' => Prefecture::inRandomOrder()->first(),
        ];
    }
}
