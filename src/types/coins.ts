export interface CoinData {
    digit: number;
    value: CoinType;
}

export type CoinType = 'golden' | 'silver' | 'bronze';
