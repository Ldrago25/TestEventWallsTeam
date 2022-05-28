import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const ruta = 'http://127.0.0.1:8000/api/'
const confi = { headers: { 'Content-Type': 'application/json' } }

export const loginUser = createAsyncThunk('User/login', (data) => {
  const rutaUser = ruta + 'user'
  data = JSON.stringify(data)
  return axios
    .post(rutaUser, data, confi)
    .then((resp) => resp.data)
    .catch((error) => console.log(error))
})

export const userRegister = createAsyncThunk('User/register', (data) => {
  const rutaUser = ruta + 'userRegister'
  data = JSON.stringify(data)
  return axios
    .post(rutaUser, data, confi)
    .then((resp) => resp.data)
    .catch((error) => console.log(error))
})

export const userRegisterEvents = createAsyncThunk(
  'User/userRegisterEvents',
  (data) => {
    const rutaUser = ruta + 'saveEvents'
    data = JSON.stringify(data)
    return axios
      .post(rutaUser, data, confi)
      .then((resp) => resp.data)
      .catch((error) => console.log(error))
    // eslint-disable-next-line comma-dangle
  }
)

export const userEvents = createAsyncThunk('User/userEvents', (idUser) => {
  console.log()
  const rutaUser = ruta + 'userEvents/' + idUser
  const data = JSON.stringify({})
  return axios
    .get(rutaUser, data, confi)
    .then((resp) => resp.data)
    .catch((error) => console.log(error))
  // eslint-disable-next-line comma-dangle
})

const initialState = {
  userData: null,
  userPD: null,
  lisEventUser: [],
  isAdmin: false,
  login: false,
  register: false,
  registerEvent: false,
  deleteEvent: false,
  clean: false,
  modal: false,
  alert: true,
  resp: '',
}

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload?.user
    },
    setUserPD: (state, action) => {
      state.userPD = action.payload?.user
    },
    setLogin: (state, action) => {
      state.login = true
    },
    setRegister: (state, action) => {
      state.register = true
    },
    setRegisterEvent: (state, action) => {
      state.registerEvent = action.payload
    },
    setResp: (state, action) => {
      state.resp = action.payload.resp
    },
    setModal: (state, action) => {
      state.modal = action.payload
    },
    setAlert: (state, action) => {
      state.alert = action.payload
    },
    setInitUser: (state, action) => {
      state.userData = null
      state.userPD = null
      state.lisEventUser = []
      state.isAdmin = false
      state.login = false
      state.register = false
      state.registerEvent = false
      state.deleteEvent = false
      state.clean = false
      state.modal = false
      state.alert = true
      state.resp = ''
    },
  },
  extraReducers: {
    [loginUser.fulfilled.type]: (state, action) => {
      state.login = typeof action.payload !== 'string'
      if (state.login) {
        state.userData = action.payload
        state.isAdmin = action.payload.email === 'vargasbrandonlnez@gmail.com'
      } else {
        state.resp = action.payload
      }
    },
    [userRegister.fulfilled.type]: (state, action) => {
      state.register = true
      state.resp = action.payload
    },
    [userRegisterEvents.fulfilled.type]: (state, action) => {
      state.registerEvent = true
      state.resp = action.payload
    },
    [userEvents.fulfilled.type]: (state, action) => {
      state.lisEventUser = action.payload
    },
  },
})

export const {
  setUserData,
  setUserPD,
  setLogin,
  setRegister,
  setRegisterEvent,
  setInitUser,
  setModal,
  setAlert,
} = UserSlice.actions

export default UserSlice.reducer
