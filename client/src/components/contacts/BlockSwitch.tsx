import React from 'react'
import { Switch } from '@headlessui/react'
import { classNames } from '../../utils/classNames'

interface Props {
    checked: boolean
    onChange: () => void
}

const BlockSwitch: React.FC<Props> = ({ checked, onChange }) => {
    return (
        <Switch.Group>
            <div className="flex items-center">
                <Switch.Label className="mr-1 font-medium">blocked</Switch.Label>
                <Switch
                    checked={checked}
                    onChange={onChange}
                    className={classNames(
                        checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-500',
                        'relative inline-flex h-6 w-11 items-center rounded-full')}
                    >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={classNames(
                            checked ? 'translate-x-6' : 'translate-x-1',
                            'inline-block h-4 w-4 transform rounded-full bg-white'
                        )}
                    />
                </Switch>
            </div>
        </Switch.Group>
    )
}

export default React.memo(BlockSwitch)