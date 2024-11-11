import React from 'react';
import { render, screen } from '@testing-library/react';
import SidebarView from './index';
import { useCellContext } from '../../hooks/useCellContext';

// Mock the context hook
jest.mock('../../hooks/useCellContext');

describe('SidebarView', () => {
    beforeEach(() => {
        useCellContext.mockReturnValue({
            cells: [
                { id: '1 - 1', row: 1, col: 1, name: 'Cell 1', active: true, hover: false },
                { id: '1 - 2', row: 1, col: 2, name: 'Cell 2', active: false, hover: false },
                { id: '1 - 3', row: 1, col: 3, name: 'Cell 3', active: true, hover: true },
                { id: '2 - 1', row: 2, col: 1, name: 'Cell 4', active: true, hover: false },
                { id: '2 - 2', row: 2, col: 2, name: 'Cell 5', active: true, hover: false },
                { id: '2 - 3', row: 2, col: 3, name: 'Cell 6', active: true, hover: false }
            ],
            columns: 3,
            onClick: jest.fn(),
            onHover: jest.fn(),
            onRowHover: jest.fn(),
            onRowClick: jest.fn()
        });
    });

    it('renders the sidebar header correctly', () => {
        render(<SidebarView />);

        // Check that the header is rendered
        expect(screen.getByText('CELL LIST VIEW')).toBeInTheDocument();
    });

    it('renders rows and cells based on context data', () => {
        render(<SidebarView />);

        // Check that each row is rendered
        expect(screen.getByText('Row 1')).toBeInTheDocument();
        expect(screen.getByText('Row 2')).toBeInTheDocument();

        // Check that each cell is rendered inside its respective row
        expect(screen.getByText('Cell 1')).toBeInTheDocument();
        expect(screen.getByText('Cell 2')).toBeInTheDocument();
        expect(screen.getByText('Cell 3')).toBeInTheDocument();
        expect(screen.getByText('Cell 4')).toBeInTheDocument();
        expect(screen.getByText('Cell 5')).toBeInTheDocument();
        expect(screen.getByText('Cell 6')).toBeInTheDocument();
    });


    it('displays ToggleVisibility icon correctly based on cell active status', () => {
        render(<SidebarView />);

        // Check that ToggleVisibility shows the correct status
        const cell2 = screen.getByText('Cell 2');
        const cell2Wrapper = cell2.closest('li[data-testid="list-item"]');
        const cell2Toggle = cell2Wrapper.querySelector('svg');

        // Check that ToggleVisibility shows the correct status
        const cell3 = screen.getByText('Cell 3');
        const cell3Wrapper = cell3.closest('li[data-testid="list-item"]');
        const cell3Toggle = cell3Wrapper.querySelector('svg');

        expect(cell2Toggle).toHaveAttribute('data-testid', 'toggle-hide');
        expect(cell3Toggle).toHaveAttribute('data-testid', 'toggle-visible');

    });

});