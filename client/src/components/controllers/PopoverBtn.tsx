import React from 'react'
import { Popover } from '@headlessui/react'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import SpinnerInBtn from './SpinnerInBtn'
import Button from './Button'
import { classNames } from '../../utils/classNames'

interface Props {
    onYes: () => void
    loading?: boolean
    children?: React.ReactNode
    offset?: string
}

const PopoverBtn: React.FC<Props> = ({ onYes, loading = false, children, offset }) => {
    return (
        <Popover className="relative">
            <Popover.Button className='flex items-center justify-center gap-1 px-4 py-1 border rounded-md shadow-sm text-sm font-medium border-gray-300 text-gray-700 
            dark:text-gray-200 dark:hover:bg-gray-500 hover:bg-gray-100 active:bg-gray-300 dark:active:bg-gray-600 focus:outline-none'>
                {loading
                    ?<SpinnerInBtn displayText />
                    : children
                }
            </Popover.Button>
            <Popover.Panel>
                {({ close }) => (
                    <div className={classNames(
                        'min-w-[185px] absolute z-10 text-center bg-white dark:bg-slate-700 text-black dark:text-white border rounded-md border-gray-300 shadow-sm transition-all',
                        offset ?? '')}>
                        <h3 className="font-semibold">Are you sure?</h3>
                        <div className="py-2 px-3 grid grid-cols-2 gap-2">
                            <Button
                                onClick={() => {
                                    onYes()
                                    close()
                                }}
                                className='border border-red-700'>
                                <CheckIcon className="h-4 w-4" />
                                Yes
                            </Button>
                            <Button onClick={() => close()}>
                                <XIcon className="h-4 w-4" />
                                No
                            </Button>
                        </div>
                    </div>
                )}
            </Popover.Panel>
        </Popover>
    )
}

export default React.memo(PopoverBtn)