import { useContext } from 'react'
import { CellContext } from '../context'

//custom hook to access CellContext data and it's functions

export const useCellContext = () => {
    return useContext(CellContext)
}