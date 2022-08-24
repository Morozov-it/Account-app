import React from 'react'
import { sortSelect, orderSelect, limitSelect } from '../../constants'
import { Sort, Order, Limit } from '../../models'
import Filter from './Filter'
import PlainButton from './PlainButton'
import Search from './Search'
import Select from './Select'

interface Props {
    limit: Limit
    sort: Sort
    order: Order
    filter: [string, boolean][]
    onSearch: (q: string) => void
    onSortChange: (name: Sort) => void
    onOrderChange: (name: Order) => void
    onLimitChange: (n: Limit) => void
    onReset: () => void
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Toolbar: React.FC<Props> = ({
    limit,
    order,
    sort,
    filter,
    onSearch,
    onSortChange,
    onOrderChange,
    onLimitChange,
    onReset,
    onFilterChange,
}) => {
    return (
        <div className="w-full flex items-center gap-2">
            <Search
                onSearch={onSearch}
            />
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
            <Select<Limit>
                current={limit}
                values={limitSelect}
                lable='Limit'
                onChange={onLimitChange}
                width={15}
            />
            <Filter
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