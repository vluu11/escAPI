import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThreeScene from './components/ThreeScene';

function App() {
  return (
    <div>
      <Navbar />
      <main className='container pt-5'>
        <Outlet />
        <h1>My Three.js Scene</h1>
        <ThreeScene />
      </main>
    </div>
  );
}

export default App;
