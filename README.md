# News Portal (frontend)

Portal berita React yang memakai REST API dari folder `../be`.

## Menjalankan

1. Nyalakan API di `News/be`:

```bash
npm start
```

API default: `http://localhost:3000`

2. Nyalakan frontend:

```bash
npm install
npm run dev
```

Frontend default: `http://localhost:5173`

Permintaan `/api` di-proxy ke backend saat development.

## Endpoint yang dipakai

- `GET /api/news` — daftar berita
- `GET /api/news/:id` — detail berita
