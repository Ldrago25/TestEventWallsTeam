function Form(props) {
  const handelSutmid = (e) => {
    e.preventDefault()
    if (e.target) {
      const data = Object.fromEntries(new FormData(e.target))
      console.log(data)
      // consultas
      // eslint-disable-next-line react/prop-types
      switch (props?.consulta) {
        case 'Login':
          console.log('Consulta de login')
          break
      }
      /*
      switch (props?.consulta) {
        case 'login':
          break
      }
      */
    }
  }
  return (
    <form className="form-login" onSubmit={(e) => handelSutmid(e)}>
      <div className="form-login__container-input">
        <label className="form-login__label" htmlFor="name">
          Name:
        </label>
        <input className="form-login__input-text" type="text" name="name" />
      </div>
      <div className="form-login__container-input">
        <label className="form-login__label" htmlFor="passoword">
          Password
        </label>
        <input
          className="form-login__input-passoword"
          type="password"
          name="password"
        />
      </div>
      <button>Load</button>
    </form>
  )
}

export default Form
