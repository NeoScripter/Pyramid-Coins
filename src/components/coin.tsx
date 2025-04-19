import Bg from '@/assets/images/coin-bg.webp';
import { CoinType } from '@/types/coins';
import goldenCoin from '@/assets/images/golden.webp';
import silverCoin from '@/assets/images/silver.webp';
import bronzeCoin from '@/assets/images/bronze.webp';
import { useState } from 'react';
import { cc } from '@/utils/cc';

type CoinProps = {
    value: CoinType;
    digit: number;
};

export default function Coin({ digit, value }: CoinProps) {
    const [shouldFlip, setShouldFlip] = useState(false);

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
    return (
        <div onClick={() => setShouldFlip(o => !o)} className="group perspective size-18 transition-scale duration-250 ease-in hover:scale-160 hover:z-20 not-hover:z-10">
            <div
                className={cc(
                    'relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer',
                    shouldFlip ? 'rotate-y-180' : 'rotate-y-360'
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
