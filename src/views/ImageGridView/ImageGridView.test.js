// ImageGridView.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageGridView from './index';
import { useCellContext } from '../../hooks/useCellContext';

jest.mock('../../hooks/useCellContext'); // Mock the context hook

describe('ImageGridView', () => {
    beforeEach(() => {
        // Mock context values
        useCellContext.mockReturnValue({
            cells: [
                { id: '1 - 1', row: 1, col: 1, name: 'Cell 1', active: true, hover: false },
                { id: '1 - 2', row: 1, col: 2, name: 'Cell 2', active: false, hover: false },
                { id: '1 - 3', row: 1, col: 3, name: 'Cell 3', active: true, hover: true },
                { id: '2 - 1', row: 2, col: 1, name: 'Cell 4', active: true, hover: false },
                { id: '2 - 2', row: 2, col: 2, name: 'Cell 5', active: true, hover: false },
                { id: '2 - 3', row: 2, col: 3, name: 'Cell 6', active: true, hover: false }
            ],
            columns: 3
        });
    });

    it('renders the main container and image correctly', () => {
        render(<ImageGridView />);

        // Check the image is rendered with correct props
        const image = screen.getByAltText('img-grid');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://picsum.photos/1000/1000');
    });

    it('renders cells based on context data', () => {
        render(<ImageGridView />);

        // Check that each cell is rendered correctly
        expect(screen.getByText('Cell 1')).toBeInTheDocument();
        expect(screen.getByText('Cell 2')).toBeInTheDocument();
        expect(screen.getByText('Cell 3')).toBeInTheDocument();
        expect(screen.getByText('Cell 4')).toBeInTheDocument();
        expect(screen.getByText('Cell 5')).toBeInTheDocument();
        expect(screen.getByText('Cell 6')).toBeInTheDocument();
    });

    it('applies the correct column class based on the number of columns', () => {
        render(<ImageGridView />);

        // colSpan should be calculated as Math.floor(24 / 3) = 8, so the class should be "col-8"
        const cellContainers = screen
            .getAllByText(/Cell/)
            .map(cell => cell.closest('div[data-testid="cell-wrapper"]'));
        cellContainers.forEach(container => {
            expect(container).toHaveClass('col-8');
        });
    });

    it('hides cells if they are inactive', () => {
        render(<ImageGridView />);

        // "Cell 2" should be inactive, so it should have "o-100" class in Cell
        const cell2 = screen.getByText('Cell 2');
        const cellWrapper = cell2.closest('div[data-testid="cell-wrapper"]');
        const cellOverlay = cellWrapper.querySelector('[data-testid="cell-overlay"]');
        expect(cellOverlay).toHaveClass('o-100');
    });

    it('adds hover style if hover is true', () => {
        render(<ImageGridView />);

        // "Cell 3" has hover: true, so it should have a o-0 class
        const cell3 = screen.getByText('Cell 3');
        const cellWrapper = cell3.closest('div[data-testid="cell-wrapper"]');
        const cellOverlay = cellWrapper.querySelector('[data-testid="cell-overlay"]');
        expect(cellOverlay).toHaveClass('o-0');
    });
});