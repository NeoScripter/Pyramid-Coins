import '@/assets/styles.css';
import '@/assets/fonts/fonts.css';
import background from '@/assets/images/background.webp';
import Scroll from '@/components/scroll';
import { useState } from 'react';
import Coin from '@/components/coin';
import Row from '@/components/row';
import { range } from '@/utils/range';
import { generateCoins } from '@/utils/generate-coins';
import { CoinData } from '@/types/coins';

function App() {
    const [openScroll, setOpenScroll] = useState(true);

    const coins = generateCoins();

    const rows: CoinData[][] = [];
    let currentIndex = 0;
    let rowSize = 1;

    while (currentIndex < coins.length) {
        const endIndex = currentIndex + rowSize;
        const row = coins.slice(currentIndex, endIndex).map((value, i) => ({
            digit: currentIndex + i + 1,
            value,
        }));

        rows.push(row);
        currentIndex = endIndex;
        rowSize++;
    }

    return (
        <main
            className="h-202 mx-auto max-w-360 bg-center bg-no-repeat bg-cover pt-18 pl-18 pb-15 pr-23"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="flex items-center justify-between h-full">
                <div className="shrink-0 w-160 space-y-3.5">
                    {rows.map((row, rowIndex) => (
                        <Row key={rowIndex}>
                            {row.map((coinData) => (
                                <Coin key={coinData.digit} digit={coinData.digit} />
                            ))}
                        </Row>
                    ))}
                </div>
                <div className="shrink-0">
                    <Scroll isOpen={openScroll} />
                </div>
            </div>
        </main>
    );
}

export default App;
