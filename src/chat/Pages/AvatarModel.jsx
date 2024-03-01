import axios from "axios"
import React, { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import Avatar from "./Avatar"
import styles from "./styles/avatar.module.css"
import Button from "react-bootstrap/Button"
import img1 from "./avatar-svgrepo-com.svg"
function AvatarModel() {
  const [avatar, setAvatar] = useState([])
  const [lgShow, setLgShow] = useState(false)

  return (
    <>
      <div className={styles.avatars}>
        <img src={img1} />
        {/* {avatar.map((item, index) => {
              return 
            })} */}
      </div>
    </>
  )
}

export default AvatarModel
