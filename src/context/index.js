import { createContext, useState } from 'react'
import { createCells } from '../utils'

export const CellContext = createContext([ [], () => { } ])


/**
 * The GlobalContext provider for the application. 
 * It holds the entire cell data
 * It connects the Sidebar view and Image grid view.
 * 
 *
 * @returns Updated `cells` state. 
 */

export const CellContextProvider = ({ rows, columns, children }) => {
    const [ cells, setCells ] = useState(createCells(rows, columns))

    // onCellClick - Individual list items in a row. It will show/hide the cells on the image. 
    // depends on the active state of the perticular cell, it will toggle the grid. 

    function onCellClick(id) {
        setCells((prevState) =>
            prevState.map((cell, i) =>
                cell.id === id ? { ...cell, active: !cell.active } : cell
            )
        );
    }

    // onCellHover - Individual list items in a row. It will highlight the cells on the image. 
    // depends on the hover value `true/false` of the perticular cell, it will highligt the grid. 

    function onCellHover(id) {
        setCells((prevState) =>
            prevState.map((cell, i) => ({ ...cell, hover: cell.id === id }))
        );
    }

    // onRowHover - To hover the entire row. It is triggered from the TreeView.
    // Updates the hover states of all the cells in a row.

    function onRowHover(row) {
        setCells((prevState) =>
            prevState.map((cell, i) => ({ ...cell, hover: cell.row === parseInt(row) }))
        );
    }


    // onRowClick - To click the entire row. It is triggered from the TreeView.
    // Updates the active states of all the cells in a row.

    function onRowClick(row) {
        setCells((prevState) =>
            prevState.map((cell, i) =>
                cell.row === parseInt(row) ? { ...cell, active: !cell.active } : cell
            )
        );
    }

    // To Access cell data through context at both list view and Image grid view

    const value = {
        columns,
        rows,
        cells,
        onCellClick,
        onCellHover,
        onRowHover,
        onRowClick,
    };

    return <CellContext.Provider value={value}>{children}</CellContext.Provider>;

}