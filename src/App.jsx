import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/login";
import Signup from "./page/signup";
import Dashboard from "./page/DashBoard";
import FolderPage from "./page/FolderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/folder/:id" element={<FolderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
