import React, { useState } from 'react';
import ListItem from '../../components/ListItem';
import ToggleVisibility from '../../components/ToggleVisibility';
import Tree from '../../components/Tree';
import { useCellContext } from '../../hooks/useCellContext';

/**
 * Sidebar view
 * @returns HTML for the rows and cells in a tree view
 */

function SidebarView() {

    //Reads useful information from the custom hook useCellContext.
    const { cells, onCellClick, onCellHover, onRowHover, onRowClick } = useCellContext();


    //Group cells per rows for the Tree
    const rows = cells.reduce((acc, cell) => {
        if (!acc[ cell.row ]) acc[ cell.row ] = [];
        acc[ cell.row ].push(cell);
        return acc;
    }, {});

    //Group cells per rows for the Tree
    const [ expandedRows, setExpandedRows ] = useState(rows);

    // Toggle row expansion
    const toggleRow = (rowIndex) => {
        setExpandedRows((prev) => ({
            ...prev,
            [ rowIndex ]: !prev[ rowIndex ],
        }));
        onRowClick(rowIndex);
    };


    return (
        <div
            className='pt-4 br bc-grey-10 h-100p bg-white p-sticky t-0'
            style={{ width: '260px', minHeight: 'calc(100vh - 44px)' }}
        >
            <h2 className='py-3 px-5 mt-2 fw-600 tt-uppercase ls-wide fs-1'>CELL LIST VIEW</h2>
            {Object.keys(rows).map((row, rowIdx) => (
                <Tree
                    data-testid='list-view-tree'
                    key={rowIdx}
                    onClick={() => toggleRow(row)}
                    active={expandedRows[ row ]}
                    onMouseEnter={() => {
                        onRowHover(row);
                    }}
                    onMouseLeave={() => onRowHover(null)}
                    label={<span>Row {row}</span>}
                >
                    {expandedRows[ row ] &&
                        rows[ row ].map((cell, idx) => (
                            <ListItem
                                onClick={() => onCellClick(cell.id)}
                                onMouseEnter={() => onCellHover(cell.id)}
                                onMouseLeave={() => onCellHover(null)}
                                key={cell.id}
                                data-testid='list-item'
                                endIcon={
                                    <ToggleVisibility data-testid={cell.active ? 'toggle-visible' : 'toggle-hide'} isVisible={cell.active} />
                                }
                                label={cell.name}
                            />
                        ))}
                </Tree>
            ))}
        </div>
    );
}

export default SidebarView;
