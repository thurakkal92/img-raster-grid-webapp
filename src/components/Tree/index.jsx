import React from 'react';
import ListItem from '../ListItem';
import { ReactComponent as DownChevron } from '../../assets/down-chevron.svg';
import { ReactComponent as UpChevron } from '../../assets/up-chevron.svg';
import { Collapse } from '../Collapse';
import ToggleVisibility from '../ToggleVisibility';


/**
 * Renders Tree component to group the cells in side a row tree structure.
 * @param label, active...
 * @returns Rendered Tree component with listItems as it's children
 */

function Tree(props) {
    const { label, active = true, onClick, onMouseEnter, onMouseLeave, children, ...otherProps } = props

    return (
        <div {...otherProps}>
            <ListItem onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} active={active} endIcon={<ToggleVisibility isVisible={active} />} startIcon={active ? <UpChevron /> : <DownChevron />} label={label} />
            <Collapse pose={active ? 'open' : 'collapsed'}>
                <div className='pl-6'>
                    {children}
                </div>
            </Collapse>
            <div className='mt-4' />
        </div>
    )
}

export default Tree