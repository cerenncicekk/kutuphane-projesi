require('dotenv').config({ path: __dirname + '/.env' });
//1.az önce indirdiğin MySQl eklentisini koda dahil edicez
const mysql = require ('mysql2');
//2.MySQL veri tabanımıza bağlanmak için gerekli bilgileri gireceğiz
const bağlanti = mysql.createConnection ({
    host: process.env.HC_HOST, // bilgisayardda çalıştığı için localhost
    user: process.env.HC_USER, // XAMPP veya workbencj varsayılan kullanıcı adı
password: process.env.HC_PASSWORD, // eğer şifren yoksa arayı boş bırak
database: process.env.HC_NAME // ilk adımda oluşturduğum veritabanımın ismii
});
//3.Bağlantıyı resmi olarak başlatıyoruz.
bağlanti.connect((hata)=> {
    if (hata) {
        console.error ('Veri tabanına bağlanırken hata oluştu:' + hata.stack);
        return;
    }
    console.log ('Başarılı ! MySQL Veri Tabanına Bağlanıldı.') ;
});
 
//4. Veri tabanına kitapları getirecek SQL sorgumuzu çalıştırıyoruz.
bağlanti.query('SELECT * FROM Kitaplar ', (hata, sonuclar) => {
    if (hata) throw hata;
    console.log ('\n --- KÜTÜPHANEDEKİ KİTAPLARIMIZ---');
    console.table(sonuclar); // sonuçları ekrara çok şık bir tablo olarak basar.
     //işimiz bittiğinde bağlantıyı güvenli bir şekilde kapatıyoruz.
     bağlanti.end();
    
});
