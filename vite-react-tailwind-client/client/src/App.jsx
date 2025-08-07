// src/App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import AddSubscription from './pages/AddSubscription';
import ManageSubscriptions from './pages/ManageSubscriptions';
import Navbar from './components/Navbar';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && window.location.pathname !== '/' && window.location.pathname !== '/register') {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-subscription" element={<AddSubscription />} />
        <Route path="/manage-subscriptions" element={<ManageSubscriptions />} />
        <Route path="/manage" element={<ManageSubscriptions />} />
      </Routes>
    </>
  );
}

export default App;
