import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import './styles/global.css';

export default function App({ isDarkMode, setIsDarkMode }) {
  return (
    <Router>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <AppRoutes />
    </Router>
  );
}