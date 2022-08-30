import React from 'react'
import { groupSelect, phonePattern } from '../../constants'
import { ErrorType, Group } from '../../models'
import { Button, Input, Textarea } from '../controllers'
import { FormButton, FormInput, FormSelect } from '../form'
import { Alert } from '../shared'

interface Props {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    error: ErrorType
    loading: boolean
    onReset: () => void
    text: string
    lock: boolean
    values: {
        name: string
        description: string
        phone: string
        group: Group | null
    }
}

const ContactForm: React.FC<Props> = ({
    onSubmit,
    onChange,
    error,
    loading,
    onReset,
    text,
    lock,
    values
}) => {
    return (
        <form onSubmit={onSubmit} autoComplete='off' className="mt-2 space-y-3">
            <div className="rounded-md shadow-sm -space-y-1 flex flex-col gap-3">
                <FormInput
                    value={values.name}
                    onChange={onChange}
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                />
                <Textarea
                    value={values.description}
                    onChange={onChange}
                    name="description"
                    placeholder="Description"
                />
                <label className="block text-sm font-medium">
                    Phone
                    <Input
                        type='tel'
                        value={values.phone}
                        onChange={onChange}
                        name="phone"
                        required
                        placeholder="+1-012-345-6789"
                        pattern={phonePattern}
                    />
                </label>
                <FormSelect<Group>
                    value={values.group ?? ''}
                    onChange={onChange}
                    name="group"
                    options={groupSelect}>
                    Group
                </FormSelect>
            </div>
            {error && <Alert color='red' text={JSON.stringify((error)?.data)} />}
            <div className="mt-4 flex gap-1">
                <FormButton
                    text={text}
                    loading={loading}
                    lock={lock}
                />
                <Button
                    type="reset"
                    onClick={onReset}
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}

export default ContactForm