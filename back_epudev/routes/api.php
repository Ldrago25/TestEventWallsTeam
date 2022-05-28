<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/user',[UserController::class,'userValidate']);
Route::post('/userRegister',[UserController::class,'store']);
Route::get('/events',[EventController::class,'index']);
Route::post('/saveEvents',[UserController::class,'saveEventsUser']);
Route::get('/userEvents/{id}',[UserController::class,'getEventsUser']);
Route::post('/removeEvents',[UserController::class,'removeEventUser']);
Route::post('/saveEvent',[EventController::class,'store']);
