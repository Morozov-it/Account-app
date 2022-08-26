import React from 'react'
import dayjs from 'dayjs'
import {
    CalendarIcon,
    MenuAlt1Icon,
    PencilIcon,
    PhoneIcon,
    TrashIcon,
    UserGroupIcon
} from '@heroicons/react/outline'
import { useActions, useAppSelector } from '../../store/store'
import { Contact } from '../../models'
import { Button, Switch } from '../controllers'
import { useBlockContactMutation } from '../../store/contacts/contacts.api'

const ContactItem: React.FC<Contact> = ({
    id,
    userId,
    name,
    phone,
    description,
    created_date,
    updated_date,
    group,
    blocked
}) => {
    const { toggleModal } = useActions()
    const { _page, _limit, _sort, _order, q } = useAppSelector((state) => state.contacts)
    const [updateContact, { isLoading: updateLoading }] = useBlockContactMutation()

    const onBlock = () => {
        updateContact({
            id,
            blocked: !blocked,
            params: { _page, _limit, _sort, _order, q, userId }
        })
    }

    return (
        <li className="block lg:flex lg:items-end lg:justify-between my-2 px-4 py-2 border border-gray-100 dark:border-gray-400 w-full rounded">
            <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold leading-5">
                    {name}
                </h3>
                <h4>
                    <PhoneIcon className="h-6 w-6 inline-block mr-1" aria-hidden="true" />
                    <a href={'tel:' + phone}>{phone}</a>
                </h4>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 gap-x-5">
                    <div className="mt-2 flex text-sm text-gray-500 dark:text-gray-200">
                        <MenuAlt1Icon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                        {'Description: ' + description}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                        <CalendarIcon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                        {'Created: ' + dayjs(created_date).format('DD-MM-YYYY')}
                    </div>
                    {group && <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                        <UserGroupIcon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                        {'Group: ' + group}
                    </div>}
                    {updated_date && <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                        <CalendarIcon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                        {'Updated: ' + dayjs(updated_date).format('DD-MM-YYYY HH:mm:ss')}
                    </div>}
                </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between lg:mt-0 lg:ml-4 gap-2">
                <Switch
                    checked={blocked}
                    onChange={onBlock}
                    label='block'
                    disabled={updateLoading}
                />
                <div className='flex items-center justify-between gap-1'>
                    <Button onClick={() => toggleModal('createContact')}>
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                        Edit
                    </Button>
                    <Button>
                        <TrashIcon className="h-4 w-4" aria-hidden="true" />
                        Delete
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default React.memo(ContactItem)