<?php

namespace Database\Seeders;

use App\Models\PermitType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermitTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'Restricted',
                'rank' => 1,
                'requires_approval' => true,
                'description' => 'Limited access permit for specific restricted areas'
            ],
            [
                'name' => 'Temporary',
                'rank' => 2,
                'requires_approval' => true,
                'description' => 'Time-limited access permit'
            ],
            [
                'name' => 'Permanent',
                'rank' => 3,
                'requires_approval' => true,
                'description' => 'Full access permanent permit'
            ],
        ];

        foreach ($types as $type) {
            PermitType::create($type);
        }
    }
}
