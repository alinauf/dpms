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
        Schema::create('permit_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('permit_type_id')->constrained();
            $table->timestamp('valid_from');
            $table->timestamp('valid_until');
            $table->boolean('approval_status')->nullable();
            $table->string('approval_comment')->nullable();
            $table->text('justification');
            $table->timestamps();

            $table->index(['user_id', 'approval_status']);
            $table->index('valid_until');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permit_applications');
    }
};
