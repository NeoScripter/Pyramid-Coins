import { cc } from '@/utils/cc';
import { useState } from 'react';
import background from '@/assets/images/cards/cards-bg.webp';
import Card from '@/components/card';
import CardMessage from '@/components/card-message';

type CardsProps = {
    goToPyramid: () => void;
    goToEntry: () => void;
};
export default function Cards({ goToPyramid, goToEntry }: CardsProps) {
    const [isAppearing, setIsAppearing] = useState(true);
    const [flipAll, setFlipAll] = useState(false);
    const [canAnimate, setCanAnimate] = useState(true);
    const [message, setMessage] = useState('Пробей карту! Фарту масти!');

    function reset() {
        setFlipAll(false);
        setMessage('Пробей карту! Фарту масти!');

        setTimeout(() => {
            setCanAnimate(true);
        }, 500);
    }

    function handleWin() {
        setMessage('Красава! Мощная аура!');
        setTimeout(() => setIsAppearing(false), 4500);
        setTimeout(() => {
            goToPyramid();
            reset();
        }, 5000);
    }

    function handleLose() {
        setMessage('Ну вот, опять проиграл!');
        setTimeout(() => setIsAppearing(false), 4500);
        setTimeout(() => {
            goToEntry();
            reset();
        }, 5000);
    }

    const cardDeck = [3, 4, 5, 6];

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
                        key="preview-card"
                        flipAll={true}
                        canAnimate={false}
                        value={7}
                    />

                    <CardMessage message={message} />
                </div>

                <div className='text-white text-2xl flex items-center justify-center gap-5'>
                    <button onClick={handleWin}>Win</button>
                    <button onClick={handleLose}>Lose</button>
                </div>
                <div className="flex items-center justify-center gap-7">
                    {cardDeck.map((number) => (
                        <Card
                            key={`card-${number}`}
                            flipAll={flipAll}
                            canAnimate={canAnimate}
                            value={7}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
