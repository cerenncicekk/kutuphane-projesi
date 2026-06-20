require('dotenv').config({ path: __dirname + '/.env' });
const mysql = require ('mysql2');
const bağlanti = mysql.createConnection ({
    host: process.env.HC_HOST,
    user: process.env.HC_USER,
    password: process.env.HC_PASSWORD,
    database: process.env.HC_NAME,
});
bağlanti.connect ((err) => {
if (err) {
    console.error ('Bağlantı Hatası: ' + err.stack);
    return;
}
console.log ('Başarılı! MySQL Veri Tabanına Bağlanıldı.');
});

//yeniş adım : veri tabanına kitap ekleme (insert)
// eklemek istediğimiz yeni kitabın bilgilerini bir nesne (object) olarak hazırlıyoruz.
const yeniKitap = {
    KitapAdi: 'Sefiller',
    Yazar: 'Victor Hugo',
    SayfaSayisi : 177,
    YayinYili:  1862 
};
//SQL sorgumuzu yazıyoruz. Soru işaretleri (?) güvenlik için (SQL Injection engellemek adına) kullanılır.
const eklemeSorgusu= 'insert into Kitaplar (KitapAdi, Yazar, SayfaSayisi, YayinYili) values (?, ?, ?, ?)';
bağlanti.query(eklemeSorgusu,[yeniKitap.KitapAdi, yeniKitap.Yazar, yeniKitap.SayfaSayisi, yeniKitap.YayinYili], (err, sonuc) => {
    if(err) throw err;
    console.log ('\n Harika! Veri tabanına yeni bir kitap eklendi ID: $ {sonuc.insertId}');
    //Kitap başarıyla eklendikten sonra güncel listeyi görmek için tekrar SELECT çekiyoruz.
    bağlanti.query('SELECT * FROM Kitaplar', (err, guncelKitaplar) => {
        if(err) throw err;
        console.log('\n--- GÜNCEL KÜTÜPHANE LİSTEMİZ---');
    console.table(guncelKitaplar);
// her şey bittiğinde bağlantıyı kapatıyoryz
bağlanti.end();
    });
}
);
