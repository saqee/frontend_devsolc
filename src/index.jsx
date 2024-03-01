import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter, HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
import ChatProvider from "./chat/context/ChatProvider"
import AuthProvider from "./chat/context/AuthProvider"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <AuthProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthProvider>
  </Provider>
)
