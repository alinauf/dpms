<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Permit extends Model
{
    use HasFactory; 

    protected $fillable = [
        'user_id',
        'permit_number',
        'permit_type_id',
        'valid_from',
        'valid_until',
        'permit_application_id',
        'is_expired',
    ];

    public function permitType()
    {
        return $this->belongsTo(PermitType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function permitApplication() 
    {
        return $this->belongsTo(PermitApplication::class);
    }


    public function getPermitTypeNameAttribute()
    {
        return $this->permitType->name;
    }

    public function getPermitNumberAttribute()
    {
        return $this->permitType->name . '-' . $this->id;
    }

    public function getPermitValidFromAttribute()
    {
        return $this->permitApplication->valid_from;
    }
    
    

    
    
    
}
