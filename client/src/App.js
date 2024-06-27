/* Import react library */
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            {/* Route to Login Page */}
            <Route path='/' element={<LoginPage />} />
            {/* Route to SignUp Page */}
            <Route path='/signup' element={<SignupPage />} />

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
