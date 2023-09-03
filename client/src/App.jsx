import './sass/global.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio';
import Login from './pages/Login/Login';
import MenuPrincipal from './pages/MenuPrincipal/MenuPrincipal';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='login' element={<Login />} />
          <Route path='menuPrincipal' element={<ProtectedRoute element={<MenuPrincipal />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
