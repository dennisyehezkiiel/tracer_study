import './App.css';
import { Routes, Route } from 'react-router-dom'
import LoginAdmin from './pages/LoginAdmin';
import RegisterAdmin from './pages/RegistraterAdmin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="loginadmin" element={<LoginAdmin />} />
      <Route path="registeradmin" element={<RegisterAdmin />} />
      <Route path="dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
