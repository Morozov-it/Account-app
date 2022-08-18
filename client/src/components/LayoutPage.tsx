import React from 'react'

interface Props {
    title: string
    children?: React.ReactNode
}

const LayoutPage: React.FC<Props> = ({ title, children }) => {
    return (
        <section className='w-full h-full flex flex-col'>
            <header className="shadow w-full pt-16">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl tracking-tight font-bold text-gray-900 dark:text-slate-100">{title}</h1>
                </div>
            </header>
            <main className="flex-grow w-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </section>
    )
}

export default LayoutPage