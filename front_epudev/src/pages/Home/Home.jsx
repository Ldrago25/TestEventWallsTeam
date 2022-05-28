/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from 'react-redux'
import { getEvents, setInitEvent } from './../../reducers/slices/EventUser'
import { setAlert, setInitUser, setModal } from './../../reducers/slices/User'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

/* eslint-disable multiline-ternary */

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { login, userData, isAdmin, lisEventUser, modal, alert } = useSelector(
    // eslint-disable-next-line comma-dangle
    (state) => state.User
  )
  const { lisEvent, loadEvent } = useSelector((state) => state.EventUser)
  const [lisEventS, setLisEventS] = useState([])
  useEffect(() => {
    if (!login) {
      navigate('../login')
    }
  }, [])

  useEffect(() => {
    if (!loadEvent) {
      dispatch(getEvents({}))
    } else {
      if (alert && !isAdmin) {
        const today = new Date()
        const lisAux = []
        console.log(alert, 'home', lisEventUser)
        lisEventUser.forEach((el) => {
          const incri = new Date(el.date)
          // console.log(today, incri)
          let diff = incri.getTime() - today.getTime()
          diff = Number(diff / (1000 * 60 * 60 * 24)).toFixed(0)
          if (diff < 2 && diff >= 1) {
            console.log([el, diff, false], 'Agrego')
            lisAux.push([el, diff, false])
          }
        })

        if (lisAux.length > 0) {
          setLisEventS(lisAux)
          open_clout()
        }
        dispatch(setAlert(false))
      }
    }
  }, [loadEvent])
  const routes = (ruta) => {
    navigate(ruta)
  }
  const logout = () => {
    dispatch(setInitEvent(''))
    dispatch(setInitUser(''))
    routes('../login')
  }

  // eslint-disable-next-line camelcase
  const open_clout = () => {
    console.log('hola')
    dispatch(setModal(!modal))
  }
  const activeElem = (el) => {
    const aux = lisEventS.map((elm, index) => {
      if (el === index) {
        elm[2] = !elm[2]
      }
      return elm
    })
    setLisEventS([...aux])
  }

  return (
    <div className="container">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-auto bg-light p-5 shadow-lg">
          <div className="card-header">
            <h1 className="text-secondary">Welcome {userData.name}</h1>
          </div>
          <div className="row justify-content-center align-items-center border-bottom border-secondary p-4">
            {isAdmin ? (
              <div>
                {lisEvent?.length > 0 ? (
                  lisEvent.map((el, index) => {
                    return (
                      <div
                        className="col-auto bg-light p-2 shadow-lg"
                        key={index}
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
                      </div>
                    )
                  })
                ) : (
                  <div key={'sin datos'}>...</div>
                )}
                <div className="col-auto mt-2 p-2 row justify-content-center align-items-center">
                  <button
                    className="form-login__load btn btn-primary"
                    onClick={() => {
                      routes('../setting')
                    }}
                  >
                    Create Events
                  </button>
                </div>
              </div>
            ) : (
              <div className="row justify-content-center align-items-center mb-2">
                <button
                  className="form-login__load btn btn-primary"
                  onClick={() => {
                    routes('../profile')
                  }}
                >
                  Events
                </button>
              </div>
            )}
            <button
              className="form-login__load btn btn-primary"
              onClick={() => {
                logout()
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div id="miModal" className={modal ? 'modal modal_active' : 'modal'}>
        <div className="modal-contenido shadow-lg bg-light rounded-2">
        <div className='d-flex flex-row-reverse bd-highlight '>
        <div className='' >
        <button
                    className="open_clout_modal btn btn-circle btn-sm btn-danger"
                    onClick={() => {
                      open_clout()
                    }}
                  >
                    X
                  </button>
          </div>
        </div>
          <div className='border-bottom'>
            <h2 className='text-secondary'>Upcoming Events</h2>
          </div>
          <p>Event Title</p>
          {lisEventS ? (
            <>
              {lisEventS.length > 0 ? (
                lisEventS.map((el, index) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div key={'evento-' + el[0].id} className="evento d-flex justify-content-evenly">
                      <div>
                        <label>{el[0].name}</label>{' '}
                        <button
                          className="ms-5 evento_button btn btn-outline-primary btn-sm"
                          onClick={() => {
                            activeElem(index)
                          }}
                        >
                         + details
                        </button>
                      </div>
                      <div className={el[2] ? 'isActive_datos' : 'datos'}>
                        <h1>
                          {el[0].location} {el[0].date}
                        </h1>
                        <p>{el[0].description}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
