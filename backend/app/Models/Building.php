<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

class Building extends Model
{
    use HasFactory;
    use Searchable;

    protected $fillable = [
        'prefecture_id',
        'name',
        'postal_code',
        'city',
        'block',
        'building',
        'latitude',
        'longitude',
    ];

    public function getAddressAttribute(): string
    {
        return $this->postal_code.' '.$this->prefecture->name.' '.$this->city.' '.$this->block.' '.$this->building;
    }

    public function prefecture(): BelongsTo
    {
        return $this->belongsTo(Prefecture::class);
    }

    public function toSearchableArray(): array
    {
        $array = $this->toArray();

        $array['prefecture'] = $this->prefecture->name;

        $array['_geo'] = [
            'lat' => $this->latitude,
            'lng' => $this->longitude,
        ];

        return $array;
    }
}
