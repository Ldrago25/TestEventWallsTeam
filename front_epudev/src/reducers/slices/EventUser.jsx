import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const ruta = 'http://127.0.0.1:8000/api/'
const confi = { headers: { 'Content-Type': 'application/json' } }

export const getEvents = createAsyncThunk('Event/Events', (data) => {
  const rutaEvent = ruta + 'events'
  data = JSON.stringify(data)
  return axios
    .get(rutaEvent, data, confi)
    .then((resp) => resp.data)
    .catch((error) => console.log(error))
})

export const registerEvent = createAsyncThunk('Event/registerEvent', (data) => {
  const rutaEvent = ruta + 'saveEvent'
  data = JSON.stringify(data)
  return axios
    .post(rutaEvent, data, confi)
    .then((resp) => resp.data)
    .catch((error) => console.log(error))
})

export const removeEvents = createAsyncThunk('Event/removeEvents', (data) => {
  const rutaEvent = ruta + 'removeEvents'
  data = JSON.stringify(data)
  // console.log(data)
  return axios
    .post(rutaEvent, data, confi)
    .then((resp) => resp.data)
    .catch((error) => console.log(error))
})

const initialState = {
  lisEvent: [],
  loadEvent: false,
  registerEvent: false,
  deleteEvent: false,
  resp: '',
}

export const EventSlice = createSlice({
  name: 'EventUser',
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.lisEvent = action.payload.state
    },
    setLoadEvent: (state, action) => {
      state.loadEvent = action.payload.load
    },
    setRegisterEvent: (state, action) => {
      state.registerEvent = action.payload.event
    },
    setDeleteEvent: (state, action) => {
      state.deleteEvent = action.payload.event
    },
    setResp: (state, action) => {
      state.resp = action.payload.resp
    },
    setInitEvent: (state, action) => {
      state.lisEvent = []
      state.loadEvent = false
      state.registerEventV = false
      state.deleteEvent = false
      state.resp = ''
    },
  },
  extraReducers: {
    [getEvents.fulfilled.type]: (state, action) => {
      state.lisEvent = action.payload
      state.loadEvent = true
      // console.log(action.payload)
    },
    [registerEvent.fulfilled.type]: (state, action) => {
      state.resp = action.payload
      state.registerEventV = true
      // console.log(action.payload)
    },
    [removeEvents.fulfilled.type]: (state, action) => {
      state.resp = action.payload
      state.deleteEvent = true
      // console.log(action.payload)
    },
  },
})

export const {
  setEvent,
  setLoadEvent,
  setRegisterEvent,
  setDeleteEvent,
  setResp,
  setInitEvent,
} = EventSlice.actions

export default EventSlice.reducer
