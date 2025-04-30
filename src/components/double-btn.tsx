import doubleBtn from '@/assets/images/cards/double-btn.webp';
import cardBtn from '@/assets/images/cards/card-btn.webp';
import btnClick from '@/assets/sounds/entry/btn-click.wav';
import pageOpen from '@/assets/sounds/entry/page-open.wav';
import btnHover from '@/assets/sounds/entry/btn-hover.wav';

import { playAudio } from '@/utils/play-audio';

type DoubleBtnProps = {
    onClick: () => void;
};
export default function DoubleBtn({ onClick }: DoubleBtnProps) {
    function handleClick() {
        playAudio(btnClick);
        playAudio(pageOpen);
        onClick();
    }
    return (
        <div className="w-72.5 h-64 flex items-center justify-center appear mx-auto">
            <button
                onMouseEnter={() => playAudio(btnHover)}
                onClick={handleClick}
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
