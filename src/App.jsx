import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import "./App.css"
import authService from "./appwrite/auth.js"
import { login, logout } from "./store/authSlice.js"
import { Footer, Header } from "./components/index.js"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService
      .getUser()
      .then((userData) => {
        console.log("User Data:", userData) // Debugging line
        if (userData) {
          dispatch(login({ userData }))
          console.log("Logged in") // Debugging line
        } else {
          dispatch(logout())
          console.log("Logged out") // Debugging line
        }
      })
      .catch((error) => console.error("Error fetching user:", error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            {/* <Outlet /> */}
            Outlet
          </main>
          <Footer />
        </div>
      </div>
      {loading && (
        <div className="absolute top-1/2 left-1/2">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-gray-900">Loading...</h2>
        </div>
      )}
    </>
  )
}

export default App
