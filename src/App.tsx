import { Router } from "./routes/Router";
import { AuthProvider } from "./contexts/auth/AuthContext";

function App() {

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App;
