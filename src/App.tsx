import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { HomePage } from "./pages/HomePage";

function App() {

  return (
    <Routes>
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/home'} element={<HomePage />} />
    </Routes>
  )
}

export default App;
