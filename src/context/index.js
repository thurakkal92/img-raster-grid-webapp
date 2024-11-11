import { createContext, useState } from 'react'
import { createCells } from '../utils'

export const CellContext = createContext([ [], () => { } ])


/**
 * The GlobalContext provider for the application. 
 * It holds the entire cell data
 * It connects the Sidebar view and Image grid view.
 * 
 *
 * @returns cells, onClick, onHover, onRowHover, onRowClick, rows and columns.
 */

export const CellContextProvider = ({ rows, columns, children }) => {
    const [ cells, setCells ] = useState(createCells(rows, columns))

    function onClick(id) {
        setCells((prevState) =>
            prevState.map((cell, i) =>
                cell.id === id ? { ...cell, active: !cell.active } : cell
            )
        );
    }

    function onHover(id) {
        setCells((prevState) =>
            prevState.map((cell, i) => ({ ...cell, hover: cell.id === id }))
        );
    }

    function onRowHover(row) {

        console.log(row, 'row')
        setCells((prevState) =>
            prevState.map((cell, i) => ({ ...cell, hover: cell.row === parseInt(row) }))
        );
    }

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
        onClick,
        onHover,
        onRowHover,
        onRowClick,
    };

    return <CellContext.Provider value={value}>{children}</CellContext.Provider>;

}