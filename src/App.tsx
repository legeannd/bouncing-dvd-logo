import { OptionsContextProvider } from "./contexts/OptionsContext";
import { Home } from "./pages/Home";
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <OptionsContextProvider>
      <Home />
      <GlobalStyle />
    </OptionsContextProvider>
  );
}

export default App;
