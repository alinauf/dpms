<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permit extends Model
{
    /*
     $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('permit_number')->unique();
            $table->foreignId('permit_type_id')->constrained();
            $table->timestamp('valid_from');
            $table->timestamp('valid_until');
            $table->foreignId('permit_application_id')->constrained();
            $table->boolean('is_expired')->default(false);
            $table->timestamps();

            $table->index(['user_id', 'is_expired']);
            $table->index('valid_until');
            $table->index('permit_number');
    */

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
