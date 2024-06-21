/* Import react library */
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            {/* Route to Login Page */}
            <Route path='/' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
