import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

const PrivateRouteExpert = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  if (user?.isExpert) {
    return children
  }
}

export default PrivateRouteExpert
