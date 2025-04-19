import '@/assets/styles.css';
import '@/assets/fonts/fonts.css';
import background from '@/assets/images/background.webp';
import Scroll from '@/components/scroll';
import { useState } from 'react';
import Coin from '@/components/coin';

function App() {
    const [openScroll, setOpenScroll] = useState(true);

    return (
        <main
            className="h-202 mx-auto max-w-360 bg-center bg-no-repeat bg-cover pt-18 pl-18 pb-15 pr-23"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="flex items-center justify-between h-full">
                <div className='shrink-0 w-160'>
                    <div className='h-18'>
                        <Coin />
                    </div>
                </div>
                <div className='shrink-0'>
                    <Scroll isOpen={openScroll} />
                </div>
            </div>
        </main>
    );
}

export default App;
