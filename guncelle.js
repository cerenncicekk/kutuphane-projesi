require('dotenv').config({ path: __dirname + '/.env' });
const mysql = require ('mysql2');
const connection = mysql.createConnection ({
    host: process.env.HC_HOST,
    user: process.env.HC_USER,
    password: process.env.HC_PASSWORD,
    database: process.env.HC_NAME
});
connection.connect((err) => {
    if (err) {
        console.error ('Bağlantı Hatası: ' + err.stack);
        return;
    }
    console.log('Başarılı! MySql Veri tabanına bağğlanıldı.');
});
 //YENİ KOMUT: VERİ GÜNCELLEME (UPDATE)---
 const guncellemeSorgusu = 'UPDATE Kitaplar SET KitapID = ? where KitapID = ?'
// sorguya sırasıyla: yeni kitap ID'sini (177) ve hangi kitabın değişeceğini (10) gönderiyoruz.
connection.query(guncellemeSorgusu, [177, 10], (err, sonuc) => {
    if (err) throw err;
    console.log ('\n Kumarbaz Kitabının sayfa sayısı başarıyla güncellendi!');

// güncellenmiş halini anında görmek için tabloyu tekrar çekiyoruz.
connection.query ('SELECT * FROM Kitaplar', (err, guncelKitaplar ) => {
    if(err) throw err;
console.log('\n --- GÜNCEL KÜTÜPHANE LİSTEMİZ---');
console.table(guncelKitaplar);
connection.end();
});
}); 
