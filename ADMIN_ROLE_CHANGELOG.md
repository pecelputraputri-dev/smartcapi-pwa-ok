Perubahan: Tambah role 'admin' dan endpoint admin CRUD

- Menambahkan field `role` pada model User (enum: user, enumerator, admin).
- Menambahkan middleware isAdmin untuk otorisasi admin.
- Menambahkan route /admin/users untuk create/update/delete/list akun (termasuk enumerator).
- Menambahkan route /admin/interviews untuk CRUD data hasil interview.
- Menyediakan skrip seed scripts/create_admin.js untuk membuat akun admin default.

Admin default:
- username: superadmin
- password: admincapi

CATATAN KEAMANAN:
- Ganti password admin default segera setelah deployment.
- Jangan commit password plaintext ke repo; gunakan variabel lingkungan (ADMIN_PASSWORD/ADMIN_USERNAME/ADMIN_EMAIL) bila memungkinkan.
