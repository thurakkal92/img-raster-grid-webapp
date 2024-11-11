import React from 'react';
import Cell from '../../components/Cell';
import { useCellContext } from '../../hooks/useCellContext';
import Image from '../../components/Image';

/**
 * Renders Image grid view 
 * Image and overlayed grid over it
 * Read cells and columns count from CellContext
 * Used a random image, refresh to see different images.
 * 
 * @returns Rendered image and Overlayed cells. 
 */

function ImageGridView() {

    const { cells, columns } = useCellContext()
    //To get the colSpan according to the number of columns entered
    function getColClass() {
        const colSpan = Math.floor(24 / columns);
        return `col-${colSpan}`
    }

    return (
        <div className='container'>
            <div className='elevation-1 p-4 br-4 bg-white mt-15'>
                <div className='bg-neutral-0 br-2 o-hidden p-relative' style={{ height: 400, width: 600 }}>
                    <Image className='br-1' src='https://picsum.photos/1000/1000' height={400} width={600} alt='img-grid' />
                    {/* Image overlay goes here */}
                    <div className='p-absolute t-0 l-0 h-100p w-100p'>
                        <div className='flex h-100p flex-wrap'>
                            {cells.map((cell, idx) => {
                                return (
                                    <div data-testid='cell-wrapper' className={`p-relative ${getColClass()} ba bw-2 bc-white t-all`} key={idx} style={{ padding: 0 }}>
                                        <Cell selected={cell.active} hide={!cell.active} hover={cell.hover} key={cell.id} label={cell.name} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ImageGridView;
