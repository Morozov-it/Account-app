import React from 'react'
import LayoutPage from '../components/LayoutPage'

const Home: React.FC = () => {
    return (
        <LayoutPage title='About application'>
            <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
        </LayoutPage>
    )
}

export default Home