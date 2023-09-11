import './sass/global.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio';
import Login from './pages/Login/Login';
import MenuPrincipal from './pages/MenuPrincipal/MenuPrincipal';
import ProtectedRoute from './components/ProtectedRoute';
import RegistroReservas from './pages/RegistroReservas/RegistroReservas';
import RegistroHuesped from './pages/RegistroHuesped/RegistroHuesped';
import { ReservaProvider } from './context/ReservaContext';
import Busqueda from './pages/Busqueda/Busqueda';

function App() {
  return (
    <ReservaProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='login' element={<Login />} />
          <Route path='menuPrincipal' element={<ProtectedRoute element={<MenuPrincipal />} />} />
          <Route path='registroReservas' element={<ProtectedRoute element={<RegistroReservas />} />} />
          <Route path='registroHuesped' element={<ProtectedRoute element={<RegistroHuesped />} />} />
          <Route path='busqueda' element={<ProtectedRoute element={<Busqueda />} />} />
        </Routes>
      </Router>
    </ReservaProvider>
  )
}

export default App