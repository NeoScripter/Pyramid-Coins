export type CoinPrizeMap = {
    golden: string[];
    silver: string[];
    bronze: string[];
};

export function useCoinPrizes(): CoinPrizeMap {
    const root = document.getElementById('root');
    const getAttr = (key: keyof CoinPrizeMap): string[] => {
        try {
            return JSON.parse(root?.getAttribute(`data-${key}`) || '[]');
        } catch {
            return [];
        }
    };

    return {
        golden: getAttr('golden'),
        silver: getAttr('silver'),
        bronze: getAttr('bronze'),
    };
}
