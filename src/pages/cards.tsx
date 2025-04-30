import { cc } from '@/utils/cc';
import { useEffect, useMemo, useState } from 'react';
import background from '@/assets/images/cards/cards-bg.webp';
import Card from '@/components/card';
import CardMessage from '@/components/card-message';
import { getPlayingCards } from '@/utils/card-images';
import { useCardMessages } from '@/hooks/use-card-messages';
import winSound from '@/assets/sounds/cards/win.wav';
import loseSound from '@/assets/sounds/cards/lose.wav';
import CardBtns from '@/components/card-btns';
import { playAudio } from '@/utils/play-audio';
import shuffleSound from '@/assets/sounds/cards/shuffle.wav';

type CardsProps = {
    goToPyramid: () => void;
    showTransition: () => void;
    hasWonBefore: boolean;
    resetGame: () => void;
    addWin: () => void;
};

const TRANSITION_DELAY = 9000;
const ANIMATION_DELAY = 850 * 4;

export default function Cards({
    goToPyramid,
    showTransition,
    hasWonBefore,
    resetGame,
    addWin,
}: CardsProps) {
    const [flipAll, setFlipAll] = useState(false);
    const [canAnimate, setCanAnimate] = useState(false);
    const { win, lose, entry } = useCardMessages();
    const [message, setMessage] = useState(entry);
    const [resetCount, setResetCount] = useState(0);
    const [showBtnGroup, setShowBtnGroup] = useState(false);
    const [showCards, setShowCards] = useState(true);

    const [animatedCardIdx, setAnimatedCardIdx] = useState<number | null>(null);

    useEffect(() => {
        playShuffleSound();
    }, []);

    function playShuffleSound() {
        let baseTimeout = 250;
        setTimeout(() => playAudio(shuffleSound), baseTimeout += 750);
        setTimeout(() => playAudio(shuffleSound), baseTimeout += 750);
        setTimeout(() => playAudio(shuffleSound), baseTimeout += 750);
        setTimeout(() => playAudio(shuffleSound), baseTimeout);
    }

    useEffect(() => {
        setTimeout(() => setAnimatedCardIdx(0), ANIMATION_DELAY);

        const intervalId = setInterval(() => {
            if (animatedCardIdx != null) {
                setAnimatedCardIdx((prev) => {
                    let newIdx = prev;

                    while (newIdx === prev) {
                        newIdx = Math.floor(Math.random() * 4);
                    }

                    return newIdx;
                });
            }
        }, ANIMATION_DELAY);

        return () => clearInterval(intervalId);
    }, [animatedCardIdx]);

    useEffect(() => {
        setTimeout(() => setCanAnimate(true), ANIMATION_DELAY);
    }, []);

    const { playingCards, displayCard } = useMemo(
        () => getPlayingCards(),
        [resetCount]
    );

    /* const playingCards = [5, 6, 7, 8];
    const displayCard = 2; */

    function handleSelection(selectedCardValue: number) {
        setCanAnimate(false);
        setAnimatedCardIdx(null);
        setTimeout(() => setFlipAll(true), 3000);

        if (selectedCardValue < displayCard) {
            handleLose();
        } else {
            handleWin();
        }
    }

    function reset() {
        setFlipAll(false);
        setMessage(entry);

        setTimeout(() => {
            setCanAnimate(true);
            setResetCount((prev) => prev + 1);
            setAnimatedCardIdx(0);
            setShowBtnGroup(false);
        }, 500);
    }

    function stopGame() {
        showTransition();
        setTimeout(() => {
            resetGame();
            reset();
        }, 1500);
    }

    function moveToPyramid() {
        setTimeout(() => {
            goToPyramid();
            reset();
        }, 1500);
        showTransition();
    }

    function handleWin() {
        setTimeout(() => {
            setMessage(win);
            playAudio(winSound, true);
        }, 1000);
        if (hasWonBefore) {
            setTimeout(() => moveToPyramid(), TRANSITION_DELAY - 4000);
        } else {
            addWin();
            setTimeout(() => setShowBtnGroup(true), TRANSITION_DELAY - 4000);
        }
    }

    function reshuffleCards() {
        setShowCards(false);
        setTimeout(() => {
            reset();
            playShuffleSound();
            setShowCards(true);
        }, 700);
    }

    function handleDouble() {
        reshuffleCards();
    }

    function handleLose() {
        setTimeout(() => {
            setMessage(lose);
            playAudio(loseSound);
        }, 1000);
        setTimeout(() => stopGame(), TRANSITION_DELAY - 3000);
    }

    return (
        <main
            className={cc(
                'h-202 mx-auto w-full max-w-360 bg-no-repeat bg-cover pt-11'
            )}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="w-300 mx-auto">
                <div className="flex items-center justify-center gap-11.5 h-92.25 mb-12.5">
                    <div className="basis-72.5">
                        <Card
                            key="display-card"
                            flipAll={true}
                            canAnimate={false}
                            value={displayCard}
                            shouldAnimate={false}
                            onClick={() => {}}
                            index={0}
                            className="ml-auto"
                        />
                    </div>

                    <CardMessage message={message} />

                    <div className="basis-72.5">
                        <CardBtns
                            isOpen={showBtnGroup}
                            handleReset={stopGame}
                            handleDouble={handleDouble}
                        />
                    </div>
                </div>

                {showCards && (
                    <div className="flex items-center justify-center gap-7 card-animation">
                        {playingCards.map((number, idx) => (
                            <Card
                                key={`card-${number}`}
                                flipAll={flipAll}
                                canAnimate={canAnimate}
                                value={number}
                                shouldAnimate={animatedCardIdx === idx}
                                onClick={() => handleSelection(number)}
                                index={idx}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
