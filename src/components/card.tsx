import { cc } from '@/utils/cc';
import { useMemo, useState } from 'react';
import back from '@/assets/images/cards/card-back.webp';
import { getCardImage } from '@/utils/card-images';

type CardProps = {
    value: number;
    flipAll: boolean;
    canAnimate: boolean;
    shouldAnimate: boolean;
    onClick: () => void;
};
export default function Card({ value, flipAll, canAnimate, shouldAnimate, onClick }: CardProps) {
    const [shouldFlip, setShouldFlip] = useState(false);

    const cardImage = useMemo(() => getCardImage(value), [value]);


    function handleClick() {
        if (canAnimate === false) return;

        setShouldFlip((o) => !o);
        onClick();
    }

    return (
        <div
            onClick={handleClick}
            className={cc(
                'group perspective w-45.5 h-59.25 overflow-clip transition-scale duration-250 ease-in hover:scale-130',
                canAnimate &&
                    shouldFlip === false &&
                    shouldAnimate &&
                    'hover:z-20 not-hover:z-10 card-pulse cursor-pointer'
            )}
        >
            <div
                className={cc(
                    'relative w-full h-full transition-transform duration-1250 preserve-3d',
                    shouldFlip || flipAll ? 'rotate-y-180' : 'rotate-y-360',
                    canAnimate && 'cursor-pointer'
                )}
            >
                {/* Back Face */}
                <div className="absolute inset-0 h-full w-full z-10 backface-hidden rotate-y-180">
                    <img
                        src={cardImage}
                        alt="Card"
                        className="object-center object-contain w-full h-full"
                    />
                </div>
                {/* Front Face */}
                <div
                    className={cc(
                        'absolute inset-0 h-full w-full backface-hidden'
                    )}
                >
                    <img
                        src={back}
                        alt="Card"
                        className="object-center object-contain w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}
