import { BrowserRouter, Routes, Route } from "react-router-dom";
import WEB_ROUTE_PATHS from "./utils/constants/WebRoute";
import { QueryClientProvider } from "react-query";
import queryClient from "./config/queryClient";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={`${WEB_ROUTE_PATHS.login}`} element={<LoginPage />} />
            <Route path={`${WEB_ROUTE_PATHS.signup}`} element={<SignupPage />} />
            <Route path={`${WEB_ROUTE_PATHS.home}`} element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
