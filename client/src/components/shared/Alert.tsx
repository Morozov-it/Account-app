import React from 'react'
import { classNames } from '../../utils/classNames'

type Color = 'red' | 'green' | 'yellow'
interface Props {
    color: Color
    text: string
    onClose?: () => void
    className?: string
}

const Alert: React.FC<Props> = ({ color, text, onClose, className = '' }) => {
    const divClasses = classNames(
        className,
        'border px-4 py-2 rounded relative',
        color === 'red'
            ? 'bg-red-100 border-red-400 text-red-700'
            : color === 'green'
                ? 'bg-green-100 border-green-400 text-green-700'
                : 'bg-yellow-100 border-yellow-400 text-yellow-700'
    )
    const svgClasses = classNames(
        'fill-current h-6 w-6',
        color === 'red'
            ? 'text-red-500'
            : color === 'green'
                ? 'text-green-500'
                : 'text-yellow-500'
    )

    return (
        <div className={divClasses} role="alert">
            <span className="block sm:inline">{text}</span>
            {onClose && <span className="absolute top-0 bottom-0 right-0 px-4 py-2" onClick={onClose}>
                <svg className={svgClasses} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>}
        </div>
    )
}

export default React.memo(Alert)