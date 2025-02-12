import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Body from "./components/login/Body";
import Home from "./components/home/Home";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useAuth } from './hooks/useAuth';

const AppContent = () => {
  useAuth(); 
  
  return (
    <Routes>
      <Route path="/login" element={<Body />} />
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
    </Routes>
  );
};

function App() {
  return (
    <RecoilRoot>
      <Router>
        <AppContent />
      </Router>
    </RecoilRoot>
  );
}

export default App;