import React from 'react'
import { sortSelect, orderSelect, limitSelect } from '../../constants'
import { Sort, Order, Limit } from '../../models'
import { Filter, Search, Select, Button } from '../controllers'

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
    onCreate: () => void
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
    onCreate,
    onFilterChange,
}) => {
    console.log('toolbar')
    
    return (
        <div className="w-full flex items-center flex-wrap md:flex-nowrap gap-2">
            <Search onSearch={onSearch} />
            <div className='flex items-center justify-between flex-wrap sm:flex-nowrap gap-2'>
                <Select<Sort>
                    current={sort}
                    values={sortSelect}
                    lable='Sort'
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
                <Button onClick={onReset}>
                    Reset
                </Button>
                <Button onClick={onCreate}>
                    Create
                </Button>
            </div>
        </div>
    )
}

export default React.memo(Toolbar)