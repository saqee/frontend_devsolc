import axios from "axios"
import React, { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
export const AuthContext = createContext()

let p = JSON.parse(localStorage.getItem("chat_app_user")) || null

const AuthProvider = ({ children }) => {
  const { user } = useSelector((state) => state.user)

  const [chatter, setChatter] = useState(user)
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    if (user) {
      localStorage.setItem("chat_app_user", JSON.stringify(user))
      setChatter({ ...user })
    }
  }, [user])

  /*  const profileSet=async()=>{
    axios.
  } */
  /*   const login = async () => {
    localStorage.setItem("chat_app_user", JSON.stringify(user))
    setChatter({ ...user })
    return data
  } */

  const handleLogout = () => {
    localStorage.removeItem("chat_app_user")
    setChatter({})
    window.location.href("/expert")
  }
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    theme: "dark",
  }

  return (
    <AuthContext.Provider
      value={{
        toastOptions,
        chatter,
        setChatter,
        handleLogout,
        selected,
        setSelected,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
