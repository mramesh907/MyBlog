import React, { use, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)
  useEffect(() => {
    // if(authStatus){
    //   navigate("/")
    // }else{
    //   navigate("/login")
    // }
    if (authentication) {
      if (authentication && !authStatus) {
        navigate("/login")
      } else if (!authentication && authStatus) {
        navigate("/")
      }
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])
  return( loader ? <h1>Loading...</h1> : <h1>{children}</h1>)
}

export default Protected
