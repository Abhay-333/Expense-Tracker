import "./App.css";
import Home from "./Custom Components/Home";
import Dashboard from "./Custom Components/Dashboard";
import Userform from "./Custom Components/Userform";
import { Route, Routes } from "react-router-dom";
import AI from './Custom Components/AI'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/userform" element={<Userform />}></Route>

        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/ai" element={<AI />}></Route>
      </Routes>
    </>
  );
}

export default App;
