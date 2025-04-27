import background from '@/assets/images/pyramid/background.webp';
import Scroll from '@/components/scroll';
import { useMemo, useRef, useState } from 'react';
import Coin from '@/components/coin';
import Row from '@/components/row';
import { generateCoins } from '@/utils/generate-coins';
import { generateCoinRows } from '@/utils/generate-rows';
import CoinCopy, { CoinCopyProps } from '@/components/coin-copy';
import { useCoinPrizes } from '@/hooks/use-coin-prices';
import { getRandomItem } from '@/utils/get-random-item';
import { cc } from '@/utils/cc';

type PyramidProps = {
    resetGame: () => void;
};

/* const DISAPPEARING_TIME = 1000 * 60 * 2; */
const DISAPPEARING_TIME = 10000;

export default function Pyramid({ resetGame }: PyramidProps) {
    const [openScroll, setOpenScroll] = useState(false);
    const [flipAll, setFlipAll] = useState(false);
    const [canAnimate, setCanAnimate] = useState(true);
    const selectedCoinRef = useRef<HTMLDivElement>(null);
    const selectedImageRef = useRef<HTMLImageElement>(null);
    const [animatedCoinPosition, setAnimatedCoinPosition] =
        useState<CoinCopyProps | null>(null);
    const [resetCount, setResetCount] = useState(0);
    const [winningCoin, setWinningCoin] = useState<
        'bronze' | 'golden' | 'silver' | null
    >();
    const { golden, silver, bronze } = useCoinPrizes();
    const [isAppearing, setIsAppearing] = useState(true);

    function reset() {
        setOpenScroll(false);
        setFlipAll(false);
        setAnimatedCoinPosition(null);
        resetGame();

        setTimeout(() => {
            setResetCount((prev) => prev + 1);
            setCanAnimate(true);
            setImage('');
        }, 500);
    }

    function setImage(imageSrc: string) {
        const imageElement = selectedImageRef?.current;
        if (!imageElement) return;

        imageElement.src = imageSrc;
    }

    const rows = useMemo(() => {
        const coins = generateCoins();
        return generateCoinRows(coins);
    }, [resetCount]);

    const prize = useMemo(() => {
        switch (winningCoin) {
            case 'golden':
                return getRandomItem(golden);
            case 'silver':
                return getRandomItem(silver);
            case 'bronze':
                return getRandomItem(bronze);
        }
    }, [winningCoin]);

    function animateCoinFlight(
        startTop: number,
        startLeft: number,
        image: string
    ) {
        setAnimatedCoinPosition({
            top: startTop,
            left: startLeft,
            image,
            shouldExpand: false,
        });

        setTimeout(() => {
            const target = selectedCoinRef?.current;
            if (!target) return;

            const { top, left } = target.getBoundingClientRect();

            setAnimatedCoinPosition({
                top,
                left,
                image,
                shouldExpand: true,
            });
        }, 500);

        setTimeout(() => {
            setFlipAll(true);
            setOpenScroll(true);

            setImage(image);
            setAnimatedCoinPosition(null);
        }, 3500);

        setTimeout(() => {
            setIsAppearing(false);
        }, DISAPPEARING_TIME - 500);
        setTimeout(() => {
            reset();
        }, DISAPPEARING_TIME);
    }

    return (
        <main
            className={cc(
                'h-202 mx-auto max-w-360 bg-center bg-no-repeat bg-cover pt-18 pl-18 pb-15 pr-23',
                isAppearing ? 'appear' : 'disappear'
            )}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="flex items-center justify-between h-full">
                <div className="shrink-0 w-160 space-y-3.5">
                    {rows.map((row, rowIndex) => (
                        <Row key={rowIndex}>
                            {row.map((coinData) => (
                                <Coin
                                    key={coinData.digit}
                                    digit={coinData.digit}
                                    value={coinData.value}
                                    flipAll={flipAll}
                                    animateCoinFlight={animateCoinFlight}
                                    canAnimate={canAnimate}
                                    blockAnimation={() => setCanAnimate(false)}
                                    assignCoin={() =>
                                        setWinningCoin(coinData.value)
                                    }
                                />
                            ))}
                        </Row>
                    ))}
                </div>
                <div className="shrink-0">
                    <div>
                        <div
                            ref={selectedCoinRef}
                            className="size-62.75 relative top-4 mx-auto aspect-square rounded-full"
                        >
                            <img
                                ref={selectedImageRef}
                                src=""
                                alt=""
                                className="w-full h-full object-center object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <Scroll isOpen={openScroll} winningText={prize || ''} />
                </div>
            </div>

            {animatedCoinPosition != null && (
                <CoinCopy {...animatedCoinPosition} />
            )}
        </main>
    );
}
