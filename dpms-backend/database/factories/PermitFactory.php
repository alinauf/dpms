<?php

namespace Database\Factories;

use App\Models\Permit;
use App\Models\PermitApplication;
use App\SL\PermitSL;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PermitFactory extends Factory
{
    public function definition(): array
    {
        $permitApplication = PermitApplication::where('approval_status', true)
            ->inRandomOrder()
            ->first();


        $permitNumber = (new PermitSL)->createUniquePermitNumber($permitApplication->permit_type_id, $permitApplication->id);
        while (Permit::where('permit_number', $permitNumber)->exists()) {
            $permitNumber = (new PermitSL)->createUniquePermitNumber($permitApplication->permit_type_id, $permitApplication->id);
        }

        return [
            'permit_application_id' => $permitApplication->id,
            'permit_type_id' => $permitApplication->permit_type_id,
            'user_id' => $permitApplication->user_id,
            'permit_number' => $permitNumber,
            'valid_from' => $permitApplication->valid_from,
            'valid_until' => $permitApplication->valid_until,
            'is_expired' => false,
        ];
    }

    // State for active permits
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    // State for expired permits
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'expired',
        ]);
    }

    // State for revoked permits
    public function revoked(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'revoked',
        ]);
    }
}