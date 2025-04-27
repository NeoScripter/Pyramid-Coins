import '@/assets/styles.css';
import '@/assets/fonts/fonts.css';
import Pyramid from '@/pages/pyramid';
import { useState } from 'react';
import Entry from '@/pages/entry';
import Cards from '@/pages/cards';
import { cc } from '@/utils/cc';

type Page = 'cards' | 'pyramid' | 'entry';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('entry');
    const [isOpen, setIsOpen] = useState(false);

    function showTransition() {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 1500);
    }

    switch (currentPage) {
        case 'entry':
            return (
                <div className={cc('overlay', isOpen ? 'open' : 'close')}>
                    <Entry
                        handleNoRefClick={() => setCurrentPage('cards')}
                        handleRefClick={() => setCurrentPage('pyramid')}
                        showTransition={showTransition}
                    />
                </div>
            );
        case 'pyramid':
            return (
                <div className={cc('overlay', isOpen ? 'open' : 'close')}>
                    <Pyramid
                        resetGame={() => setCurrentPage('entry')}
                        showTransition={showTransition}
                    />
                </div>
            );
        default:
            return (
                <div className={cc('overlay', isOpen ? 'open' : 'close')}>
                    <Cards
                        goToPyramid={() => setCurrentPage('pyramid')}
                        goToEntry={() => setCurrentPage('entry')}
                        showTransition={showTransition}
                    />
                </div>
            );
    }
}

export default App;
