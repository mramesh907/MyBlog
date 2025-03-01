import React from 'react'
import {useDispatch} from "react-redux"
import authService from '../../appwrite/auth.js'
import { logout } from "../../store/authSlice.js"
const Logout = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
      authService
        .logout()
        .then(() => {
          dispatch(logout())
        })
        .catch((error) => console.error("Error logging out:", error))
    }
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
  )
}

export default Logout