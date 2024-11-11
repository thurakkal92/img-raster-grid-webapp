import React from 'react';


/**
 * Renders the IconButton component.
 * @param will accept all the button properties.
 * @returns Rendered IconButton component.
 */

function IconButton(props) {
    const { children, ...otherProps } = props
    return (<button style={{ height: 40, width: 40 }} className='bg-transparent br-100 bn flex-inline flex-middle flex-center c-pointer hover:bg-grey-20 t-all' {...otherProps}>{children}</button>)
}
export default IconButton