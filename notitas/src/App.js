import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login.js';
import Register from './components/Register.js';
import {AuthProvider} from './context/authContext.js'
import { Notes } from './components/Notes.js';


function App() {
  return (
    <Router>
      <div className="app">
        <AuthProvider>
          <Routes>
            <Route path="/notes" element={<Notes />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
