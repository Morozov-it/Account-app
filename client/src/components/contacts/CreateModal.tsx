import React, { useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import dayjs from 'dayjs'
import { Button, Input } from '../controllers'
import { useActions, useAppSelector } from '../../store/store'
import { FormButton, FormInput } from '../form'
import Textarea from '../controllers/Textarea'
import { Alert } from '../shared'
import FormSelect from '../form/FormSelect'
import { ErrorType, Group } from '../../models'
import { groupSelect, phonePattern } from '../../constants'
import { useCreateContactMutation } from '../../store/contacts/contacts.api'

interface Props {
    open: boolean
    onClose: () => void
}

const CreateModal: React.FC<Props> = ({ open, onClose }) => {
    const userId = useAppSelector((state) => state.user.id)
    const { name, description, phone, group } = useAppSelector((state) => state.modals.createInfo)
    const { setCreateInfo, resetCreateInfo } = useActions()
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
            })
            onClose()
            resetCreateInfo()
        }
    }
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setCreateInfo({ [name]: name === 'group' && value === '' ? null : value })
    }, [setCreateInfo])

    return (
        <Transition appear show={open} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md border bg-white dark:bg-slate-700 text-black dark:text-white border-gray-300 p-4 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6"
                                    >
                                    Create a new contact
                                </Dialog.Title>

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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CreateModal