import { CoinType } from "@/types/coins";

const GOLDEN_COUNT = 1;
const SILVER_COUNT = 3;
const TOTAL_COINS = 36;
const BRONZE_COUNT = TOTAL_COINS - GOLDEN_COUNT - SILVER_COUNT;

export function generateCoins(): CoinType[] {
    const coins: CoinType[] = [
        ...Array(GOLDEN_COUNT).fill('golden'),
        ...Array(SILVER_COUNT).fill('silver'),
        ...Array(BRONZE_COUNT).fill('bronze'),
    ];

    for (let i = coins.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [coins[i], coins[j]] = [coins[j], coins[i]];
    }

    return coins;
}
