import React from 'react'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import Alert from '../Alert'
import Spinner from '../Spinner'

interface Props<T> {
    data: T[] | undefined
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    error: FetchBaseQueryError | SerializedError | undefined
    render: (item: T) => JSX.Element
}

const List = <T,>({ data, isLoading, isError, isSuccess, error, render }: Props<T>) => {
    let content: React.ReactNode

    if (isLoading) {
        content = <Spinner />
    } else if (isSuccess && !!data) {
        content = data.length
            ? <ul className="w-full">{data?.map(render)}</ul>
            : <Alert color='yellow' text='No contacts found' className='text-center'/>
    } else if (isError) {
        content = <Alert className='mt-2 text-center' color='red' text={JSON.stringify(error)} />
    }

    return (
        <div className="flex-[1_1_auto]">
            {content}
        </div>
    )
}

export default React.memo(List) as typeof List