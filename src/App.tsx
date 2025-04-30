import '@/assets/styles.css';
import '@/assets/fonts/fonts.css';
import Pyramid from '@/pages/pyramid';
import { useEffect, useRef, useState } from 'react';
import Entry from '@/pages/entry';
import Cards from '@/pages/cards';
import { cc } from '@/utils/cc';
import entryBgMusic from '@/assets/sounds/entry/background.mp3';
import cardsBgMusic from '@/assets/sounds/cards/background.mp3';
import pyramidBgMusic from '@/assets/sounds/pyramid/background.mp3';

type Page = 'cards' | 'pyramid' | 'entry';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('entry');
    const [isOpen, setIsOpen] = useState(false);
    const [hasWonBefore, setHasWonBefore] = useState(false);

    function showTransition() {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 1500);
    }

    function resetGame() {
        setCurrentPage('entry');
        setHasWonBefore(false);
    }

    const entryBgAudioRef = useRef(new Audio(entryBgMusic));
    const cardsBgAudioRef = useRef(new Audio(cardsBgMusic));
    const pyramidBgAudioRef = useRef(new Audio(pyramidBgMusic));

    function pauseAllBgMusic() {
        entryBgAudioRef.current.pause();
        entryBgAudioRef.current.currentTime = 0;

        cardsBgAudioRef.current.pause();
        cardsBgAudioRef.current.currentTime = 0;

        pyramidBgAudioRef.current.pause();
        pyramidBgAudioRef.current.currentTime = 0;
    }

    function playBgMusic() {
        entryBgAudioRef.current.loop = true;
        entryBgAudioRef.current.play();
        entryBgAudioRef.current.volume = 0.5;
    }

    useEffect(() => {
        pauseAllBgMusic();

        switch (currentPage) {
            case 'entry':
                entryBgAudioRef.current.loop = true;
                entryBgAudioRef.current.play();
                entryBgAudioRef.current.volume = 0.5;
                break;
            case 'cards':
                cardsBgAudioRef.current.loop = true;
                cardsBgAudioRef.current.play();
                cardsBgAudioRef.current.volume = 0.5;
                break;
            default:
                pyramidBgAudioRef.current.loop = true;
                pyramidBgAudioRef.current.play();
                pyramidBgAudioRef.current.volume = 0.5;
                break;
        }
    }, [currentPage]);

    switch (currentPage) {
        case 'entry':
            return (
                <div onClick={() => playBgMusic()} className={cc('overlay', isOpen ? 'open' : 'close')}>
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
                        resetGame={() => resetGame()}
                        showTransition={showTransition}
                        isFire={hasWonBefore}
                        handleDoubleBtnClick={() => {
                            showTransition();
                            setTimeout(() => {
                                setHasWonBefore(true);
                                setCurrentPage('cards');
                            }, 1500);
                        }}
                    />
                </div>
            );
        default:
            return (
                <div className={cc('overlay', isOpen ? 'open' : 'close')}>
                    <Cards
                        goToPyramid={() => setCurrentPage('pyramid')}
                        showTransition={showTransition}
                        hasWonBefore={hasWonBefore}
                        resetGame={() => resetGame()}
                        addWin={() => setHasWonBefore(true)}
                    />
                </div>
            );
    }
}

export default App;
