<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
             //se crea la columna event y se le dice que es una clave foranea
             $table->unsignedBigInteger("event")->nullable()->after("id");
             $table->foreign('event')
             ->references('id')
             ->on('events')
             ->onDelete("set null")
             ->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['event']);
            $table->dropColumn("event");
        });
    }
};
