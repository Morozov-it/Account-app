import React from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import { classNames } from '../../utils/classNames'

interface Props<T, U> {
    lable: string
    values: Array<U>
    current: T
    onChange: (name: T) => void
    arrows?: boolean
}

const Select = <T extends string, U extends { name: T, title: string }>({ lable, values, current, onChange, arrows }: Props<T,U>) => {
    return (
        <Listbox value={current} onChange={(value) => onChange(value)}>
            {({ open }) => (
                <div className='flex items-center gap-1'>
                    <Listbox.Label className="text-sm font-medium ">{lable}</Listbox.Label>
                    <div className="mt-1 relative">
                        <Listbox.Button className="relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-8 py-1 text-left cursor-default focus:outline-none">
                            <span className="flex items-center">
                                <span className="ml-2 block truncate">{values.find((v) => v.name === current)?.title}</span>
                            </span>
                            {arrows && <span className="ml-2 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5" aria-hidden="true" />
                            </span>}
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={React.Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black
                                ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
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
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
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
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    )
}

export default React.memo(Select) as typeof Select