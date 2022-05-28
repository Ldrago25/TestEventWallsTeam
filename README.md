#TestEvent :)

# Api Epudev

Usuario admin

se encuentra en el archivo seeder.php
comando para generar php artisan migrate:refresh --seed

name:Brandon Vargas
email: vargasbrandonlnez@gmail.com

ruta:http://127.0.0.1:8000/api/

##Consultar usuario si esta logeado
metodo:post - endpoint:user

consulta:
~~~
{
    "email":"vargasbrandonlnez@gmail.com",
    "password":"123"
}
~~~
resp:
~~~
{
    "id": 1,
    "event": null,
    "name": "Brandon Vargas",
    "email": "vargasbrandonlnez@gmail.com",
    "password": "123",
    "remember_token": null,
    "created_at": null,
    "updated_at": null
}
~~~
##Registrar usuario
metodo:post - endpoint:userRegister

consulta:
~~~
{
    "name":"vargas"
    "email":"vargasbrandonlnez1@gmail.com",
    "password":"1234",
    "password1":"1234"
}
~~~
resp:
~~~
"Usuario creado con éxito"
~~~
##Registrar event
metodo:post - endpoint:saveEvent

consulta:
~~~
{
    "date":"1995-01-29",
    "name":"consulta",
    "location":"venezuela",
    "description":"Venezuela grande :v"
}
~~~
resp:
~~~
"Evento creado"
~~~
##Registrar event por user
metodo:post - endpoint:saveEvents

consulta:
~~~
{
    "idUser":"1",
    "events":[id1,,id2,...]
}
~~~
resp:
~~~
"Evento(s) creados"
~~~
##Ver events por user
metodo:get - endpoint:events

consulta:
~~~
{}
~~~
resp:
~~~
[
    {
        "id": 1,
        "date": "1995-01-29",
        "name": "consulta",
        "location": "venezuela",
        "description": "Venezuela grande :v",
        "created_at": "2022-05-26T13:08:49.000000Z",
        "updated_at": "2022-05-26T13:08:49.000000Z"
    }
]
~~~
##Ver events que se registro user
metodo:get - endpoint:userEvents/{id}

consulta:
~~~
{}
~~~
resp:
~~~
[
    {
        "id": 1,
        "date": "1995-01-29",
        "name": "consulta",
        "location": "venezuela",
        "description": "Venezuela grande :v",
        "created_at": "2022-05-26T13:08:49.000000Z",
        "updated_at": "2022-05-26T13:08:49.000000Z",
        "pivot": {
            "user_id": 1,
            "event_id": 1
        }
    }
]
~~~
##Eliminar events
metodo:post - endpoint:removeEvents

consulta:
~~~
{
  "idUser":1,
  "events":[id1,id2,...]
}
~~~
resp:
~~~
"Evento(s) eliminados"
~~~