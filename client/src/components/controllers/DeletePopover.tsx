import React from 'react'
import { Popover } from '@headlessui/react'
import { FormButton } from '../form'
import { CheckIcon, TrashIcon, XIcon } from '@heroicons/react/outline'
import SpinnerInBtn from './SpinnerInBtn'

interface Props {
    onYes: () => void
    loading?: boolean
}

const DeletePopover: React.FC<Props> = ({ onYes, loading = false }) => {
    return (
        <Popover className="relative sm:max-w-[20%]">
            <Popover.Button className='text-gray-800 dark:text-slate-100 border border-gray-700 dark:border-slate-100 bg-gray-50 dark:bg-slate-600 hover:shadow-md group relative w-full flex items-center justify-center py-1 px-4 text-sm font-medium rounded-md focus:outline-none'>
                {loading
                    ?<SpinnerInBtn displayText />
                    :<><TrashIcon className="h-5 w-5" /><span>Delete</span></>
                }
            </Popover.Button>
            <Popover.Panel className="inline-block absolute top-[-90px] z-10 w-full text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm transition-all dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                {({ close }) => (
                    <>
                        <div className="py-2 px-3 bg-gray-100 rounded-t-lg border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-center">Are you sure?</h3>
                        </div>
                        <div className="py-2 px-3 grid grid-cols-2 gap-4">
                            <FormButton
                                onClick={() => {
                                    onYes()
                                    close()
                                }}
                                className='text-gray-900 dark:text-white border border-red-700 hover:shadow-md flex-[0_0_10%] h-7'>
                                <CheckIcon className="h-5 w-5" />
                                yes
                            </FormButton>
                            <FormButton
                                onClick={() => close()}
                                className='text-gray-900 dark:text-white border border-gray-900 hover:shadow-md flex-[0_0_10%] h-7'>
                                <XIcon className="h-5 w-5" />
                                no
                            </FormButton>
                        </div>
                    </>
                )}
            </Popover.Panel>
        </Popover>
    )
}

export default React.memo(DeletePopover)