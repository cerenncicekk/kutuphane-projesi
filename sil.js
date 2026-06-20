require('dotenv').config({ path: __dirname + '/.env' });
const mysql = require ('mysql2');
const connection = mysql.createConnection ({
    host: process.env.HC_HOST,
    user: process.env.HC_USER,
    password: process.env.HC_PASSWORD,
    database: process.env.HC_NAME
});
connection.connect((err) => {
    if (err) throw err;
    console.log ('Silme Sistemi Hazır!');
});

// DELETE SORGUMUZ BURDA DEVREYE GİRİYOR
const silmeSorgusu = 'delete from kitaplar where KitapID = ?';
connection.query(silmeSorgusu, [3], (err, sonuc) =>{
    if (err) throw err;
    console.log ('\n İstediğiniz kitap kütüphanenizden başarılıyla silindi!');
    //Sildikten sonra tekrar kütüphaneyi görelim
    connection.query ('SELECT* from Kitaplar', (err, guncelKitaplar) => {
        if (err) throw err;
        console.log ('\n --- KÜTÜPHANE SON DURUMU ---');
        console.table(guncelKitaplar);
        connection.end();
    });

});
// bu kısımda istediğimiz kitabın ID'sini yazdık ve sildik.