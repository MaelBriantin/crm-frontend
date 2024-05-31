import { Router } from "./routes/Router";
import { ContextProvider } from "./contexts";

function App() {

  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  )
}

export default App;
