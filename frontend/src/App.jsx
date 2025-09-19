import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Navbar from './pages/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
// import BlockchainTransactionMonitoringDashboard from './pages/BlockchainTransactionMonitoringDashboard.jsx';
import './App.css';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/blockchain-monitor" element={<BlockchainTransactionMonitoringDashboard />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
