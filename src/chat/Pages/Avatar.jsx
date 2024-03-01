import React, { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { ChatContext } from "../context/ChatProvider"
import styles from "./styles/avatar.module.css"
import img1 from "./avatar-svgrepo-com.svg"
const Avatar = ({ src, index, setLgShow }) => {
  console.log(src)
  const { selected, setSelected, setForm, form } = useContext(AuthContext)

  return (
    <div
      className={`${styles.avatardiv} ${
        selected === index ? `${styles.selected}` : ""
      }`}
    >
      <img src={img1} alt="Avatar" />
    </div>
  )
}

export default Avatar
