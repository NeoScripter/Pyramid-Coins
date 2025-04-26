// cardImages.ts
import img1 from '@/assets/images/cards/2.webp';
import img2 from '@/assets/images/cards/3.webp';
import img3 from '@/assets/images/cards/4.webp';
import img4 from '@/assets/images/cards/5.webp';
import img5 from '@/assets/images/cards/6.webp';
import img6 from '@/assets/images/cards/7.webp';
import img7 from '@/assets/images/cards/8.webp';
import img8 from '@/assets/images/cards/9.webp';
import img9 from '@/assets/images/cards/10.webp';
import img10 from '@/assets/images/cards/jack.webp';
import img11 from '@/assets/images/cards/queen.webp';
import img12 from '@/assets/images/cards/king.webp';
import img13 from '@/assets/images/cards/ace.webp';

const cardImages: Record<number, string> = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
    5: img5,
    6: img6,
    7: img7,
    8: img8,
    9: img9,
    10: img10,
    11: img11,
    12: img12,
    13: img13,
};

export function getCardImage(cardNumber: number): string {
    return cardImages[cardNumber] || '';
}

function getCardsKeys() {
    return Array.from(
        { length: Object.keys(cardImages).length },
        (_, i) => i + 1
    );
}

export function getDisplayCardValue(numbers: number[]): number {
    const slice = numbers.slice(2, -2);
    const randomIdx = Math.floor(Math.random() * slice.length);
    return slice[randomIdx];
}

export function getPlayingCards() {
    const numbers = getCardsKeys();
    const displayCard = getDisplayCardValue(numbers);

    const displayCardIdx = numbers.indexOf(displayCard);

    const smallerCards = generateCardsFromSlice(
        numbers.slice(0, displayCardIdx)
    );
    const largerCards = generateCardsFromSlice(
        numbers.slice(displayCardIdx + 1)
    );

    return {
        playingCards: shuffleArray([...smallerCards, ...largerCards]),
        displayCard: displayCard,
    };
}

function generateCardsFromSlice(slice: number[]): number[] {
    if (slice.length < 2) return [...slice];

    const indices = [...Array(slice.length).keys()];
    const firstIdx = Math.floor(Math.random() * indices.length);
    const first = slice[firstIdx];
    indices.splice(firstIdx, 1);

    const secondIdx = Math.floor(Math.random() * indices.length);
    const second = slice[indices[secondIdx]];

    return [first, second];
}

function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
