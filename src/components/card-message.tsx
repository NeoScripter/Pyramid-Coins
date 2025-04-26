import background from '@/assets/images/cards/frame.webp';

type CardMessageProps = {
    message: string;
};
export default function CardMessage({ message }: CardMessageProps) {
    return (
        <div
            className="bg-no-repeat bg-contain h-full w-138.5 flex items-center justify-center text-yellow-primary text-4xl uppercase text-balance"
            style={{ backgroundImage: `url(${background})` }}
        >
            <span className="w-2/3 text-center">{message}</span>
        </div>
    );
}
