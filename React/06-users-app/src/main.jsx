import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { UserApp } from "./UserApp.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserApp />
  </React.StrictMode>,
)
