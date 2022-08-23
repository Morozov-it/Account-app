import React from 'react'
import { sortSelect } from '../../constants'
import { Sort, SortSelect, Contact, Order } from '../../models'
import PlainButton from './PlainButton'
import RadioGroup from './RadioGroup'
import Select from './Select'

interface Props {
    limit: number
    sort: keyof Contact
    order: Order
    search: string | null
    onSortChange: (name: keyof Contact) => void
}

const Toolbar: React.FC<Props> = ({ limit, order, search, sort, onSortChange }) => {
    
    return (
        <div className="w-full flex items-end gap-2">
            <div className="flex-[1_1_auto] flex flex-col">
                <input
                    type="text"
                    id="name"
                    placeholder="search..."
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                />
            </div>
            <Select<Sort, SortSelect>
                current={sort}
                values={sortSelect}
                lable='Sort by'
                onChange={onSortChange}
            />
            
            <RadioGroup />
            <div>
                <PlainButton>
                    Reset
                </PlainButton>
            </div>
        </div>
    )
}

export default React.memo(Toolbar)