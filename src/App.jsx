import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Body from "./components/login/Body";
import Home from "./components/home/Home";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useAuth } from './hooks/useAuth';
import EmployeeDetails from "./components/home/employeeDetail/EmployeeDetail";
import EditEmployee from "./components/home/employeeDetail/edit/EditEmployee";

const AppContent = () => {
  useAuth(); 
  
  return (
    <Routes>
      <Route path="/login" element={<Body />} />
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/employee/:id" element={<PrivateRoute element={<EmployeeDetails />} />} />
      <Route path="/employee/edit/:id" element={<PrivateRoute element={<EditEmployee />} />} />
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