<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        // Permit Management
        Permission::create(['name' => 'create permits']);
        Permission::create(['name' => 'update permits']);
        Permission::create(['name' => 'delete permits']);
        Permission::create(['name' => 'view permits']);

        // Permit Applications
        Permission::create(['name' => 'approve permit applications']);
        Permission::create(['name' => 'reject permit applications']);
        Permission::create(['name' => 'create permit applications']);
        Permission::create(['name' => 'view permit applications']);

        // Reports
        Permission::create(['name' => 'view reports']);
        Permission::create(['name' => 'export reports']);

        // Notifications
        Permission::create(['name' => 'receive permit notifications']);

        // QR Code Verification
        Permission::create(['name' => 'scan permit qr']);
        Permission::create(['name' => 'verify permits']);

        // Create Roles and Assign Permissions
        
        // 1. Admin Role
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo([
            'create permits',
            'update permits',
            'delete permits',
            'view permits',
            'approve permit applications',
            'reject permit applications',
            'view permit applications',
            'view reports',
            'export reports',
            'receive permit notifications'
        ]);

        // 2. Security Role
        $securityRole = Role::create(['name' => 'security']);
        $securityRole->givePermissionTo([
            'scan permit qr',
            'verify permits',
            'view permits'
        ]);

        // 3. Staff Role
        $staffRole = Role::create(['name' => 'staff']);
        $staffRole->givePermissionTo([
            'create permit applications',
            'view permit applications',
            'view permits'
        ]);

        //  Super Admin Role
        $superAdminRole = Role::create(['name' => 'super-admin']);
        // Super admin gets all permissions via Gate::before rule

        $admin = User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@macl.aero',
            'employee_id' => 'ADMIN001',
            'password' => Hash::make('admin@123'),
            'department' => 'Administration'
        ]);
        $admin->assignRole($adminRole);

        $security = User::factory()->create([
            'first_name' => 'Security',
            'last_name' => 'Officer',
            'email' => 'security@macl.aero',
            'password' => Hash::make('security@123'),
            'employee_id' => 'SEC001',
            'department' => 'Security'
        ]);
        $security->assignRole($securityRole);

        $staff = User::factory()->create([
            'first_name' => 'Staff',
            'last_name' => 'Member',
            'email' => 'staff@macl.aero',
            'password' => Hash::make('staff@123'),
            'employee_id' => 'STF001',
            'department' => 'Operations'
        ]);
        $staff->assignRole($staffRole);

        $superAdmin = User::factory()->create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'superadmin@macl.aero',
            'password' => Hash::make('superadmin@123'),
            'employee_id' => 'SA001',
            'department' => 'IT'
        ]);
        $superAdmin->assignRole($superAdminRole);


        // random 1000 users with different roles
        User::factory()->count(1000)->create()->each(function ($user) {
            $user->assignRole(Role::inRandomOrder()->first());
        });
    }
}