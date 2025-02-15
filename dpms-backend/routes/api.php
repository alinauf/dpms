<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PermitApplicationController;
use App\Http\Controllers\PermitController;
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
    Route::post('permit/applications', [PermitApplicationController::class, 'index']);
    Route::post('permit/applications/{permitApplication}', [PermitApplicationController::class, 'show']);
    Route::post('permit/applications/update/{permitApplication}', [PermitApplicationController::class, 'update']);

    Route::post('permits', [PermitController::class, 'index']);
    Route::post('permits/{permit}', [PermitController::class, 'show']);
    Route::post('permit/types', [PermitController::class, 'getPermitTypes']);


    // 


});