import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home page </h1>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/tasks" element={<h1>Registrado Con exito </h1>} />
        <Route path="/add-task" element={<h1>About </h1>} />
        <Route path="/task/:id" element={<h1>Contact </h1>} />
        <Route path="/profile" element={<h1>Contact </h1>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;