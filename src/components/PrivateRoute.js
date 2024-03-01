import React from "react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  if (!localStorage.getItem("token")) {
    return navigate("/login")
  } else if (user?.isExpert) {
    return navigate("/expert-dashboard")
  } else if (user?.isAdmin) {
    return children
  } else {
    return navigate("/customer-dashboard")
  }
}

export default PrivateRoute
