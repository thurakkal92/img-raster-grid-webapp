import React from 'react';
import Badge from '../Badge';
import classnames from "classnames"

/**
 * Renders overlayed cell over the rendered image.
 * @param hide, selected, hover, label
 * @returns Rendered Cell component depends on the input params.
 */

function Cell(props) {
    const { hide, selected, hover, label, ...otherProps } = props;
    const cellClassName = classnames('fs-body-2 fw-600 flex bg-white flex-center flex-middle h-100p w-100p', {
        'o-100': hide,
        'o-0': hover && selected,
        'o-40': !hide && !hover
    })

    return (
        <>
            <div className={cellClassName} data-testid='cell-overlay' {...otherProps} />
            <div className='p-absolute b-4 r-4 o-100'>
                <Badge label={label} />
            </div>
        </>

    );
}

export default Cell;
