import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page status-box">
      <h1>Halaman tidak ditemukan</h1>
      <p>Alamat yang Anda buka tidak tersedia.</p>
      <p className="back-row">
        <Link to="/">Kembali ke beranda</Link>
      </p>
    </div>
  );
}
