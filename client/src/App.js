/* Import react library */
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HelloWorld from './scenes/HelloWorld';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            {/* Route to Login Page */}
            <Route path='/' element={<HelloWorld />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
