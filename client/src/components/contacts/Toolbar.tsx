import React from 'react'
import { sortSelect, orderSelect } from '../../constants'
import { Sort, Order, Group, FilterType,  } from '../../models'
import Filter from './Filter'
import PlainButton from './PlainButton'
import Select from './Select'

interface Props {
    limit: number
    sort: Sort
    order: Order
    search: string | null
    filter: Array<FilterType<Group>>
    onSortChange: (name: Sort) => void
    onOrderChange: (name: Order) => void
    onReset: () => void
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Toolbar: React.FC<Props> = ({
    limit,
    order,
    search,
    sort,
    filter,
    onSortChange,
    onOrderChange,
    onReset,
    onFilterChange,
}) => {
    return (
        <div className="w-full flex items-end gap-2">
            <div className="">
                <input
                    type="text"
                    id="name"
                    placeholder="search..."
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                />
            </div>
            <Select<Sort>
                current={sort}
                values={sortSelect}
                lable='Sort by'
                onChange={onSortChange}
                width={20}
            />
            <Select<Order>
                current={order}
                values={orderSelect}
                lable='Order'
                onChange={onOrderChange}
                width={15}
            />
            <Filter<Group>
                lable='Group'
                values={filter}
                onChange={onFilterChange}
                width={10}
            />
            <div>
                <PlainButton onClick={onReset}>
                    Reset
                </PlainButton>
            </div>
        </div>
    )
}

export default React.memo(Toolbar)