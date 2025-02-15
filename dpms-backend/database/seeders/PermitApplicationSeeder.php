<?php

namespace Database\Seeders;

use App\Models\Permit;
use App\Models\PermitApplication;
use Illuminate\Database\Seeder;

class PermitApplicationSeeder extends Seeder
{
    public function run(): void
    {
        // Create 50 pending applications
        PermitApplication::factory()
            ->count(50)
            ->pending()
            ->create();

        // Create 30 rejected applications
        PermitApplication::factory()
            ->count(30)
            ->rejected()
            ->create();

        // Create 100 approved applications and their permits
        PermitApplication::factory()
            ->count(100)
            ->approved()
            ->create()
            ->each(function ($application) {
                Permit::factory()->create([
                    'permit_application_id' => $application->id
                ]);
            });
    }
}