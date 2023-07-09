import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Provider from './contexts/Provider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <Provider>
      <App />
    </Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
)
