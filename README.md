# Web Application for Image and Raster Interaction

This project is a web application built with React, designed to display a static image overlaid with a customizable raster grid. The application enables users to interact with individual grid cells via a vertical list view, allowing them to toggle cell visibility on the image.

## Available Scripts

In the project directory, you can run:

### `npm install`

To install the dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

To run the unit test

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Styling Approach - Utility-First Design

The application follows a utility-first approach for styling, using reusable CSS classes generated through Sass configuration. The classes are generated based on the pre-defined Sass configuration (theme) using Sass generators.

### Sample configuration

```css

path: src/styles/scss/config/config.scss

$config: (
  "spacers": (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15),
  "typography": ("fontFamily": ("sans": ("-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        sans-serif,
      ),
      "serif": ("Georgia",
        "Times New Roman",
        "Times",
        serif,
      ),
      "mono": ("SFMono-Regular",
        "Consolas",
        "Liberation Mono",
        "Menlo",
        "Courier",
        monospace,
      ),
    ),
    ...

```

### SASS Generators

Sass generators are configured to create CSS classes automatically. The generator configuration is found here:

```css

path: src/styles/scss/generators/generators.scss

@each $color, $value in config("colors") {
  .c-#{$color} {
    color: $value;
  }
  .hover\:c-#{$color} {
    &:hover {
      color: $value;
    }
  }
  .group-hover\:c-#{$color} {
    .group:hover & {
      color: $value;
    }
  }

```

This will generate the css classes which is finally imported in `App.scss`.

### Utility usage

```javascript
function Badge({ label }) {
	return <div className='o-100 br-100 c-white py-1 px-2 fs-caption-2 fw-500 ta-center bg-grey-90'>{label}</div>;
}

export default Badge;
```

## Code structure

The code is organized as follows:

```javascript

1. components - // All the UI components (atoms)
2. styles - // All the CSS utilities
3. context - // Context provider
4. views - // Here adding two views. 1. ListView and 2. ImageGrid view. Which can be independently used.
5. utils - // Holds all the util funtions.
6. pages - // Main application pages
7. assets - //SVG icons used in the application

```

## Interaction logic

Interaction logic is defined inside the ContextProvider and is accessible across the application.

```javascript
export const CellContextProvider = ({ rows, columns, children }) => {
	const [cells, setCells] = useState(createCells(rows, columns));

	// onCellClick - Individual list items in a row. It will show/hide the cells on the image.
	// depends on the active state of the perticular cell, it will toggle the grid.

	function onCellClick(id) {
		setCells((prevState) => prevState.map((cell, i) => (cell.id === id ? { ...cell, active: !cell.active } : cell)));
	}

	// onCellHover - Individual list items in a row. It will highlight the cells on the image.
	// depends on the hover value `true/false` of the perticular cell, it will highligt the grid.

	function onCellHover(id) {
		setCells((prevState) => prevState.map((cell, i) => ({ ...cell, hover: cell.id === id })));
	}

	// onRowHover - To hover the entire row. It is triggered from the TreeView.
	// Updates the hover states of all the cells in a row.

	function onRowHover(row) {
		setCells((prevState) => prevState.map((cell, i) => ({ ...cell, hover: cell.row === parseInt(row) })));
	}

	// onRowClick - To click the entire row. It is triggered from the TreeView.
	// Updates the active states of all the cells in a row.

	function onRowClick(row) {
		setCells((prevState) =>
			prevState.map((cell, i) => (cell.row === parseInt(row) ? { ...cell, active: !cell.active } : cell))
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
};
```

## Unit test added

```javascript
path: src / views / ImageGridView / ImageGridView.test.js;
path: src / views / SidebarView / SidebarView.test.js;

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
    ...
```

## Configurable n x m grid support

Any n x m grid can be added here. Depends on the rows and columns entered, it will generate n x m grid overlay over the image.

```javascript
<CellContextProvider rows={2} columns={3}>
	<Header />
	<main role='main' className='bg-grey-05 flex' style={{ minHeight: 'calc(-44px + 100vh)' }}>
		<Sidebar />
		<ImageGridView />
	</main>
	<footer></footer>
</CellContextProvider>
```

```javascript
export const createCells = (rows, columns) => {
	let cells = [];
	let cellNum = 1;

	// Simple for loop to create cells depends on the rows and columns entered
	for (let row = 1; row <= rows; row++) {
		for (let col = 1; col <= columns; col++) {
			cells.push({
				id: `${row} - ${col}`,
				row,
				col,
				name: `Cell ${cellNum}`, // Use the counter for the name
				active: true,
				hover: false,
			});

			cellNum++; // Increment the counter for the next cell
		}
	}

	return cells;
};
```
