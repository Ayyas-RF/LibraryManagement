import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
            <Link to="/" style={{ marginRight: '10px' }}>Dashboard</Link>
            <Link to="/books" style={{ marginRight: '10px' }}>Buku</Link>
            <Link to="/loans" style={{ marginRight: '10px' }}>Peminjaman</Link>
            <Link to="/users" style={{ marginRight: '10px' }}>Users</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}