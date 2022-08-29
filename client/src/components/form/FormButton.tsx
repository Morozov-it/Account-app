import React from 'react'
import { LockClosedIcon } from '@heroicons/react/outline'
import { SpinnerInBtn } from '../controllers'

interface Props {
    text: string
    loading: boolean
    lock?: boolean
}

const FormButton: React.FC<Props> = ({ text, loading, lock }) => {

    return (
        <button type='submit' className='text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 group relative w-full flex items-center 
        justify-center py-2 px-4 text-sm font-medium rounded-md focus:outline-none'>
            {loading
                ?<SpinnerInBtn displayText/>
                :<>
                    {lock && <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                    </span>}
                    <span>{text}</span>
                </>
            }
        </button>
    )
}

export default React.memo(FormButton)