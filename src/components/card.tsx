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
    index: number;
};
export default function Card({ value, flipAll, canAnimate, shouldAnimate, onClick, index }: CardProps) {
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
                'group perspective w-45.5 h-59.25 transition-scale duration-250 ease-in',
                canAnimate &&
                    shouldFlip === false &&
                    shouldAnimate &&
                    'hover:z-20 not-hover:z-10 card-pulse cursor-pointer', (!flipAll && canAnimate) && 'hover:scale-130', shouldFlip && 'scale-120'
            )}
            style={{ '--index': index } as React.CSSProperties}
        >
            <div
                className={cc(
                    'relative w-full h-full transition-transform column-animation duration-1250 preserve-3d',
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
