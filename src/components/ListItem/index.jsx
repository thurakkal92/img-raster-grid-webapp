import React from 'react';
import classnames from 'classnames'

/**
 * Renders ListItem component for the sidebar list view.
 * @param endIcon, startIcon, selected, label
 * @returns Rendered ListItem component
 */


function ListItem(props) {
    const { endIcon, startIcon, selected, label, ...otherProps } = props
    const listClassName = classnames('ls-none flex flex-middle flex-between fs-body-2 p-3 br-4 c-pointer t-all hover:bg-grey-10', {
        'bg-success-light hover:bg-success-light': selected
    })
    return (
        <li style={{ height: 24 }} className={listClassName} {...otherProps}>
            <div className='flex flex-middle'>
                {startIcon &&
                    <div style={{ height: 24, width: 24 }}>
                        <div className='pr-3' />
                        {startIcon}
                    </div>
                }

                <div className='fs-body-2'>{label}</div>
            </div>

            {endIcon && (
                <div>
                    <div className='pr-3' />
                    {endIcon}
                </div>
            )}


        </li>
    )
}

export default ListItem