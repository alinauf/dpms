<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permit_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('rank'); // higher means better
            $table->boolean('requires_approval')->default(true);
            $table->text('description')->nullable();
            $table->timestamps();

            $table->unique('name');
            $table->index('rank');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permit_types');
    }
};
