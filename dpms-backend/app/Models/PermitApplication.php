<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class PermitApplication extends Model
{
    use HasFactory;
    protected $fillable = [
        'permit_type_id',
        'valid_from',
        'valid_until',
        'justification',
        'user_id',
        'approval_status'
    ];

    public function permitType()
    {
        return $this->belongsTo(PermitType::class);
    }

    public function getPermitTypeNameAttribute()
    {
        return $this->permitType->name;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopePending($query)
    {
        return $query->where('approval_status', null);
    }

    public function scopeApproved($query)
    {
        return $query->where('approval_status', true);
    }

    public function scopeRejected($query)
    {
        return $query->where('approval_status', false);
    }
    
    
}
