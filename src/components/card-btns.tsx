import takeBtn from '@/assets/images/cards/take-btn.webp';
import doubleBtn from '@/assets/images/cards/double-btn.webp';
import cardBtn from '@/assets/images/cards/card-btn.webp';

type CardBtnsProps = {
    isOpen: boolean;
    handleReset: () => void;
    handleDouble: () => void;
};
export default function CardBtns({ isOpen, handleReset, handleDouble }: CardBtnsProps) {
    if (isOpen === false) return null;

    return (
        <div className="w-full appear">
            <button
                onClick={handleReset}
                className="w-full mb-4 h-24 flex items-center justify-center bg-no-repeat bg-contain cursor-pointer transition-scale duration-300 ease-in-out hover:scale-110"
                style={{ backgroundImage: `url(${cardBtn})` }}
            >
                <img
                    src={takeBtn}
                    alt="Забрать"
                    className="h-6 object-contain"
                />
            </button>

            <button
                onClick={handleDouble}
                className="w-full h-24 flex items-center justify-center bg-no-repeat bg-contain cursor-pointer transition-scale duration-300 ease-in-out hover:scale-110"
                style={{ backgroundImage: `url(${cardBtn})` }}
            >
                <img
                    src={doubleBtn}
                    alt="Забрать"
                    className="h-7 object-contain"
                />
            </button>
        </div>
    );
}
