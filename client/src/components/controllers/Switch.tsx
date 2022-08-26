import React from 'react'
import { Switch } from '@headlessui/react'
import { classNames } from '../../utils/classNames'

interface Props {
    checked: boolean
    onChange: () => void
    label?: string
    disabled?: boolean
}

const StyledSwitch: React.FC<Props> = ({ checked, onChange, label, disabled }) => {
    return (
        <Switch.Group>
            <div className="flex items-center">
                {label && <Switch.Label className="mr-1 font-medium">{label}</Switch.Label>}
                <Switch
                    disabled={disabled}
                    checked={checked}
                    onChange={onChange}
                    className={classNames(
                        checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-500',
                        'relative inline-flex h-6 w-11 items-center rounded-full')}
                    >
                    <span className="sr-only">{label}</span>
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

export default React.memo(StyledSwitch)