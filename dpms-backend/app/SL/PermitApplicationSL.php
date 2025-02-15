<?php

namespace App\SL;

use App\Models\PermitApplication;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PermitApplicationSL extends SL
{
    public function __construct()
    {
        $this->setModel(new PermitApplication());
    }

    public function storePermitApplication($data)
    {
        DB::beginTransaction();
        try {
            $permitApplication = PermitApplication::firstOrCreate([
                'permit_type_id' => $data['permit_type_id'],
                'valid_from' => $data['valid_from'],
                'valid_until' => $data['valid_until'],
                'justification' => $data['justification'],
                'approval_status' => $data['approval_status'],
                'user_id' => Auth::user()->id
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        DB::commit();
        if ($permitApplication) {
            return [
                'status' => true,
                'payload' => 'The permit application has been successfully created',
            ];
        } else {
            return [
                'status' => false,
                'payload' => 'There was an issue with saving the permit application',
            ];
        }
    }

    public function getPermitApplicationsByUserId($userId)
    {
        return PermitApplication::where('user_id', $userId);
    }

    public function getPermitApplication($permitApplicationId)
    {
        return PermitApplication::find($permitApplicationId);
    }

    public function approvePermitApplication($permitApplicationId)
    {
        DB::beginTransaction();
        try {
            $permitApplication = PermitApplication::find($permitApplicationId);
            $permitApplication->approval_status = true;
            $status = $permitApplication->save();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        DB::commit();
        if ($status) {
            return [
                'status' => true,
                'payload' => 'The permit application has been successfully approved',
            ];
        } else {
            return [
                'status' => false,
                'payload' => 'There was an issue with approving the permit application',
            ];
        }
        
    }

    public function rejectPermitApplication($permitApplicationId)
    {
        DB::beginTransaction();
        try {
            $permitApplication = PermitApplication::find($permitApplicationId);
            $permitApplication->approval_status = false;
            $status = $permitApplication->save();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        DB::commit();
        if ($status) {
            return [
                'status' => true,
                'payload' => 'The permit application has been successfully rejected',
            ];
        } else {
            return [
                'status' => false,
                'payload' => 'There was an issue with rejecting the permit application',
            ];
        }
    }

    public function retreiveAllPermitApplications()
    {
        return PermitApplication::all();
    }

}