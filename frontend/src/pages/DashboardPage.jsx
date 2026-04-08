import { useState, useEffect } from "react";
import api from "../services/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBuku: 0,
    totalUser: 0,
    peminjamanAktif: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
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
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "24px", fontWeight: "600" }}>
        Dashboard Overview
      </h2>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--primary)" }}
        >
          <h3>Total Books</h3>
          <div className="value">{stats.totalBuku}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--secondary)" }}
        >
          <h3>Total User</h3>
          <div className="value">{stats.totalUser}</div>
        </div>
        <div
          className="stat-card"
          style={{ "--accent-color": "var(--tertiary)" }}
        >
          <h3>Borrowed Books</h3>
          <div className="value">{stats.peminjamanAktif}</div>
        </div>
      </div>
    </div>
  );
}
