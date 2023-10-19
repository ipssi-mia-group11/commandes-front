import {
    createContext,
    useContext,
} from 'react';
import {
    Link,
    Outlet,
} from 'react-router-dom';
import {
    ToastContainer,
} from 'react-toastify';
import cn from 'classnames';
import logo from './logo.svg';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
    return <>
        <ToastContainer position='top-center' />
        <header className={'bg-gray-800 text-white py-4 flex items-center justify-between'}>
            <nav>
                <ul className={'flex mx-12 space-x-8 text-lg font-bold'}>
                    <li>
                        <Link to={'/'}>Accueil</Link>
                    </li>
                    <li>
                        <Link to={'/products'}>Produits</Link>
                    </li>
                </ul>
            </nav>
        </header>

        <main className={'container mx-auto p-4 space-y-4'}>
            <Outlet />
        </main>
        <footer>
        </footer>
    </>;
}

export default App;
