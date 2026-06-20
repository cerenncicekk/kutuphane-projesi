CREATE database LibraryHC;
USE LibraryHc;

CREATE TABLE Kitaplar (
KitapID int auto_increment primary key,
KitapAdi varchar(100) not null,
Yazar varchar (100),
SayfaSayisi int,
YayinYili int
);

create table Uyeler (
UyeId int auto_increment primary key,
AdSoyad varchar(100) not null,
EPosta varchar (100) unique,
KayitTarihi date default (current_date)
);

create table EmanetKitaplar(
EmanetID int auto_increment primary key,
KitapID int,
UyeID int,
AlisTarihi date default (current_date),
TeslimTarihi date,
foreign key (KitapId) references Kitaplar(KitapID),
foreign key (UyeID) references Uyeler(UyeID)
);
