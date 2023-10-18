import {
    Link,
    Outlet,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
    return <>
        <header>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/users'}>Users</Link>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
        </footer>
    </>;
}

export default App;
