import { cc } from '@/utils/cc';

export type CoinCopyProps = {
    top: number;
    left: number;
    shouldExpand: boolean;
    image: string;
};

export default function CoinCopy({
    top,
    left,
    shouldExpand,
    image,
}: CoinCopyProps) {
    return (
        <div
            className={cc(
                'fixed size-18 rounded-full z-50 transition-all duration-3000 ease-in-out opacity-0',
                shouldExpand && 'size-62.75 opacity-100'
            )}
            style={{
                top: `${top}px`,
                left: `${left}px`,
            }}
        >
            <img
                src={image}
                alt=""
                className="object-center object-cover w-full h-full rounded-full"
            />
        </div>
    );
}
