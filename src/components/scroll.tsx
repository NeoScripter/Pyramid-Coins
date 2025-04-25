import Center from '@/assets/images/pyramid/scroll-center.webp';
import Left from '@/assets/images/pyramid/left-scroll.webp';
import Right from '@/assets/images/pyramid/right-scroll.webp';
import { cc } from '@/utils/cc';

type ScrollProps = {
    isOpen: boolean;
    winningText: string;
};
export default function Scroll({ isOpen, winningText }: ScrollProps) {

    return (
        <div className="w-140 h-115 relative">
            <div
                className={cc(
                    'h-full transition-all duration-3000 ease-in-out relative mx-auto flex justify-between overflow-clip',
                    isOpen ? 'w-140' : 'w-57'
                )}
            >
                <img
                    src={Left}
                    alt=""
                    className="shrink-0 h-full object-contain z-10"
                />
                <img
                    src={Right}
                    alt=""
                    className="shrink-0 h-full object-contain z-10"
                />

                <div
                    className={cc(
                        'absolute inset-0 left-1/2 -translate-x-1/2 transition-all duration-3000 ease-in-out bg-center bg-cover bg-no-repeat flex items-center justify-center',
                        isOpen ? 'w-85' : 'w-10'
                    )}
                    style={{ backgroundImage: `url(${Center})` }}
                ></div>
            </div>

            <div
                className={cc(
                    'text-pretty text-center text-2xl flex items-center justify-center absolute top-1/2 left-1/2 -translate-1/2 w-67.5 h-43.5 uppercase transition-opacity duration-2500 ease-in',
                    isOpen ? 'opacity-100 delay-200' : 'opacity-0'
                )}
            >
                {winningText}
            </div>
        </div>
    );
}
