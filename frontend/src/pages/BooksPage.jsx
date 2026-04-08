import { useState, useEffect } from "react";
import api from "../services/api";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ judul: "", penulis: "", tahun: "" });

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      if (res.data.success) {
        setBooks(res.data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil daftar buku", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/books", form);
      if (res.data.success) {
        setForm({ judul: "", penulis: "", tahun: "" });
        fetchBooks();
      }
    } catch (error) {
      console.error("Gagal menambah buku", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      try {
        const res = await api.delete(`/books/${id}`);
        if (res.data.success) {
          fetchBooks();
        }
      } catch (error) {
        console.error("Gagal menghapus buku", error);
      }
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Book Collection Management</h2>

      <div
        className="section-card"
        style={{ "--accent-color": "var(--primary)" }}
      >
        <h3
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "var(--primary)",
          }}
        >
          Add New Book
        </h3>
        <form onSubmit={handleSubmit} className="form-group">
          <input
            className="input-field"
            placeholder="Book Title"
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            required
          />
          <input
            className="input-field"
            placeholder="Author"
            value={form.penulis}
            onChange={(e) => setForm({ ...form, penulis: e.target.value })}
            required
          />
          <input
            className="input-field"
            placeholder="Tahun Terbit"
            type="date"
            value={form.tahun}
            onChange={(e) => setForm({ ...form, tahun: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-primary">
            <span>Add Book</span>
          </button>
        </form>
      </div>

      <div className="table-container shadow-2">
        <table className="m3-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>ID</th>
              <th>Judul</th>
              <th>Penulis</th>
              <th style={{ width: "120px" }}>Tahun</th>
              <th style={{ width: "120px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((b) => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td style={{ fontWeight: "600" }}>{b.judul}</td>
                  <td>{b.penulis}</td>
                  <td>{b.tahun}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="btn btn-error"
                      style={{ padding: "6px 12px", fontSize: "0.75rem" }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    color: "var(--outline)",
                  }}
                >
                  <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                    📭
                  </div>
                  Belum ada data buku yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
