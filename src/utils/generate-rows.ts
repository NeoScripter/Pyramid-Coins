import { CoinData, CoinType } from '@/types/coins';

export function generateCoinRows(coins: CoinType[]): CoinData[][] {
    const rows: CoinData[][] = [];
    let currentIndex = 0;
    let rowSize = 1;

    while (currentIndex < coins.length) {
        const endIndex = currentIndex + rowSize;

        const row: CoinData[] = coins
            .slice(currentIndex, endIndex)
            .map((value, i) => ({
                digit: currentIndex + i + 1,
                value,
            }));

        rows.push(row);
        currentIndex = endIndex;
        rowSize++;
    }

    return rows;
}
