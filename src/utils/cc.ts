export function cc(...classes: string[]) {
    return classes.filter((c) => typeof c === 'string').join(' ');
}