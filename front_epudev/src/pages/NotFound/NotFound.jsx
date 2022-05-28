import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <div>
      NotFound
      <Link to={'/home'}>home</Link>
    </div>
  )
}

export default NotFound
