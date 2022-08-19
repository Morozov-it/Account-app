import React, { useState } from 'react'
import { DeletePopover, EditedContent } from '../components/form'
import LayoutPage from '../components/LayoutPage'
import { UserDTO } from '../models'
import { useAppSelector } from '../store/store'

const Settings: React.FC = () => {
    const [edited, setEdited] = useState('')
    const user = useAppSelector((state) => state.user)

    const onSave = (userDTO: Partial<UserDTO>) => {
        console.log(userDTO)
    }

    return (
        <LayoutPage title='Settings'>
            <div className="bg-white dark:bg-slate-700 mx-2 md:mx-0 shadow overflow-hidden sm:rounded-lg sm:mx-0">
                <div className="px-4 py-5 sm:px-6 bg-white dark:bg-slate-600">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-slate-100">{user.name}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-slate-300">Personal details</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Id</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.id}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center gap-2 ">
                                <EditedContent
                                    name='name'
                                    text={user.name ?? ''}
                                    edited={edited === 'name'}
                                    setEdited={setEdited}
                                    onSave={onSave}
                                />
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center gap-2 ">
                                <EditedContent
                                    name='email'
                                    text={user.email ?? ''}
                                    edited={edited === 'email'}
                                    setEdited={setEdited}
                                    onSave={onSave}
                                />
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Password</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center gap-2 ">
                                <EditedContent
                                    name='password'
                                    text={'......'}
                                    edited={edited === 'password'}
                                    setEdited={setEdited}
                                    onSave={onSave}
                                />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className='mt-2 mx-2 sm:mx-0'>
                <DeletePopover />
            </div>
        </LayoutPage>
    )
}

export default Settings