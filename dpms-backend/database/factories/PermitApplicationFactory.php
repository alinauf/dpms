<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\PermitType;
use Illuminate\Database\Eloquent\Factories\Factory;

class PermitApplicationFactory extends Factory
{
    public function definition(): array
    {
        $validFrom = fake()->dateTimeBetween('now', '+1 month');
        $validUntil = fake()->dateTimeBetween($validFrom, '+6 months');

        // get a user with staff role, Spatie Laravel Permission doesn't have a role column
        $user = User::whereHas('roles', function ($query) {
            $query->where('name', 'staff');
        })->inRandomOrder()->first();


 
        return [
            'user_id' => $user->id,
            'permit_type_id' => PermitType::inRandomOrder()->first()->id,
            'valid_from' => $validFrom,
            'valid_until' => $validUntil,
            'approval_status' => fake()->randomElement([true, false, null]),
            'approval_comment' => function (array $attributes) {
                return match ($attributes['approval_status']) {
                    true => fake()->randomElement([
                        'Approved based on department head recommendation',
                        'Access granted as per request',
                        'Approved for specified duration'
                    ]),
                    false => fake()->randomElement([
                        'Insufficient justification provided',
                        'Request needs more details',
                        'Department head approval required'
                    ]),
                    null => null,
                };
            },
            'justification' => fake()->randomElement([
                'Need access for routine maintenance work in restricted areas',
                'Required for daily operational tasks in secure zones',
                'Access needed for equipment installation and monitoring',
                'Regular inspection duties in controlled areas',
                'Security system maintenance and updates'
            ]),
        ];
    }

    // State for pending applications
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'approval_status' => null,
            'approval_comment' => null,
        ]);
    }

    // State for approved applications
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'approval_status' => true,
            'approval_comment' => fake()->randomElement([
                'Approved based on department head recommendation',
                'Access granted as per request',
                'Approved for specified duration'
            ]),
        ]);
    }

    // State for rejected applications
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'approval_status' => false,
            'approval_comment' => fake()->randomElement([
                'Insufficient justification provided',
                'Request needs more details',
                'Department head approval required'
            ]),
        ]);
    }
}