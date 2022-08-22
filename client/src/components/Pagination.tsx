import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { classNames } from '../utils/classNames'

interface Props {
    page: number
    limit: number
    onChange: (page: number) => void
    totalCount: number
    increment?: () => void
    decrement?: () => void
}

const Pagination: React.FC<Props> = ({ page, limit, onChange, totalCount, increment, decrement }) => {
    const length = Math.ceil(totalCount / Math.max(1, limit))
    const start = Math.max(page - 2, 1)
    const end = Math.min(start + 3, length)

    let items = []
    if (start > 1){
        items.push(1)
        if (start > 2) items.push(null)
    }
    for (let page = start; page <= end; page++) items.push(page)
    if (end < length){
        if (end < length - 1) items.push(null)
        items.push(length)
    }

    const onClick = (page: number) => {
        return () => onChange(page)
    }
    const onIncrement = () => {
        if (page < length && increment) {
            increment()
        }
    }
    const onDecrement = () => {
        if (page > 1 && decrement) {
            decrement()
        }
    }


    return (
        <div className="px-4 py-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-500 sm:px-6">
            {/* mobile */}
            <div className="flex-1 flex justify-between sm:hidden">
                <span
                    onClick={onDecrement}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium 
                    rounded-md text-gray-700 bg-white hover:bg-gray-50 active:bg-indigo-50 active:border-indigo-500"
                >
                    Previous
                </span>
                <span
                    onClick={onIncrement}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium 
                    rounded-md text-gray-700 bg-white hover:bg-gray-50 active:bg-indigo-50 active:border-indigo-500"
                >
                    Next
                </span>
            </div>
            {/* laptop */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm">
                        Showing <span className="font-medium">{(page * limit) - (limit - 1)}</span> to <span className="font-medium">{page * limit}</span> of{' '}
                        <span className="font-medium">{totalCount}</span> results
                    </p>
                </div>
                <div>
                    <ul className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <li
                            onClick={onDecrement}
                            className="relative cursor-pointer inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </li>
                        {items.map((number, index) => 
                            <li key={index}
                                className={classNames(
                                    number === page
                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                                'cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                            )}
                                onClick={number ? onClick(number) : () => {}}>
                                {number ?? '...'}
                            </li>
                        )}
                        <li
                            onClick={onIncrement}
                            className="relative cursor-pointer inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Pagination)