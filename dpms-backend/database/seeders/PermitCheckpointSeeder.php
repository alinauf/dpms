<?php

namespace Database\Seeders;

use App\Models\Checkpoint;
use App\Models\PermitType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermitCheckpointSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get permit types
        $restrictedPermit = PermitType::where('name', 'Restricted')->first()->id;
        $temporaryPermit = PermitType::where('name', 'Temporary')->first()->id;
        $permanentPermit = PermitType::where('name', 'Permanent')->first()->id;

        $checkpoints = [
            [
                'name' => 'Main Terminal Entry',
                'code' => 'MTE-001',
                'description' => 'Main entrance checkpoint for terminal access',
                'required_permit_id' => $temporaryPermit,
                'is_active' => true,
            ],
            [
                'name' => 'Runway Access Point',
                'code' => 'RAP-001',
                'description' => 'Restricted area checkpoint for runway access',
                'required_permit_id' => $restrictedPermit,
                'is_active' => true,
            ],
            [
                'name' => 'Staff Entry Gate',
                'code' => 'SEG-001',
                'description' => 'Staff entrance checkpoint',
                'required_permit_id' => $permanentPermit,
                'is_active' => true,
            ],
        ];

        foreach ($checkpoints as $checkpoint) {
            Checkpoint::create($checkpoint);
        }
    }
}
