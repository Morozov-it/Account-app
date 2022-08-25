import React, { useEffect, useRef, useState } from 'react'
import { FilterIcon } from '@heroicons/react/outline'
import { classNames } from '../../utils/classNames'
import Checkbox from './Checkbox'

interface Props {
    lable: string
    values: [string, boolean][]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    width?: number
}

const Filter: React.FC<Props> = ({ lable, values, onChange, width }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={(e) => setOpen(true)}
                className="inline-flex justify-center text-sm font-medium border-b border-gray-500">
                {lable}
                <FilterIcon
                    className={classNames("flex-shrink-0 -mr-1 ml-1 h-5 w-5",
                        values.map((v) => v[1]).some((i) => i) ? 'fill-indigo-500 stroke-inherit' : ''
                    )}
                    aria-hidden="true"
                />
            </button>
            {open && (
                <div
                    className={classNames("absolute right-0 z-10 mt-1 bg-white border border-gray-200 shadow max-h-56 rounded-md py-1 text-base overflow-auto sm:text-sm",
                        width ? `w-[${width}]` : 'w-full')}
                >
                    {values.map((value, i) => (
                        <div key={i} className='pr-2 py-1'>
                            <Checkbox name={value[0]} checked={value[1]} onChange={onChange}>
                                {value[0]}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default React.memo(Filter)