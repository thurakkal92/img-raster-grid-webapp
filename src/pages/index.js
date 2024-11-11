import React from 'react';
import ImageGridView from '../views/ImageGridView';
import Header from '../components/header';
import Sidebar from '../views/SidebarView';
import { CellContextProvider } from '../context'


/**
 * Renders the Page component (entry).
 * Content wrapped inside CellContextProvider
 * @returns Rendered Page component with complete UI
 */

function Page() {
    return (
        // Any grid value (n x m) can be added here
        // Currently 2 x 3 is added
        <CellContextProvider rows={2} columns={3}>
            <Header />
            <main role='main' className='bg-grey-05 flex' style={{ minHeight: 'calc(-44px + 100vh)' }}>
                <Sidebar />
                <ImageGridView />
            </main>
            <footer></footer>
        </CellContextProvider>

    )
}

export default Page