import { configureStore } from '@reduxjs/toolkit'
import EventUser from './slices/EventUser'
import User from './slices/User'
export default configureStore({
  reducer: {
    EventUser,
    User,
  },
})
