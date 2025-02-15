<?php

namespace App\Http\Controllers;

use App\Models\Permit;
use App\Models\PermitType;
use Illuminate\Http\Request;

class PermitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->hasRole('staff')) {
            $permits = Permit::where('user_id', $request->user()->id)->with('permitType','user')->paginate(10);
        } else {
            $permits = Permit::with('permitType','user')->paginate(10);
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

    // get permit types
    public function getPermitTypes()
    {
        $permitTypes = PermitType::all();
        return response()->json([
            'message' => 'Permit types retrieved successfully',
            'data' => $permitTypes
        ], 200);
    }

}
