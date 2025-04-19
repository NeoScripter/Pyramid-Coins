import '@/assets/styles.css';
import '@/assets/fonts/fonts.css';
import background from '@/assets/images/background.webp';
import Scroll from '@/components/scroll';

function App() {
    return <main className="h-202 mx-auto max-w-360 bg-center bg-no-repeat bg-cover pt-18 pl-18 pb-15 pr-23" style={{backgroundImage: `url(${background})`}}>
        <div className='flex items-end justify-center h-full'>
            <Scroll />
        </div>
    </main>;
}

export default App;
