import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Dashboard</Link>
                <Link to="/books" className={`nav-link ${isActive('/books') ? 'active' : ''}`}>Buku</Link>
                <Link to="/loans" className={`nav-link ${isActive('/loans') ? 'active' : ''}`}>Peminjaman</Link>
                <Link to="/users" className={`nav-link ${isActive('/users') ? 'active' : ''}`}>Users</Link>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
}