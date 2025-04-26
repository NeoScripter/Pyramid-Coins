import '@/assets/styles.css';
import '@/assets/fonts/fonts.css';
import Pyramid from '@/pages/pyramid';
import { useState } from 'react';
import Entry from '@/pages/entry';
import Cards from '@/pages/cards';

type Page = 'cards' | 'pyramid' | 'entry';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('entry');

    switch (currentPage) {
        case 'entry':
            return <Entry handleNoRefClick={() => setCurrentPage('pyramid')} handleRefClick={() => setCurrentPage('cards')} />;
        case 'pyramid':
            return <Pyramid resetGame={() => setCurrentPage('entry')} />;
        default:
            return <Cards goToPyramid={() => setCurrentPage('pyramid')} goToEntry={() => setCurrentPage('entry')} />;
    }
}

export default App;
