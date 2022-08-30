/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
import dayjs from 'dayjs'
import { useActions, useAppSelector } from '../../store/store'
import { Modal } from '../shared'
import { ErrorType } from '../../models'
import { useCreateContactMutation } from '../../store/contacts/contacts.api'
import ContactForm from './ContactForm'

interface Props {
    userId: number | null
    open: boolean
    onClose: () => void
}

const CreateModal: React.FC<Props> = ({ userId, open, onClose }) => {
    const { name, description, phone, group } = useAppSelector((state) => state.modals.createdInfo)
    const { setCreatedInfo, resetCreateInfo } = useActions()
    const [create, { isLoading, error }] = useCreateContactMutation()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isLoading && !!userId) {
            await create({
                userId,
                created_date: dayjs(),
                updated_date: null,
                blocked: false,
                group,
                name,
                phone,
                description
            }).unwrap()
            onClose()
            resetCreateInfo()
        }
    }
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setCreatedInfo({ [name]: name === 'group' && value === '' ? null : value })
    }, [])
    const onReset = useCallback(() => {
        onClose()
        resetCreateInfo()
    }, [])

    return (
        <Modal
            open={open}
            title='Create a new contact'
            onClose={onClose}
        >
            <ContactForm
                values={{ name, description, phone, group }}
                error={error as ErrorType}
                loading={isLoading}
                text='Create'
                lock={!name || !phone}
                onChange={onChange}
                onReset={onReset}
                onSubmit={onSubmit}
            />
        </Modal>
    )
}

export default CreateModal