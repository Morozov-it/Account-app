import { CheckIcon, PencilAltIcon, XIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { UserDTO } from '../../models'
import { Button, Input, SpinnerInBtn } from '../controllers'

interface Props {
    name: string
    text: string
    type: string
    edited: boolean
    isLoading: boolean
    setEdited: React.Dispatch<React.SetStateAction<string>>
    onSave: (userDTO: Partial<UserDTO>) => Promise<any>
}

const EditedContent: React.FC<Props> = ({ name, text, type, edited, isLoading, setEdited, onSave }) => {
    const [value, setValue] = useState(text)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isLoading) {
            await onSave({ [name]: value })
            setEdited('')
            setValue(text)
        }
    }
    const onReset = () => {
        setEdited('')
        setValue(text)
    }

    if (edited) {
        return (
            <form onSubmit={onSubmit} onReset={onReset} className='flex flex-wrap justify-between gap-1'>
                <label className='flex-grow'>
                    <Input
                        className='w-full'
                        type={type}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    />
                </label>
                <div className='flex items-center gap-1'>
                    <Button
                        type='submit'
                        className='text-green-700 border border-green-700 hover:shadow-md'>
                        {isLoading ? <SpinnerInBtn />: <CheckIcon className="h-5 w-5" />}
                    </Button>
                    <Button type='reset'>
                        <XIcon className="h-5 w-5" />
                    </Button>
                </div>
            </form>
        )
    } else {
        return (
            <div className='flex flex-wrap justify-between gap-1'>
                <div className='flex-grow'>{text}</div>
                <Button onClick={() => setEdited(name)}>
                    <PencilAltIcon className="h-5 w-5" />
                    Edit
                </Button>
            </div>
        )
    }
}

export default React.memo(EditedContent)