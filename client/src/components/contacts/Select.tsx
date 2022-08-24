import React from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/outline'
import { classNames } from '../../utils/classNames'
import { SelectType } from '../../models'

interface Props<T> {
    lable: string
    values: Array<SelectType<T>>
    current: T
    onChange: (name: T) => void
    width?: number
}

const Select = <T,>({ lable, values, current, onChange, width }: Props<T>) => {
    return (
        <Listbox value={current} onChange={(value) => onChange(value)}>
            <div className="relative">
                <Listbox.Button className="inline-flex justify-center text-sm font-medium border-b border-gray-500">
                    {lable}
                    <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5"
                        aria-hidden="true"
                    />
                </Listbox.Button>
                <Listbox.Options className={
                    classNames("absolute right-0 z-10 mt-1 bg-white border border-gray-200 shadow max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm",
                        width ? `w-[${width}]` : 'w-full')}>
                    {values.map((value, i) => (
                        <Listbox.Option
                            key={i}
                            className={({ active }) =>
                            classNames(active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                'cursor-default select-none relative py-2 pl-3 pr-9')}
                            value={value.name}
                        >
                            {({ selected, active }) => (
                                <>
                                    <div className="flex items-center">
                                        <span className={classNames(
                                            selected ? 'font-bold' : '',
                                            'ml-3 block truncate')}>
                                            {value.title}
                                        </span>
                                    </div>
                                    {selected
                                        ? (<span
                                            className={classNames(
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                            )}>
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>)
                                        : null
                                    }
                                </>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    )
}

export default React.memo(Select) as typeof Select