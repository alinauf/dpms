<?php

namespace App\Http\Controllers;

use App\Models\PermitApplication;
use App\SL\PermitApplicationSL;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PermitApplicationController extends Controller
{

    private PermitApplicationSL $permitApplicationSL;

    public function __construct(PermitApplicationSL $permitApplicationSL)
    {
        $this->permitApplicationSL = $permitApplicationSL;
    }


    public function index(Request $request)
    {
        if (!$request->user()->hasRole('admin')) {
            $permitApplications = PermitApplication::where('user_id', $request->user()->id)->paginate(1);
        }else{
            $permitApplications = PermitApplication::paginate(1);
        }

        return response()->json([
            'message' => 'Permit applications retrieved successfully',
            'data' => $permitApplications
        ], 200);
    }

    public function store(Request $request)
    {
        
        try {
            $request->validate([
                'permit_type_id' => 'required|exists:permit_types,id',
                'valid_from' => 'required|date|after_or_equal:today',
                'valid_until' => 'required|date|after:valid_from',
                'justification' => 'required|string|min:10|max:1000',
             ], [
                'permit_type_id.required' => 'Please select a permit type.',
                'permit_type_id.exists' => 'The selected permit type is invalid.',
                
                'valid_from.required' => 'Start date is required.',
                'valid_from.date' => 'Start date must be a valid date.',
                'valid_from.after_or_equal' => 'Start date must be today or a future date.',
                
                'valid_until.required' => 'End date is required.',
                'valid_until.date' => 'End date must be a valid date.',
                'valid_until.after' => 'End date must be after the start date.',
                
                'justification.required' => 'Please provide a justification for the permit.',
                'justification.min' => 'Justification must be at least 10 characters.',
                'justification.max' => 'Justification cannot exceed 1000 characters.'
           ]);

            if (!$request->user()->hasPermissionTo('create permit applications')) {
                return response()->json([
                    'message' => 'Unauthorized. Only staff members can apply for permits.'
                ], 403);
            }

           $data = [
            'permit_type_id' => $request->permit_type_id,
            'valid_from' => $request->valid_from,
            'valid_until' => $request->valid_until,
            'justification' => $request->justification,
            'user_id' => $request->user()->id,
            'approval_status' => null,
           ];

           $permitApplication = $this->permitApplicationSL->storePermitApplication($data);

           if($permitApplication['status']){
            return response()->json([
                'message' => 'Permit application submitted successfully',
                'data' => $permitApplication
            ], 201);
           }else{   
            return response()->json([
                'message' => 'Error submitting permit application',
                'error' => $permitApplication['payload']
            ], 500);
           }

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error submitting permit application',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, PermitApplication $permitApplication)
    {

        // if user is not admin, they can only view their own permit applications
        if (!$request->user()->hasRole('admin')) {
            if ($permitApplication->user_id !== $request->user()->id) {
                return response()->json([
                    'message' => 'Unauthorized. You can only view your own permit applications.'
                ], 403);
            }
        }

        if (!$request->user()->hasPermissionTo('view permit applications')) {
            return response()->json([
                'message' => 'Unauthorized. No permission to view permit applications.'
            ], 403);
        }

        return response()->json([
            'message' => 'Permit application retrieved successfully',
            'data' => $permitApplication
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PermitApplication $permitApplication)
    {
        if (!$request->user()->hasPermissionTo('approve permit applications') && !$request->user()->hasPermissionTo('reject permit applications')) {
            return response()->json([
                'message' => 'Unauthorized. Only staff members can update permit applications.'
            ], 403);
        }

        $isApproved = $request->is_approved;

        if($isApproved){
            $this->permitApplicationSL->approvePermitApplication($permitApplication->id);
        }else{
            $this->permitApplicationSL->rejectPermitApplication($permitApplication->id);
        }

        return response()->json([
            'message' => 'Permit application updated successfully',
            'data' => $permitApplication
        ], 200);
    }
}
