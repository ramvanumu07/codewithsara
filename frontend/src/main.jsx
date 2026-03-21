import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const rootEl = document.getElementById('root')
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  const fallback = document.createElement('div')
  fallback.style.cssText = 'display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;color:#374151'
  fallback.innerHTML = '<p>Failed to load. Please refresh the page.</p>'
  document.body.appendChild(fallback)
}




























