import React from 'react'
import { Contact } from '../../models'
import ContactItem from './ContactItem'

const ContactList: React.FC = () => {
    const contact: Contact = {
        name: "My new contact",
        description: "my friend",
        phone: "8-800-2000-600",
        created_date: "2022-08-11T12:18:45.666Z" as unknown as Date,
        updated_date: "2022-08-11T12:18:45.666Z"  as unknown as Date,
        group: "Friends",
        blocked: false,
        userId: 1,
        id: 1
    }
    return (
        <div className="flex justify-center">
            <ul className="w-full">
                <ContactItem
                    contact={contact}
                />
            </ul>
        </div>
    )
}

export default React.memo(ContactList)