import React, { useContext, useState } from "react"
import { ChatContext } from "../context/ChatProvider"
import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import styles from "./styles/contacts.module.css"
import img1 from "./avatar-svgrepo-com.svg"
const Contacts = ({ contacts }) => {
  const { imageUrl, setReciever } = useContext(ChatContext)
  const [chat, setChat] = useState(null)
  const navigate = useNavigate()

  const changeCurrentChat = (index, contact) => {
    setChat(index)
    setReciever(contact)
    navigate("/chat")
  }

  return (
    <div className={styles.contacts_div}>
      {contacts.map((contact, index) => {
        return (
          <Card
            key={contact._id}
            className={`${styles.contact} d-flex flex-row align-items-center ${
              index === chat ? `${styles.selected_contact}` : ""
            }`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <Card.Img src={img1} className="mr-2" width={20} />
            <Card.Body>{contact.username}</Card.Body>
          </Card>
        )
      })}
    </div>
  )
}

export default Contacts
