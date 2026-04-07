const bcrypt = require('bcryptjs');
const db = require('./config/db');

async function fixPassword() {
    try {
        // Kita akan membuat password baru yaitu: admin123
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Update password di database
        await db.query('UPDATE users SET password = ? WHERE email = "admin@lib.com"', [hashedPassword]);

        console.log('✅ SUKSES! Password untuk admin@lib.com berhasil direset menjadi: admin123');
        process.exit();
    } catch (error) {
        console.error('❌ Gagal:', error.message);
        process.exit(1);
    }
}

fixPassword();