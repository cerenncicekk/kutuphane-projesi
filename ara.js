require('dotenv').config({ path: __dirname + '/.env' });
const mysql = require ('mysql2');
const connection = mysql.createConnection({
    host: process.env.HC_HOST,
    user: process.env.HC_USER,
    password: process.env.HC_PASSWORD,
    database: process.env.HC_NAME
});

connection.connect((err) => {
   if(err) throw err;
   console.log ('Başarılı ! Arama motoru aktif.');
});

//FİLTRE SORGULAMA BURDA BAŞLIYO

const aramaSorgusu = 'SELECT * FROM Kitaplar where SayfaSayisi < ?';

// soru işareti yazdığımız yerine istediğimiz sayfa sayısnıı yazalım.
connection.query (aramaSorgusu, ['300'], (err, sonuclar) => {
    if (err) throw err;
    console.log ('\n ---- 300 Sayfa Altında Olan Kitaplar ----');
    console.table(sonuclar);
    connection.end();
});

