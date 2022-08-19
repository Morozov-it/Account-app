import React from 'react'
import { Link } from 'react-router-dom'
import { logoUrl } from '../../constants'

interface Props {
    title: string
    linkText: string
    linkUrl: string
}

const FormTitle: React.FC<Props> = ({ title, linkText, linkUrl }) => {
    return (
        <div>
            <img
                className="mx-auto h-12 w-auto"
                src={logoUrl}
                alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900 dark:text-slate-100">
                {title}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                {'or '}
                <Link to={linkUrl} className="font-medium text-indigo-600 hover:text-indigo-500">
                    {linkText}
                </Link>
            </p>
        </div>
    )
}

export default React.memo(FormTitle)