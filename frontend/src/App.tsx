import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { LandingPage } from './pages/LandingPage';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}



