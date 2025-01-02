import React from 'react'
import AppRouter from './routes/AppRouter.jsx'
import { UserProvider } from './context/user.context.jsx'
function App() {
  return (
      <UserProvider >
        <AppRouter />
      </UserProvider>
  )
}

export default App