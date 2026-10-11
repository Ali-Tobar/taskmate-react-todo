import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // تأكد من إضافة هذا السطر

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* تغليف هنا */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
