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
        Schema::create('permit_verifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('permit_id')->constrained()->onDelete('cascade');
            $table->foreignId('verified_by')->constrained('users')->onDelete('restrict');
            $table->timestamp('verified_at');
            $table->foreignId('checkpoint_id')->constrained();
            $table->string('status'); // 'valid', 'expired', 'invalid'
            $table->timestamps();

            $table->index('verified_at');
            $table->index(['permit_id', 'status']);
            $table->index(['checkpoint_id', 'verified_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permit_verifications');
    }
};
