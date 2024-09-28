import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import AlertState from './context/alert/AlertState';
import About from './components/About';

function App() {
  return (
    <NoteState>
    <AlertState>
    <Router>
    <Navbar />
    <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/signup" element={<SignUp />}/>
        <Route exact path="/about" element={<About />}/>
    </Routes>
    </Router>
    </AlertState>
    </NoteState>
  );
}

export default App;
