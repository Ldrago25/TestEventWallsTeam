import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, userEvents } from './../../reducers/slices/User'
import { useEffect } from 'react'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { login, userData, resp } = useSelector((state) => state.User)
  useEffect(() => {
    if (login) {
      dispatch(userEvents(userData.id))
      navigate('/home')
    }
  }, [login])
  const handelSutmid = (e) => {
    e.preventDefault()
    if (e.target) {
      const data = Object.fromEntries(new FormData(e.target))
      // console.log(data)
      // consultas
      dispatch(loginUser(data))
    }
  }
  return (
    <div className="container">
      <div className="row  vh-100 justify-content-center align-items-center">
        <div className="col-auto bg-light p-5 shadow-lg">
          <div className="card-header">
            <h1 className="text-secondary">Log in</h1>
          </div>
          <form
            className="border-bottom border-secondary p-4 form "
            onSubmit={(e) => handelSutmid(e)}
          >
            <p className="small text-center text-danger">{resp}</p>
            <div className="mb-3">
              <input
                className="form-control mb-3"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control mb-3"
                type="password"
                name="password"
                placeholder="******"
                required
              />
            </div>
            <button className="form-login__load btn btn-primary">Load</button>
          </form>
          <p className="small text-center">
            Do not have an Account?<Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
