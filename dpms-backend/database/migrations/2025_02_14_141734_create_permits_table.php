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
        Schema::create('permits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('permit_number')->unique();
            $table->foreignId('permit_type_id')->constrained();
            $table->timestamp('valid_from');
            $table->timestamp('valid_until');
            $table->foreignId('permit_application_id')->constrained();
            $table->boolean('is_expired')->default(false);
            $table->timestamps();

            $table->index(['user_id', 'is_expired']);
            $table->index('valid_until');
            $table->index('permit_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permits');
    }
};
