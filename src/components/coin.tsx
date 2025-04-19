import Bg from '@/assets/images/coin-bg.webp';

export default function Coin() {
    const digit = 23;

    return (
        <div
            className="w-18 relative font-coins leading-normal flex items-center justify-center font-black text-shadow-xl aspect-square bg-cover bg-center bg-no-repeat pb-1"
            style={{ backgroundImage: `url(${Bg})` }}
        >
            <span className="text-[28px] text-gradient z-10">{digit}</span>
            <span className="absolute text-[28px] digit-text">{digit}</span>
        </div>
    );
}
