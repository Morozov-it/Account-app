import React from 'react'

const RadioGroup: React.FC = () => {
    return (
        <fieldset className='flex items-center'>
            <legend className="block text-sm font-medium text-gray-700">Order</legend>
            <div className="flex gap-2">
                <div className="flex items-center">
                <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor="push-everything" className="ml-1 block text-sm font-medium text-gray-700">
                    asc
                </label>
                </div>
                <div className="flex items-center">
                <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                    desc
                </label>
                </div>
            </div>
        </fieldset>
    )
}

export default React.memo(RadioGroup)