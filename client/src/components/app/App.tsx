import React from 'react'
import AppRouter from './AppRouter'
import Navbar from './Navbar'

const App: React.FC = () => {
  return (
    <div className='w-full h-full bg-white dark:bg-slate-700 text-black dark:text-white'>
      <Navbar />
      <AppRouter />
    </div>
  )
}

export default App
