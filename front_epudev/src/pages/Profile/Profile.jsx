/* eslint-disable no-case-declarations */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable multiline-ternary */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  setRegisterEvent,
  userRegisterEvents,
  userEvents,
} from './../../reducers/slices/User'

import { removeEvents, setDeleteEvent } from './../../reducers/slices/EventUser'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { login, isAdmin, lisEventUser, userData, registerEvent } = useSelector(
    // eslint-disable-next-line comma-dangle
    (state) => state.User
  )

  const { lisEvent, deleteEvent } = useSelector((state) => state.EventUser)

  useEffect(() => {
    if (!login) {
      navigate('login')
    } else if (isAdmin) {
      navigate('setting')
    }
  }, [])
  useEffect(() => {
    if (registerEvent) {
      dispatch(userEvents(userData.id))
      dispatch(setRegisterEvent(false))
      alert('Registro con exito')
    }
  }, [registerEvent])
  useEffect(() => {
    if (deleteEvent) {
      dispatch(userEvents(userData.id))
      dispatch(setDeleteEvent(false))
      alert('Registro con exito')
    }
  }, [deleteEvent])
  const handleSumit = (e, type) => {
    e.preventDefault()
    if (e.target) {
      const data = Object.fromEntries(new FormData(e.target))
      // console.log(data)
      switch (type) {
        case 'desEvents':
          // console.log(e.target.item, 'hola')
          const resp = confirm('Esta seguro?')
          if (resp) {
            dispatch(
              removeEvents({
                idUser: Number(userData.id),
                events: Number(e.target.item.value),
                // eslint-disable-next-line comma-dangle
              })
            )
          } else {
            alert('Cuidado podria eliminar un evento')
          }
          break
        case 'registerEvents':
          // eslint-disable-next-line no-case-declarations
          const lista = Object.keys(data)
          if (lista.length > 0) {
            const resp = confirm('Esta seguro?')
            if (resp) {
              const keysLis = []
              lista.forEach((el) => {
                keysLis.push(Number(el))
              })
              dispatch(
                userRegisterEvents({
                  idUser: Number(userData.id),
                  events: keysLis,
                  // eslint-disable-next-line comma-dangle
                })
              )
              // console.log(e.target)
            }
          } else {
            alert('Cuidado podria eliminar un evento')
          }
          break
      }
      // consultas
      // dispatch(loginUser(data))
    }
  }
  const routes = (ruta) => {
    navigate(ruta)
  }
  return (
    <div className="container">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-auto bg-light p-5 shadow-lg ">
          {login ? (
            <div>
              <h2>Subscribed Events</h2>

              {lisEventUser ? (
                lisEventUser.length > 0 ? (
                  lisEventUser.map((el, index) => {
                    return (
                      <form
                        className="mb-2 col-auto bg-light p-2 shadow-lg"
                        key={index}
                        action=""
                        onSubmit={(e) => {
                          handleSumit(e, 'desEvents')
                        }}
                      >
                        <h5>{el.name}</h5>
                        <div>
                          <span>Locacion: {el.location}</span>
                        </div>
                        <div>
                          <span>Description: {el.description}</span>
                        </div>
                        <div>
                          <span>Fecha: {el.date}</span>
                        </div>
                        <input
                          type="hidden"
                          name="item"
                          id={el.id}
                          value={el.id}
                        ></input>
                        <div className="row justify-content-center align-items-center">
                          <button className="mt-2 form-login__load btn btn-secondary">
                            Unsubscribe
                          </button>
                        </div>
                      </form>
                    )
                  })
                ) : (
                  <li key={'sin_datos'}>No recorded events</li>
                )
              ) : (
                <div key={'sindatos'}>No recorded events</div>
              )}

              <h2>Not subscribed to these events</h2>
              <form
                className="mb-2 col-auto bg-light p-2 shadow-lg"
                action=""
                onSubmit={(e) => {
                  handleSumit(e, 'registerEvents')
                }}
              >
                <div className="overflow:scroll height: 20vh">
                  {lisEvent ? (
                    lisEvent.length > 0 ? (
                      lisEvent.map((el, index) => {
                        let resp = true
                        for (let i = 0; i < lisEventUser.length; i++) {
                          if (lisEventUser[i].id === el.id) {
                            resp = false
                            break
                          }
                        }
                        if (resp) {
                          return (
                            <div className="border-bottom mb-2">
                              <h5>{el.name}</h5>
                              <div>
                                <span>Locacion: {el.location}</span>
                              </div>
                              <div>
                                <span>Description: {el.description}</span>
                              </div>
                              <div>
                                <span>Fecha: {el.date}</span>
                              </div>

                              <label htmlFor={el.id}>Add-</label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name={el.id}
                                id={el.id + 'register'}
                              />
                            </div>
                          )
                        } else {
                          return <></>
                        }
                      })
                    ) : (
                      <li key={'sin datos'}>Not found</li>
                    )
                  ) : (
                    <div>No recorded events</div>
                  )}
                </div>
                <div className="row justify-content-center align-items-center">
                  <button className="form-login__load btn btn-secondary mb-2">
                    Subscribe
                  </button>
                </div>
              </form>
              <div className="row justify-content-center align-items-center">
                <button
                  className="form-login__load btn btn-primary"
                  onClick={() => {
                    routes('../home')
                  }}
                >
                  Home
                </button>
              </div>
            </div>
          ) : (
            <div>
              Registrater...
              <button
                onClick={() => {
                  routes('../login')
                }}
              >
                login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
