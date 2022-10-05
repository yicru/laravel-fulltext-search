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
            'name' => $this->faker->name,
            'postal_code' => $this->faker->postcode,
            'city' => $this->faker->city,
            'block' => $this->faker->streetAddress,
            'building' => $this->faker->secondaryAddress,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'prefecture_id' => Prefecture::inRandomOrder()->first(),
        ];
    }
}
