import React from 'react'
import dayjs from 'dayjs'
import { CalendarIcon, MenuAlt1Icon, PencilIcon, PhoneIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/outline'
import { Contact } from '../../models'
import PlainButton from './PlainButton'
import BlockSwitch from './BlockSwitch'

interface Props {
    contact: Contact
}

const ContactItem: React.FC<Props> = ({ contact }) => {
    return (
        <li className="block lg:flex lg:items-center lg:justify-between my-2 px-6 py-2 border border-gray-100 dark:border-gray-400 w-full rounded-sm">
            <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold leading-5 sm:tracking-tight sm:truncate">
                    {contact.name}
                </h3>
                <h4 className="sm:tracking-tight sm:truncate">
                    <PhoneIcon className="h-6 w-6 inline-block mr-1" aria-hidden="true" />
                    <a href={'tel:' + contact.phone}>{contact.phone}</a>
                </h4>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 gap-x-5">
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                        <UserGroupIcon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                        {'Group: ' + contact.group}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                        <MenuAlt1Icon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                        {'Description: ' + contact.description}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                        <CalendarIcon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                        {'Created: ' + dayjs(contact.created_date).format('DD-MM-YYYY HH:mm:ss')}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                        <CalendarIcon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                        {'Updated: ' + dayjs(contact.updated_date).format('DD-MM-YYYY HH:mm:ss')}
                    </div>
                </div>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4 gap-2">
                <BlockSwitch checked={contact.blocked} onChange={() => {}} />
                <PlainButton>
                    <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Edit
                </PlainButton>
                <PlainButton>
                    <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Delete
                </PlainButton>
            </div>
        </li>
    )
}

export default React.memo(ContactItem)