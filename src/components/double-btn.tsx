import doubleBtn from '@/assets/images/cards/double-btn.webp';
import cardBtn from '@/assets/images/cards/card-btn.webp';

type DoubleBtnProps = {
    onClick: () => void;
};
export default function DoubleBtn({ onClick }: DoubleBtnProps) {
    return (
        <div className="w-72.5 h-64 flex items-center justify-center appear mx-auto">
            <button
                onClick={onClick}
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
