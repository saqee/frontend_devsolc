import React from "react"
import styles from "./styles/nav.module.css"

import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.nav}>
      <div className={styles.hero}></div>
      <div className={styles.links}>
        <li onClick={() => navigate("/users")}>Contacts</li>
      </div>
    </div>
  )
}

export default Navbar
