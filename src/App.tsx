import { Router } from "./routes/Router";
import { GlobalContextProvider } from "./contexts/GlobalContextProvider";

function App() {

  return (
    <GlobalContextProvider>
      <Router />
    </GlobalContextProvider>
  )
}

export default App;
