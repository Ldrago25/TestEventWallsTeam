/* eslint-disable comma-dangle */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable multiline-ternary */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getEvents,
  registerEvent,
  removeEvents,
  setRegisterEvent,
} from './../../reducers/slices/EventUser'
function Setting() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAdmin, userData } = useSelector((state) => state.User)
  const { registerEventV } = useSelector((state) => state.EventUser)

  useEffect(() => {
    if (!isAdmin) navigate('../login')
  }, [])
  useEffect(() => {
    if (registerEventV) {
      alert('Evento creado')
      dispatch(getEvents())
      dispatch(setRegisterEvent({ events: false }))
    }
  }, [registerEventV])
  const handleSumit = (e, type) => {
    e.preventDefault()
    if (e.target) {
      const data = Object.fromEntries(new FormData(e.target))
      switch (type) {
        case 'createEvent':
          dispatch(registerEvent(data))
          e.target.name.value = ''
          e.target.date.value = ''
          e.target.location.value = ''
          e.target.description.value = ''
          break
        case 'deleteEvents':
          console.log(data)
          // eslint-disable-next-line no-case-declarations
          const lista = Object.keys(data)
          // eslint-disable-next-line no-case-declarations
          if (lista.length > 0) {
            const resp = confirm('Esta seguro?')
            if (resp) {
              const keysLis = []
              lista.forEach((el) => {
                keysLis.push(Number(el))
              })
              dispatch(
                removeEvents({
                  idUser: Number(userData.id),
                  events: keysLis,
                })
              )
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
    <div>
      <div className="container border-botom">
        <div className='d-flex flex-row-reverse bd-highlight'>
          <div className='m-3' >
            <button
            className='btn btn-oustside-dark btn-sm'
              onClick={() => {
                routes('../home')
              }}
            ><span className='text-decoration-underline'>Home</span>
            </button>
            </div>
        </div>
        <div className='row bg-light shadow-lg'>
        <div className='col p-0'>
            <img src="https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_960_720.jpg"
            alt="eventos" className='img-fluid float-left' />
          </div>
          <div className='col'>
          {isAdmin ? (
            <div className="row p-2 col-11">
              <form
                action=""
                onSubmit={(e) => {
                  handleSumit(e, 'createEvent')
                }}
              >
                <h2>Crear Evento</h2>
                <div className=''>
                  <label htmlFor="" className='form-label'>date event:</label>
                  <input type="date" className='form-control' name="date" required />
                </div>
                <div className='ps-2'>
                  <label htmlFor="">Name event:</label>
                  <input type="text" className='form-control' name="name" required />
                </div>
                <div className='ps-2'>
                  <label htmlFor="">Location event:</label>
                  <input type="text" className='form-control' name="location" id="" required />
                </div>
                <div className='ps-2'>
                  <label htmlFor="">Descrition event:</label>
                  <textarea
                    className='form-control'
                    name="description"
                    id=""

                    required
                  ></textarea>
                </div>
                <button className='mt-3 btn btn-primary btn-sm'>Create Event</button>
              </form>
            </div>
          ) : (
            <div></div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
/*
          <form
            action=""
            onSubmit={(e) => {
              handleSumit(e, 'deleteEvents')
            }}
          >
            <h2>Delete evento</h2>
            <ul>
              {lisEvent ? (
                lisEvent.length > 0 ? (
                  lisEvent.map((el, index) => {
                    return (
                      <li key={index}>
                        <h2>{el.name}</h2>
                        <h4>Locacion:{el.location}</h4>
                        <p>{el.description}</p>
                        <div>
                          <label htmlFor="">Delete</label>
                          <input type="checkbox" name={el.id} id={el.id} />
                        </div>
                      </li>
                    )
                  })
                ) : (
                  <li key={'sin datos'}>sin eventos </li>
                )
              ) : (
                <div>Sin registros</div>
              )}
            </ul>
            {lisEvent ? <button>Delete</button> : <div></div>}
          </form>
*/
