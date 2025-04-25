export function getRandomItem<T>(array: T[]): T | undefined {
    if (!array.length) return undefined;
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}
