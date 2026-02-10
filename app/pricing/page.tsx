import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Pricing = () => {
    return (
        <div className='mt-20'>
            <h2 className='text-3xl font-bold my-5 text-center'>AI-Powered Trip Planning-Pick Your Plan </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                <PricingTable />
            </div>
        </div>
    )
}

export default Pricing