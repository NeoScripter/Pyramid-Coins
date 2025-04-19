import '@/assets/styles.css';
import '@/assets/fonts/fonts.css';
import background from '@/assets/images/background.webp';
import Scroll from '@/components/scroll';
import { useState } from 'react';
import Coin from '@/components/coin';
import Row from '@/components/row';
import { generateCoins } from '@/utils/generate-coins';
import { generateCoinRows } from '@/utils/generate-rows';

function App() {
    const [openScroll, setOpenScroll] = useState(true);

    const coins = generateCoins();
    const rows = generateCoinRows(coins);

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
                                <Coin
                                    key={coinData.digit}
                                    digit={coinData.digit}
                                    value={coinData.value}
                                />
                            ))}
                        </Row>
                    ))}
                </div>
                <div className="shrink-0">
                    <div>
                        <div className="size-62.75 relative top-16 mx-auto aspect-square rounded-full bg-white"></div>
                    </div>
                    <Scroll isOpen={openScroll} />
                </div>
            </div>
        </main>
    );
}

export default App;
