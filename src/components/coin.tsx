import Bg from '@/assets/images/coin-bg.webp';
import { CoinType } from '@/types/coins';
import goldenCoin from '@/assets/images/golden.webp';
import silverCoin from '@/assets/images/silver.webp';
import bronzeCoin from '@/assets/images/bronze.webp';
import { useEffect, useState } from 'react';
import { cc } from '@/utils/cc';

type CoinProps = {
    value: CoinType;
    digit: number;
    flipAll: boolean;
    animateCoinFlight: (left: number, top: number, image: string) => void;
    canAnimate: boolean;
    blockAnimation: () => void;
};

export default function Coin({
    digit,
    value,
    flipAll,
    animateCoinFlight,
    canAnimate,
    blockAnimation,
}: CoinProps) {
    const [shouldFlip, setShouldFlip] = useState(false);

    useEffect(() => {
        if (flipAll === true) {
            setShouldFlip(false);
        }
    }, [flipAll]);

    const assignValue = () => {
        switch (value) {
            case 'golden':
                return goldenCoin;
            case 'silver':
                return silverCoin;
            case 'bronze':
                return bronzeCoin;
        }
    };

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        if (canAnimate === false) return;

        setShouldFlip((o) => !o);
        const rect = (
            e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        animateCoinFlight(rect.top, rect.left, assignValue());
        blockAnimation();
    }
    return (
        <div
            onClick={handleClick}
            className={cc(
                'group perspective size-18 transition-scale duration-250 ease-in',
                canAnimate && 'hover:scale-160 hover:z-20 not-hover:z-10'
            )}
        >
            <div
                className={cc(
                    'relative w-full h-full transition-transform duration-700 preserve-3d',
                    (shouldFlip || flipAll) ? 'rotate-y-180' : 'rotate-y-360', canAnimate && 'cursor-pointer'
                )}
            >
                {/* Back Face */}
                <div className="absolute inset-0 h-full w-full z-10 backface-hidden rotate-y-180">
                    <img
                        src={assignValue()}
                        alt={`${value} coin`}
                        className="size-18 object-cover object-center rounded-full"
                    />
                </div>
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full backface-hidden flex items-center justify-center font-coins font-black text-shadow-xl bg-cover bg-center bg-no-repeat text-[28px] pb-1 rounded-full"
                    style={{ backgroundImage: `url(${Bg})` }}
                >
                    <span className="text-[28px] text-gradient z-10 backface-hidden">
                        {digit}
                    </span>
                    <span className="absolute text-[28px] digit-text backface-hidden">
                        {digit}
                    </span>
                </div>
            </div>
        </div>
    );
}
