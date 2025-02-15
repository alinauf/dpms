<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PermitApplicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    Route::post('test', function (Request $request) {
            return response()->json([
                'message' => 'Admin route',
                'user' => $request->user(),
                'admin' => $request->user()->hasRole('admin'),
                'staff' => $request->user()->hasRole('staff'),
                'security' => $request->user()->hasRole('security')
            ]);
    });


    // Staff can request for a permit
    Route::post('permit', function (Request $request) {
        return response()->json([
            'message' => 'Staff route',
            'user' => $request->user()
        ]);
    });

    Route::post('permit/apply', [PermitApplicationController::class, 'store']);
    Route::get('permit/applications', [PermitApplicationController::class, 'index']);
    Route::get('permit/applications/{permitApplication}', [PermitApplicationController::class, 'show']);
    Route::put('permit/applications/{permitApplication}', [PermitApplicationController::class, 'update']);



    // 


});