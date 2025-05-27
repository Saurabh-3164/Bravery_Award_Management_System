import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import RegisterNominee from '../pages/RegisterNominee';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLogin from '../pages/Admin_login';
import Winners from '../components/WinnersList';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterNominee />} />
        <Route path='/AdminDashboard' element={<AdminDashboard/>} />
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        <Route path ='/winners' element={<Winners/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
