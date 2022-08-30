/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
import dayjs from 'dayjs'
import { Modal } from '../shared'
import { ErrorType, ContactsParams } from '../../models'
import { useUpdateContactMutation } from '../../store/contacts/contacts.api'
import { useActions, useAppSelector } from '../../store/store'
import ContactForm  from './ContactForm'

interface Props {
    open: boolean
    onClose: () => void
    params: ContactsParams
}

const EditModal: React.FC<Props> = ({ open, onClose, params }) => {
    const contact = useAppSelector((state) => state.modals.editedContact)
    const { changeEditedContact, resetEditedContact } = useActions()
    const [update, { isLoading, error }] = useUpdateContactMutation()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isLoading && !!contact) {
            await update({
                updated: { 
                    ...contact,
                    updated_date: dayjs()
                },
                params
            }).unwrap()
            onClose()
            resetEditedContact()
        }
    }
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        changeEditedContact({ [name]: name === 'group' && value === '' ? null : value })
    }, [])
    const onReset = useCallback(() => {
        onClose()
        resetEditedContact()
    }, [])

    return (
        <Modal
            open={open}
            title='Edit the contact'
            onClose={onReset}
        >
            <ContactForm
                values={{
                    name: contact?.name ?? '',
                    description: contact?.description ?? '',
                    phone: contact?.phone ?? '',
                    group: contact?.group ?? null
                }}
                error={error as ErrorType}
                loading={isLoading}
                text='Edit'
                lock={!contact?.name || !contact?.phone}
                onChange={onChange}
                onReset={onReset}
                onSubmit={onSubmit}
            />
        </Modal>
    )
}

export default EditModal