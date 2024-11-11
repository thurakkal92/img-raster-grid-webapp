import React from 'react';


/**
 * Renders the badge component to show the .
 * @param label - The text displayed in badge
 * @returns Rendered badge component
 */

function Badge({ label }) {
    return <div className='o-100 br-100 c-white py-1 px-2 fs-caption-2 fw-500 ta-center bg-grey-90'>{label}</div>;
}

export default Badge;
