import { useState, useEffect } from 'react';
import api from '../services/api';

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({ judul: '', penulis: '', tahun: '' });

    const fetchBooks = async () => {
        const res = await api.get('/books');
        setBooks(res.data.data);
    };

    useEffect(() => { fetchBooks(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/books', form);
        setForm({ judul: '', penulis: '', tahun: '' });
        fetchBooks();
    };

    const handleDelete = async (id) => {
        await api.delete(`/books/${id}`);
        fetchBooks();
    };

    return (
        <div>
            <h2>Manajemen Buku</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input placeholder="Judul" value={form.judul} onChange={e => setForm({...form, judul: e.target.value})} required />
                <input placeholder="Penulis" value={form.penulis} onChange={e => setForm({...form, penulis: e.target.value})} required />
                <input placeholder="Tahun" type="number" value={form.tahun} onChange={e => setForm({...form, tahun: e.target.value})} required />
                <button type="submit">Tambah Buku</button>
            </form>

            <table border="1" width="100%">
                <thead><tr><th>ID</th><th>Judul</th><th>Penulis</th><th>Tahun</th><th>Aksi</th></tr></thead>
                <tbody>
                    {books.map(b => (
                        <tr key={b.id}>
                            <td>{b.id}</td><td>{b.judul}</td><td>{b.penulis}</td><td>{b.tahun}</td>
                            <td><button onClick={() => handleDelete(b.id)}>Hapus</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}