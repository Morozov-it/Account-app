import React from 'react'
import { Listbox } from '@headlessui/react'
import { FilterIcon } from '@heroicons/react/outline'
import { classNames } from '../../utils/classNames'
import { FilterType } from '../../models'
import { Checkbox } from '../form'

interface Props<T> {
    lable: string
    values: Array<FilterType<T>>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    width?: number
}

const Filter = <T extends string,>({ lable, values, onChange, width }: Props<T>) => {
    return (
        <Listbox value='' onChange={() => { }}>
            {({ open }) => (
                <div className='flex items-center gap-1'>
                    <div className="mt-1 relative">
                        <Listbox.Button className="inline-flex justify-center text-sm font-medium border-b border-gray-500">
                            {lable}
                            <FilterIcon
                                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5"
                                aria-hidden="true"
                            />
                        </Listbox.Button>
                        {open && (
                            <div onClick={(e) => e.stopPropagation()}>
                                <Listbox.Options as="div" className={classNames("absolute right-0 z-10 mt-1 bg-white border border-gray-200 shadow max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm",
                                    width ? `w-[${width}]` : 'w-full')} static>
                                    {values.map((value, i) => (
                                        <Listbox.Option as="div" key={i} value={value}>
                                            <Checkbox name={value[0]} checked={value[1]} onChange={onChange}>
                                                {value[0]}
                                            </Checkbox>
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        )}
                    </div>
                </div>)
            }
        </Listbox>
    )
}

export default React.memo(Filter) as typeof Filter