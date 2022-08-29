/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
import dayjs from 'dayjs'
import { Button, Input, Textarea } from '../controllers'
import { FormButton, FormInput, FormSelect } from '../form'
import { Alert, Modal } from '../shared'
import { ErrorType, Group, ContactsParams } from '../../models'
import { groupSelect, phonePattern } from '../../constants'
import { useUpdateContactMutation } from '../../store/contacts/contacts.api'
import { useActions, useAppSelector } from '../../store/store'

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
        changeEditedContact({ [name]: value })
    }, [])
    const handleClose = useCallback(() => {
        onClose()
        resetEditedContact()
    }, [])

    return (
        <Modal
            open={open}
            title='Edit the contact'
            onClose={handleClose}
        >
            <form onSubmit={onSubmit} autoComplete='off' className="mt-2 space-y-3">
                <div className="rounded-md shadow-sm -space-y-1 flex flex-col gap-3">
                    <FormInput
                        value={contact?.name ?? ''}
                        onChange={onChange}
                        name="name"
                        type="text"
                        required
                        placeholder="Name"
                    />
                    <Textarea
                        value={contact?.description ?? ''}
                        onChange={onChange}
                        name="description"
                        placeholder="Description"
                    />
                    <label className="block text-sm font-medium">
                        Phone
                        <Input
                            type='tel'
                            value={contact?.phone ?? ''}
                            onChange={onChange}
                            name="phone"
                            required
                            placeholder="+1-012-345-6789"
                            pattern={phonePattern}
                        />
                    </label>
                    <FormSelect<Group>
                        value={contact?.group ?? ''}
                        onChange={onChange}
                        name="group"
                        options={groupSelect}>
                        Group
                    </FormSelect>
                </div>
                {error && <Alert color='red' text={JSON.stringify((error as ErrorType)?.data)} />}
                <div className="mt-4 flex gap-1">
                    <FormButton
                        text='Edit'
                        loading={false}
                        lock={!contact?.name || !contact?.phone}
                    />
                    <Button type="reset" onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default EditModal