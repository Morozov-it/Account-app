import React from 'react'
import { LayoutPage } from '../components'

const Home: React.FC = () => {
    return (
        <LayoutPage title='About application'>
            <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-2">
                    <h3 className='text-xl'>This is a real web application, needed for booking and storing your favourite contacts.</h3>
                    <h2>To start using the app, please registered a new account, and/or log in to the app.</h2>
                    <p>Then you have a possibiliti to change your credentials (for example name, email etc.) in setting page.</p>
                    <p>In contacts page you have a full CRUD operations for managing, searching, sorting and filtering your personal contact list.</p>
                    <p>By default enable system theme, but you may toggle dark or light theme.</p>
                </div>
            </div>
        </LayoutPage>
    )
}

export default Home