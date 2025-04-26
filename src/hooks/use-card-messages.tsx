export type CardMessageMap = {
    win: string;
    lose: string;
    entry: string;
};

export function useCardMessages(): CardMessageMap {
    const root = document.getElementById('root');
    const getAttr = (attrName: string): string =>
        root?.getAttribute(attrName) || '';

    return {
        win: getAttr('data-win-message'),
        lose: getAttr('data-lose-message'),
        entry: getAttr('data-entry-message'),
    };
}
