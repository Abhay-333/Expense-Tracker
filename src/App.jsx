import "./App.css";
import Home from "./Custom Components/Home";
import Userform from "./Custom Components/Userform";
import { Route, Routes, Navigate } from "react-router-dom";
import AI from "./Custom Components/AI";
import Budget from "./Custom Components/Budget";
import LandingPage from "./Custom Components/LandingPage";
import MainContent from "./Custom Components/MainContent";
import Account from "./Custom Components/Account";
import Debts from "./Custom Components/Debts";
import Login from "./Custom Components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import News from "./Custom Components/News";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/userform" element={
          <ProtectedRoute>
            <Userform />
          </ProtectedRoute>
        } />
        
        <Route path="/landing-page" element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<MainContent />} />
          <Route path="budget" element={<Budget />} />
          <Route path="account" element={<Account />} />
          <Route path="debts" element={<Debts />} />
          <Route path="ai" element={<AI />} />
          <Route path="news" element={<News />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;





