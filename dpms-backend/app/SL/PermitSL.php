<?php

namespace App\SL;

use App\Models\Permit;
use App\Models\PermitApplication;
use App\Models\PermitType;

class PermitSL extends SL
{
    public function createPermit($permitApplicationId)
    {
        $permitApplication = PermitApplication::find($permitApplicationId);
        $permit = Permit::create([
            'user_id' => $permitApplication->user_id,
            'permit_number' => $this->createUniquePermitNumber($permitApplication->permit_type_id, $permitApplication->id),
            'permit_type_id' => $permitApplication->permit_type_id,
            'valid_from' => $permitApplication->valid_from,
            'valid_until' => $permitApplication->valid_until,
            'permit_application_id' => $permitApplication->id,
            'is_expired' => false,
        ]);
        return $permit;
    }

    //create unique permit number. Append the permit type name to the permit number
    public function createUniquePermitNumber($permitTypeId, $permitApplicationId)
    {
        $permitType = PermitType::find($permitTypeId);
        $permitNumber = $permitType->name . '-' . $permitTypeId . '-' . $permitApplicationId . '-' . now()->timestamp;
        return $permitNumber;
    }
}