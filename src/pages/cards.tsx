import { cc } from '@/utils/cc';
import { useEffect, useMemo, useState } from 'react';
import background from '@/assets/images/cards/cards-bg.webp';
import Card from '@/components/card';
import CardMessage from '@/components/card-message';
import { getPlayingCards } from '@/utils/card-images';
import { useCardMessages } from '@/hooks/use-card-messages';
import winSound from '@/assets/sounds/win-sound.mp3';
import loseSound from '@/assets/sounds/lose-sound.mp3';
import CardBtns from '@/components/card-btns';

type CardsProps = {
    goToPyramid: () => void;
    goToEntry: () => void;
    goToPyramidFire: () => void;
    showTransition: () => void;
};

const TRANSITION_DELAY = 9000;

export default function Cards({
    goToPyramid,
    goToEntry,
    goToPyramidFire,
    showTransition,
}: CardsProps) {
    const [flipAll, setFlipAll] = useState(false);
    const [canAnimate, setCanAnimate] = useState(false);
    const { win, lose, entry } = useCardMessages();
    const [message, setMessage] = useState(entry);
    const [resetCount, setResetCount] = useState(0);
    const [showBtnGroup, setShowBtnGroup] = useState(false);
    const [hasWonBefore, setHasWonBefore] = useState(false);

    const [animatedCardIdx, setAnimatedCardIdx] = useState<number | null>(null);

    useEffect(() => {
        setTimeout(() => setAnimatedCardIdx(0), 850 * 4);

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
        }, 850 * 4);

        return () => clearInterval(intervalId);
    }, [animatedCardIdx]);

    useEffect(() => {
        setTimeout(() => setCanAnimate(true), 850 * 4);
    }, []);

    const { playingCards, displayCard } = useMemo(
        () => getPlayingCards(),
        [resetCount]
    );

   /*  const playingCards = [5,6,7,8];
    const displayCard = 2;
 */
    function handleSelection(selectedCardValue: number) {
        setCanAnimate(false);
        setAnimatedCardIdx(null);
        setTimeout(() => setFlipAll(true), 3000);

        if (selectedCardValue < displayCard) {
            setTimeout(() => showTransition(), TRANSITION_DELAY - 1500);
            handleLose();
        } else if (hasWonBefore) {
            setTimeout(() => {
                setMessage(win);
                const audio = new Audio(winSound);
                audio.volume = 0.25;
                audio.play();
            }, 1000);
            handleSuperWin();
        } else {
            setTimeout(() => {
                setMessage(win);
                const audio = new Audio(winSound);
                audio.volume = 0.25;
                audio.play();
                setHasWonBefore(true);
            }, 1000);
            setTimeout(() => setShowBtnGroup(true), TRANSITION_DELAY - 4000);
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

    function handleWin() {
        setTimeout(() => {
            goToPyramid();
            reset();
            setHasWonBefore(false);
        }, 1500);
        showTransition();
    }

    function handleSuperWin() {
        setTimeout(() => {
            goToPyramidFire();
            reset();
            setHasWonBefore(false);
        }, TRANSITION_DELAY - 2500);
        setTimeout(() => showTransition(), TRANSITION_DELAY - 4000)
    }

    function handleLose() {
        setTimeout(() => {
            setMessage(lose);
            const audio = new Audio(loseSound);
            audio.play();
        }, 1000);
        setTimeout(() => {
            goToEntry();
            reset();
        }, TRANSITION_DELAY);
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
                        <CardBtns isOpen={showBtnGroup} handleWin={handleWin} reset={() => setTimeout(() => reset(), 700)} />
                    </div>
                </div>

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
            </div>
        </main>
    );
}
