import { cc } from '@/utils/cc';
import { useEffect, useMemo, useState } from 'react';
import background from '@/assets/images/cards/cards-bg.webp';
import Card from '@/components/card';
import CardMessage from '@/components/card-message';
import { getPlayingCards } from '@/utils/card-images';
import { useCardMessages } from '@/hooks/use-card-messages';

type CardsProps = {
    goToPyramid: () => void;
    goToEntry: () => void;
};
export default function Cards({ goToPyramid, goToEntry }: CardsProps) {
    const [isAppearing, setIsAppearing] = useState(true);
    const [flipAll, setFlipAll] = useState(false);
    const [canAnimate, setCanAnimate] = useState(true);
    const { win, lose, entry } = useCardMessages();
    const [message, setMessage] = useState(entry);
    const [resetCount, setResetCount] = useState(0);

    const [animatedCardIdx, setAnimatedCardIdx] = useState<number | null>(null);

    useEffect(() => {
        setTimeout(() => setAnimatedCardIdx(0), 4000);

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
        }, 850 * 6);

        return () => clearInterval(intervalId);
    }, [animatedCardIdx]);

    const { playingCards, displayCard } = useMemo(
        () => getPlayingCards(),
        [resetCount]
    );

    function handleSelection(selectedCardValue: number) {
        setCanAnimate(false);
        setAnimatedCardIdx(null);
        setTimeout(() => setFlipAll(true), 3000);
        setTimeout(() => setIsAppearing(false), 9500);

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
        }, 500);
    }

    function handleWin() {
        setTimeout(() => setMessage(win), 1000);
        setTimeout(() => {
            goToPyramid();
            reset();
        }, 9000);
    }

    function handleLose() {
        setTimeout(() => setMessage(lose), 1000);
        setTimeout(() => {
            goToEntry();
            reset();
        }, 9000);
    }

    return (
        <main
            className={cc(
                'h-202 mx-auto max-w-360 bg-no-repeat bg-cover pt-11',
                isAppearing ? 'appear' : 'disappear'
            )}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="w-252.5 mx-auto">
                <div className="flex items-center gap-11.5 h-92.25 mb-12.5">
                    <Card
                        key="display-card"
                        flipAll={true}
                        canAnimate={false}
                        value={displayCard}
                        shouldAnimate={false}
                        onClick={() => {}}
                        index={0}
                    />

                    <CardMessage message={message} />
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
