import { CheckIcon, PencilAltIcon, XIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { UserDTO } from '../../models'
import FormInput from './FormInput'
import FormButton from './FormButton'
import { SpinnerInBtn } from '../controllers'

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
            <form onSubmit={onSubmit} onReset={onReset} className='flex gap-1'>
                <FormInput
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    labelClasses='flex-[1_0_70%]' />
                <FormButton
                    type='submit'
                    className='text-green-700 border border-green-700 hover:shadow-md flex-[1_0_10%]'>
                    {isLoading ? <SpinnerInBtn />: <CheckIcon className="h-5 w-5" />}
                </FormButton>
                <FormButton
                    type='reset'
                    className='text-gray-800 dark:text-slate-100 border border-gray-700 dark:border-slate-100 hover:shadow-md flex-[1_0_10%]'>
                    <XIcon className="h-5 w-5" />
                </FormButton>
            </form>
        )
    } else {
        return (
            <div className='flex items-center'>
                <div className='flex-[1_0_80%]'>{text}</div>
                <FormButton 
                    onClick={() => setEdited(name)}
                    className='text-gray-800 dark:text-slate-100 border border-gray-700 dark:border-slate-100 hover:shadow-md'>
                    <PencilAltIcon className="h-5 w-5" />
                    Edit
                </FormButton>
            </div>
        )
    }
}

export default React.memo(EditedContent)