import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  userRegister,
  setUserPD,
  loginUser,
} from './../../reducers/slices/User'

function Register() {
  const dispatch = useDispatch()
  const { register, userPD, login } = useSelector((state) => state.User)
  console.log(register, userPD, login)

  useEffect(() => {
    if (userPD && register) {
      dispatch(
        loginUser({
          email: userPD.email,
          password: userPD.password,
          // eslint-disable-next-line comma-dangle
        })
      )
    }
  }, [register])

  const handelSutmid = (e) => {
    e.preventDefault()
    if (e.target) {
      const data = Object.fromEntries(new FormData(e.target))
      console.log(data, JSON.stringify(data))
      // consultas
      dispatch(setUserPD(data))
      dispatch(userRegister(data))
    }
  }
  return (
    <div className="container">
      <div className="row  vh-100 justify-content-center align-items-center">
        <div className="col-auto bg-light p-5 shadow-lg">
          <div className="card-header">
            <h1 className="text-secondary">Register</h1>
          </div>
          <form
            className="border-bottom border-secondary p-4 form "
            onSubmit={(e) => handelSutmid(e)}
          >
            <div className="mb-3">
              <input
                className="form-control  "
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control  "
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control  "
                type="password"
                name="password1"
                placeholder="Your Password"
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control "
                type="password"
                name="password"
                placeholder="Repeat Password"
                required
              />
            </div>
            <button className="form-login__load btn btn-primary">Load</button>
          </form>
          <p>
            Do you already have an account <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Register

// console.log(typeof data, typeof JSON.stringify(data))
/*
      fetch('http://127.0.0.1:8000/api/userRegister', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error('Error:', error))
        .then((response) => console.log('Success:', response))
        */
