import React, { useCallback } from 'react'
import dayjs from 'dayjs'
import { Button, Input, Textarea } from '../controllers'
import { useActions, useAppSelector } from '../../store/store'
import { FormButton, FormInput, FormSelect } from '../form'
import { Alert, Modal } from '../shared'
import { ErrorType, Group } from '../../models'
import { groupSelect, phonePattern } from '../../constants'
import { useCreateContactMutation } from '../../store/contacts/contacts.api'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Modal
            open={open}
            title='Create a new contact'
            onClose={onClose}
        >
            <form onSubmit={onSubmit} autoComplete='off' className="mt-2 space-y-3">
                <div className="rounded-md shadow-sm -space-y-1 flex flex-col gap-3">
                    <FormInput
                        value={name}
                        onChange={onChange}
                        name="name"
                        type="text"
                        required
                        placeholder="Name"
                    />
                    <Textarea
                        value={description}
                        onChange={onChange}
                        name="description"
                        placeholder="Description"
                    />
                    <label className="block text-sm font-medium">
                        Phone
                        <Input
                            type='tel'
                            value={phone}
                            onChange={onChange}
                            name="phone"
                            required
                            placeholder="+1-012-345-6789"
                            pattern={phonePattern}
                        />
                    </label>
                    <FormSelect<Group>
                        value={group ?? ''}
                        onChange={onChange}
                        name="group"
                        options={groupSelect}>
                        Group
                    </FormSelect>
                </div>
                {error && <Alert color='red' text={JSON.stringify((error as ErrorType)?.data)} />}
                <div className="mt-4 flex gap-1">
                    <FormButton
                        text='Create'
                        loading={false}
                        lock={!name || !phone}
                    />
                    <Button
                        type="reset"
                        onClick={() => {
                            onClose()
                            resetCreateInfo()
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateModal