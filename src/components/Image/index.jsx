import React, { useState } from 'react';


/**
 * Renders Image component
 * @param src, alt, style props
 * @returns Rendered an Image if it's fully loaded else a div with grey bgcolor.
 */

function Image(props) {
    const { src, alt, height, width, ...otherProps } = props
    const [ loaded, setLoaded ] = useState(false);

    return (
        <div className='p-relative'>
            {!loaded && (
                <div className='p-absolute w-100p h-100p t-0 l-0 bg-grey-20' />
            )}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                style={{
                    display: loaded ? 'block' : 'none',
                    width: width || '100%',
                    height: height || 'auto'
                }}
                {...otherProps}
            />

        </div>

    )

}

export default Image