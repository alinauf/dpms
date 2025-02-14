<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        //
    ];

    public function boot(): void
    {
        Passport::tokensCan([
            'admin' => 'Admin user access',
            'staff' => 'Staff user access',
            'security' => 'Security officer access',
        ]);

        Passport::setDefaultScope([
            'staff'  // Default scope
        ]);
    }
}