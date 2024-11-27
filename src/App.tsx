import { Router } from "@/Routes";
import AppProvider from "@/context";

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
