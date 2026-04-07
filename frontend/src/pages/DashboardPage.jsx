import { useState, useEffect } from 'react';
import api from '../services/api';

export default function DashboardPage() {
    const [stats, setStats] = useState({ totalBuku: 0, totalUser: 0, peminjamanAktif: 0 });

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get('/dashboard');
                if (res.data.success) {
                    setStats(res.data.data);
                }
            } catch (error) {
                console.error("Gagal mengambil data dashboard", error);
            }
        };
        fetchDashboard();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ padding: '20px', background: '#f4f4f4', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>Total Buku</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalBuku}</p>
                </div>
                <div style={{ padding: '20px', background: '#f4f4f4', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>Total User</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalUser}</p>
                </div>
                <div style={{ padding: '20px', background: '#e3f2fd', border: '1px solid #90caf9', borderRadius: '8px' }}>
                    <h3>Peminjaman Aktif</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.peminjamanAktif}</p>
                </div>
            </div>
        </div>
    );
}