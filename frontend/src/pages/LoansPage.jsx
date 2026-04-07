import { useState, useEffect } from 'react';
import api from '../services/api';

export default function LoansPage() {
    const [loans, setLoans] = useState([]);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({ user_id: '', book_id: '', tanggal_pinjam: '' });

    const fetchData = async () => {
        const resLoans = await api.get('/loans');
        setLoans(resLoans.data.data);

        const resUsers = await api.get('/users');
        setUsers(resUsers.data.data);

        const resBooks = await api.get('/books');
        setBooks(resBooks.data.data);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/loans', form);
            setForm({ user_id: '', book_id: '', tanggal_pinjam: '' });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Gagal meminjam buku');
        }
    };

    const handleReturn = async (id) => {
        const today = new Date().toISOString().split('T')[0];
        await api.put(`/loans/${id}`, { tanggal_kembali: today, status: 'dikembalikan' });
        fetchData();
    };

    return (
        <div>
            <h2>Manajemen Peminjaman</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <select value={form.user_id} onChange={e => setForm({ ...form, user_id: e.target.value })} required>
                    <option value="">-- Pilih User --</option>
                    {users.map(u => <option key={u.id} value={u.id}>{u.nama}</option>)}
                </select>
                <select value={form.book_id} onChange={e => setForm({ ...form, book_id: e.target.value })} required>
                    <option value="">-- Pilih Buku --</option>
                    {books.map(b => <option key={b.id} value={b.id}>{b.judul}</option>)}
                </select>
                <input type="date" value={form.tanggal_pinjam} onChange={e => setForm({ ...form, tanggal_pinjam: e.target.value })} required />
                <button type="submit">Pinjamkan Buku</button>
            </form>

            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>ID</th><th>Peminjam</th><th>Buku</th><th>Tgl Pinjam</th><th>Tgl Kembali</th><th>Status</th><th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map(l => (
                        <tr key={l.id}>
                            <td>{l.id}</td><td>{l.user_nama}</td><td>{l.book_judul}</td>
                            <td>{l.tanggal_pinjam.substring(0, 10)}</td>
                            <td>{l.tanggal_kembali ? l.tanggal_kembali.substring(0, 10) : '-'}</td>
                            <td>{l.status}</td>
                            <td>
                                {l.status === 'dipinjam' && (
                                    <button onClick={() => handleReturn(l.id)}>Set Dikembalikan</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}