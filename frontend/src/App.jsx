import React from 'react'
import AppRouter from './routes/AppRouter'
import { UserProvider } from './context/user.context'
function App() {
  return (
      <UserProvider >
        <AppRouter />
      </UserProvider>
  )
}

export default App