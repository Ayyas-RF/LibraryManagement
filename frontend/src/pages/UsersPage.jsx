import { useState, useEffect } from 'react';
import api from '../services/api';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ nama: '', email: '', password: '' });

    const fetchUsers = async () => {
        const res = await api.get('/users');
        setUsers(res.data.data);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/users', form);
        setForm({ nama: '', email: '', password: '' });
        fetchUsers();
    };

    const handleDelete = async (id) => {
        await api.delete(`/users/${id}`);
        fetchUsers();
    };

    return (
        <div>
            <h2>Manajemen User</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input placeholder="Nama" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} required />
                <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button type="submit">Tambah User</button>
            </form>

            <table border="1" width="100%">
                <thead><tr><th>ID</th><th>Nama</th><th>Email</th><th>Aksi</th></tr></thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td><td>{u.nama}</td><td>{u.email}</td>
                            <td><button onClick={() => handleDelete(u.id)}>Hapus</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}