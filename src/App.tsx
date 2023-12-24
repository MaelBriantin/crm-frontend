import { Router } from "./routes/Router";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { ToastProvider } from "./contexts/global/ToastContext";

function App() {

  return (
    <AuthProvider>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </AuthProvider>
  )
}

export default App;
