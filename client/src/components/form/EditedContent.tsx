import { CheckIcon, PencilAltIcon, XIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { UserDTO } from '../../models'
import FormInput from './FormInput'
import StyledButton from './StyledButton'

interface Props {
    name: string
    text: string
    edited: boolean
    setEdited: React.Dispatch<React.SetStateAction<string>>
    onSave: (userDTO: Partial<UserDTO>) => void
}

const EditedContent: React.FC<Props> = ({ name, text, edited, setEdited, onSave }) => {
    const [value, setValue] = useState(text)

    if (edited) {
        return (
            <>
                <FormInput value={value} onChange={(e) => setValue(e.target.value)} labelClasses='flex-[1_0_70%]' />
                <StyledButton
                    onClick={() => {
                        onSave({ [name]: value })
                        setEdited('')
                        setValue(text)
                    }}
                    className='text-gray-900 border border-green-700 hover:shadow-md flex-[1_0_10%]'>
                    <CheckIcon className="h-5 w-5" />
                </StyledButton>
                <StyledButton
                    onClick={() => {
                        setEdited('')
                        setValue(text)
                    }}
                    className='text-gray-900 border border-gray-900 hover:shadow-md flex-[1_0_10%]'>
                    <XIcon className="h-5 w-5" />
                </StyledButton>
            </>
        )
    } else {
        return (
            <>
                <div className='flex-[1_0_80%]'>{text}</div>
                <StyledButton 
                    onClick={() => setEdited(name)}
                    className='text-gray-900 border border-blue-700 hover:shadow-md'>
                    <PencilAltIcon className="h-5 w-5" />
                    Edit
                </StyledButton>
            </>
        )
    }
}

export default React.memo(EditedContent)