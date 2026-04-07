import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BooksPage from './pages/BooksPage';
import LoansPage from './pages/LoansPage';
import Navbar from './components/Navbar';
import UsersPage from './pages/UsersPage';

const ProtectedRoute = ({ children }) => {
    return localStorage.getItem('token') ? <><Navbar />{children}</> : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/books" element={<ProtectedRoute><BooksPage /></ProtectedRoute>} />
                <Route path="/loans" element={<ProtectedRoute><LoansPage /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;