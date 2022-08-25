import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateUserMutation, useDeleteUserMutation } from '../store/user/user.api'
import { Routes } from '../constants'
import { ErrorType, UserDTO } from '../models'
import { useActions, useAppSelector } from '../store/store'
import { Alert, PopoverBtn, EditedContent, LayoutPage } from '../components'

const Settings: React.FC = () => {
    const navigate = useNavigate()
    const [edited, setEdited] = useState('')
    const user = useAppSelector((state) => state.user)
    const { setUser } = useActions()
    const [updateUser, { isLoading: updateLoading, error: updateError }] = useUpdateUserMutation()
    const [deleteUser, { isLoading: deleteLoading, error: deleteError }] = useDeleteUserMutation()

    const onSave = useCallback( async (userDTO: Partial<UserDTO>) => {
        if (!updateLoading && user.id) {
            try {
                const payload = await updateUser({
                    id: user.id,
                    ...userDTO
                }).unwrap()
                setUser(payload)
            } catch (e) {
                console.error(e)
            }
        }
    }, [setUser, updateLoading, updateUser, user.id])

    const onDelete = useCallback( async () => {
        if (!deleteLoading && user.id) {
            await deleteUser(user.id)
            localStorage.clear()
            navigate(Routes.login)
        }
    }, [deleteLoading, deleteUser, navigate, user.id]) 

    return (
        <LayoutPage title='Settings'>
            <div className="bg-white dark:bg-slate-700 border shadow overflow-hidden rounded">
                <div className="flex items-center justify-between px-4 py-5 bg-white dark:bg-slate-600">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-slate-100">{user.name}</h3>
                    <PopoverBtn offset='right-0 top-9' onYes={onDelete} loading={deleteLoading}>
                        Delete
                    </PopoverBtn>
                </div>
                <div className="border-t border-gray-200">
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-slate-300 px-4 pt-2">Personal details</p>
                    <dl>
                        <div className="bg-white dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-slate-100">Id</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-slate-100">{user.id}</dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-slate-100">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-slate-100">
                                <EditedContent
                                    name='name'
                                    type='text'
                                    text={user.name ?? ''}
                                    edited={edited === 'name'}
                                    setEdited={setEdited}
                                    onSave={onSave}
                                    isLoading={updateLoading}
                                />
                            </dd>
                        </div>
                        <div className="bg-white dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-slate-100">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-slate-100">
                                <EditedContent
                                    name='email'
                                    type='email'
                                    text={user.email ?? ''}
                                    edited={edited === 'email'}
                                    setEdited={setEdited}
                                    onSave={onSave}
                                    isLoading={updateLoading}
                                />
                            </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-slate-100">Password</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-slate-100">
                                <EditedContent
                                    name='password'
                                    type='password'
                                    text={'......'}
                                    edited={edited === 'password'}
                                    setEdited={setEdited}
                                    onSave={onSave}
                                    isLoading={updateLoading}
                                />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            {updateError && <Alert className='mt-2' color='red' text={JSON.stringify((updateError as ErrorType)?.data)} />}
            {deleteError && <Alert className='mt-2' color='red' text={JSON.stringify((deleteError as ErrorType)?.data)} />}
        </LayoutPage>
    )
}

export default Settings