import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'
import Home from './Components/Home'
import Dashboard from './Components/Dashboard'
import CaseRegistration from './Components/Dashboard_Component/CaseRegistration'
import Peoples from './Components/Peoples'

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/caseregistration" element={<CaseRegistration />} />
          <Route path="/peoples" element={<Peoples />} />
      </Routes>
    </Router>
);
}

export default App;
