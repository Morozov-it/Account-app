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
import { useActions } from '../../store/store'
import { Contact, ContactsParams } from '../../models'
import { Button, PopoverBtn, Switch } from '../controllers'
import { useBlockContactMutation, useDeleteContactMutation } from '../../store/contacts/contacts.api'

interface Props {
    contact: Contact
    params: ContactsParams
}

const ContactItem: React.FC<Props> = ({ contact, params }) => {
    const { id, blocked, name, phone, group, created_date, description, updated_date } = contact
    const { toggleModal, setEditedContact } = useActions()
    
    const [updateContact, { isLoading: updateLoading }] = useBlockContactMutation()
    const [deleteContact, { isLoading: deleteLoading }] = useDeleteContactMutation()

    const onBlock = () => {
        updateContact({
            id,
            blocked: !blocked,
            params
        })
    }
    const onEdit = () => {
        setEditedContact(contact)
        toggleModal('editContact')
    }
    const onDelete = () => {
        deleteContact(id)
    }

    return (
        <li className="block lg:flex lg:items-end lg:justify-between my-2 px-4 py-2 border border-gray-100 dark:border-gray-400 w-full rounded">
            <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold leading-5">
                    {name}
                </h3>
                <h4 className='mt-1'>
                    <PhoneIcon className="h-6 w-6 inline-block mr-1" aria-hidden="true" />
                    <a href={'tel:' + phone}>{phone}</a>
                </h4>
                {group && <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                    <UserGroupIcon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                    {'Group: ' + group}
                </div>}
                {description && <p className="mt-2 flex text-sm text-gray-500 dark:text-gray-200">
                    <MenuAlt1Icon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                    {'Description: ' + description}
                </p>}
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 gap-x-5">
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                        <CalendarIcon className="flex-shrink-0 mr-1 h-5 w-5" aria-hidden="true" />
                        {'Created: ' + dayjs(created_date).format('DD-MM-YYYY')}
                    </div>
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
                <div className='grid grid-cols-2 gap-1'>
                    <Button onClick={onEdit}>
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                        Edit
                    </Button>
                    <PopoverBtn loading={deleteLoading} onYes={onDelete} offset='right-0 top-9'>
                        <TrashIcon className="h-4 w-4" aria-hidden="true" />
                        Delete
                    </PopoverBtn>
                </div>
            </div>
        </li>
    )
}

export default React.memo(ContactItem)