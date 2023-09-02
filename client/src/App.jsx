import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/global.scss';
import Inicio from './pages/Inicio/Inicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicio />} />
      </Routes>
    </Router>
  )
}

export default App
