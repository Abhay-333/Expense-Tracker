import "./App.css";
import Home from "./Custom Components/Home";
import Userform from "./Custom Components/Userform";
import { Route, Routes } from "react-router-dom";
import AI from "./Custom Components/AI";
import Budget from "./Custom Components/Budget";
import LandingPage from "./Custom Components/LandingPage";
import MainContent from "./Custom Components/MainContent";
import Account from "./Custom Components/Account";
import Debts from "./Custom Components/Debts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/userform" element={<Userform />}></Route>
        
        <Route path="/landing-page" element={<LandingPage />}>
          <Route path="dashboard" element={<MainContent />}></Route>
          <Route path="budget" element={<Budget />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="debts" element={<Debts />}></Route>
          <Route path="ai" element={<AI />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

