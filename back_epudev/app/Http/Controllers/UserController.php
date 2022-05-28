<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isEmpty;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function userValidate(Request $request)
    {
        $Objectuser = new User();
        $user = $Objectuser->validateUser($request);
        //valido que  la respuesta sea un usuario o no
        if (is_object($user)) {
            return response()->json($user);
        } else if ($user == 'Contrasenia erronea') {
            return response()->json("Contraseña erronea");
        } else {
            return response()->json("Usuario no encontrado");
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->isJson()) {
            $data = $request->json()->all();
            $validate = "Usuario creado con éxito";
            if ($data["password1"] != $data["password"]) {
                $validate = 'contrasenias no iguales';
            } else {
                try {
                    $result = DB::table('users')->insert([
                        'name' => $data["name"],
                        'email' => $data["email"],
                        'password' => $data["password"],
                    ]);
                } catch (Exception $e) {
                    $validate = "correo repetido";
                }
            }
            return response()->json($validate);
        }
    }

    /**
     * saveEventsUser a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function saveEventsUser(Request $request)
    {
        if ($request->isJson()) {
            $data = $request->json()->all();
            $user = User::find($data["idUser"]);
            $user->events()->attach($data["events"]);
            return response()->json("Evento(s) creados");
        }
    }

    /**
     * getEventsUser a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getEventsUser($id)
    {
        $user = User::find($id);
        $result = $user->events()->get();
        return response()->json($result);
    }
    /**
     * getEventsUser a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function removeEventUser(Request $request)
    {
        if ($request->isJson()) {
            $data = $request->json()->all();
            $user = User::find($data["idUser"]);
            $user->events()->detach($data["events"]);
            return response()->json("Evento(s) eliminados");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
