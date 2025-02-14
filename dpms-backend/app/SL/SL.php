<?php

namespace App\SL;

use Illuminate\Support\Facades\DB;

abstract class SL
{
    private $model;

    public function indexSearch($column, $search, $paginateCount = 10)
    {
        return $this->model
            ::where($column, 'like', '%'.$search.'%')
            ->orderBy('id', 'desc')
            ->paginate($paginateCount);
    }

    public function show($id)
    {
        $result = $this->model::find($id);

        if ($result) {
            return $result;
        } else {
            return false;
        }
    }

    public function destroy($id): bool|array
    {
        DB::beginTransaction();
        $modelToDelete = $this->model::where('id', $id)->first();

        try {
            $modelToDelete->delete();
        } catch (\Exception $e) {
            DB::rollback();

            return false;
        }

        DB::commit();

        return ['status' => true, 'payload' => 'The item has been deleted'];
    }

    protected function getModel()
    {
        return $this->model;
    }

    protected function setModel($model)
    {
        $this->model = $model;
    }
}