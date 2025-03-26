import "./App.css";
import Home from "./Custom Components/Home";
import Dashboard from "./Custom Components/Dashboard";
import Userform from "./Custom Components/Userform";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/userform" element={<Userform />}></Route>

        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
