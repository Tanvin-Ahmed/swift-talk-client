import ThemeProvider from "./theme";
import ThemeSettings from "./components/settings";
import Router from "./routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <ThemeSettings>
        <Router />
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
