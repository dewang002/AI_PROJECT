import React from 'react'

import AppRouter from './routes/AppRouter'
import { UserProvider } from './context/User.context'

function App() {
  return (
      <UserProvider >
        <AppRouter />
      </UserProvider>
  )
}

export default App