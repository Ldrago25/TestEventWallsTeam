import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './../pages/NotFound/NotFound'
import Home from './../pages/Home/Home'
import Login from './../pages/Login/Login'
import Register from './../pages/Register/Register'
import Logout from './../pages/Logout/Logout'
import CreateEvent from './../pages/CreateEvent/CreateEvent'
import SubEvent from './../pages/SubEvent/SubEvent'
import Profile from './../pages/Profile/Profile'
import Setting from './../pages/Setting/Setting'
export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event_create" element={<CreateEvent />} />
        <Route path="/event_subcrition" element={<SubEvent />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
