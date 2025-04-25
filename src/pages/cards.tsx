import { cc } from '@/utils/cc';
import { useState } from 'react';
import background from '@/assets/images/cards/cards-bg.webp';

export default function Cards() {
    const [isAppearing, setIsAppearing] = useState(true);

    return (
        <main
            className={cc(
                'h-202 mx-auto max-w-360 bg-center flex items-center justify-center bg-no-repeat bg-cover pt-18 pl-18 pb-15 pr-23',
                isAppearing ? 'appear' : 'disappear'
            )}
            style={{ backgroundImage: `url(${background})` }}
        >
            {' '}
        </main>
    );
}
