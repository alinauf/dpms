<?php

namespace App\Http\Controllers;

use App\Models\Permit;
use Illuminate\Http\Request;

class PermitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->hasRole('staff')) {
            $permits = Permit::where('user_id', $request->user()->id)->with('permitType','user')->get();
        } else {
            $permits = Permit::with('permitType','user')->get();
        }
        return response()->json([
            'message' => 'Permits retrieved successfully',
            'data' => $permits
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,  Permit $permit)
    {
        if ($request->user()->hasRole('staff')) {
            if ($permit->user_id !== $request->user()->id) {
                return response()->json([
                    'message' => 'Unauthorized. You can only view your own permits.'
                ], 403);
            }
        }   
        return response()->json([
            'message' => 'Permit retrieved successfully',
            'data' => $permit->load('permitType','user')
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permit $permit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permit $permit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permit $permit)
    {
        //
    }
}
