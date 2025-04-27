import background from '@/assets/images/entry/entry-bg.webp';
import leftBtn from '@/assets/images/entry/entry-btn-1.webp';
import rightBtn from '@/assets/images/entry/entry-btn-2.webp';
import leftBtnTitle from '@/assets/images/entry/btn-1-title.webp';
import rightBtnTitle from '@/assets/images/entry/btn-2-title.webp';
import { cc } from '@/utils/cc';

type EntryProps = {
    handleRefClick: () => void;
    handleNoRefClick: () => void;
    showTransition: () => void;
};
export default function Entry({
    handleNoRefClick,
    handleRefClick,
    showTransition,
}: EntryProps) {
    function handleRef() {
        showTransition();
        setTimeout(() => handleRefClick(), 1500);
    }

    function handleNoRef() {
        showTransition();
        setTimeout(() => handleNoRefClick(), 1500);
    }

    return (
        <main
            className={cc(
                'h-202 mx-auto max-w-360 bg-center flex items-center justify-center bg-no-repeat bg-cover pt-18 pl-18 pb-15 pr-23'
            )}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="flex items-center justify-between w-300">
                <button
                    onClick={handleRef}
                    className="w-118 h-42.25 flex items-center justify-center bg-no-repeat bg-contain cursor-pointer transition-scale duration-300 ease-in-out hover:scale-110"
                    style={{ backgroundImage: `url(${leftBtn})` }}
                >
                    <img
                        src={leftBtnTitle}
                        alt="реферал"
                        className="h-13 object-contain mt-8"
                    />
                </button>
                <button
                    onClick={handleNoRef}
                    className="w-118 h-42.25 flex items-center justify-center bg-no-repeat bg-contain cursor-pointer transition-scale duration-300 ease-in-out hover:scale-110"
                    style={{ backgroundImage: `url(${rightBtn})` }}
                >
                    <img
                        src={rightBtnTitle}
                        alt="Не реферал"
                        className="h-13 object-contain mt-8"
                    />
                </button>
            </div>
        </main>
    );
}
