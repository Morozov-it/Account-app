import React, { useCallback } from 'react'
import { useActions, useAppSelector } from '../../store/store'
import { CreateModal } from '../contacts'
import AppRouter from './AppRouter'
import Navbar from './Navbar'

const App: React.FC = () => {
  const activeModal = useAppSelector((state) => state.modals.active)
  const { toggleModal } = useActions()
  const onCloseModal = useCallback(() => toggleModal(null), [toggleModal])

  return (
    <>
      <div className='w-full h-full bg-white dark:bg-slate-700 text-black dark:text-white'>
        <Navbar />
        <AppRouter />
      </div>
      <CreateModal open={activeModal === 'createContact'} onClose={onCloseModal} />
    </>
  )
}

export default App
