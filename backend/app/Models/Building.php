<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Building extends Model
{
    use HasFactory;

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

    public function prefecture(): BelongsTo
    {
        return $this->belongsTo(Prefecture::class);
    }
}
