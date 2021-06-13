
create database proiect ENCODING 'UTF-8' LC_COLLATE 'ro-RO-x-icu' LC_CTYPE 'ro_RO' TEMPLATE template0;
CREATE USER theodor WITH ENCRYPTED PASSWORD 'theodor';
GRANT ALL PRIVILEGES ON DATABASE proiect TO theodor;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO theodor;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO theodor;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO theodor;

CREATE TYPE categ_prod AS ENUM( 'comanda speciala', 'aniversara', 'editie limitata', 'pentru copii','comuna');
CREATE TYPE copt AS ENUM('vatra', 'cuptor');
create table if not exists pizza(
 	id serial PRIMARY KEY,
	nume varchar(30) UNIQUE NOT NULL,
	descriere text,
	imagine varchar(300),
	categorie categ_prod DEFAULT 'comuna',
	coacere copt DEFAULT 'vatra',
	pret NUMERIC(8,2) not null,
	gramaj int not null check(gramaj>0),
	introducere TIMESTAMP DEFAULT current_timestamp,
	dimensiune varchar(300),
	ingrediente VARCHAR [],
	post BOOLEAN NOT NULL DEFAULT FALSE
);
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Quattro Formaggi', 'pizza cu 4 tipuri de branza','qf.jpg','comanda speciala','vatra',25.50,480,'2021-01-01','mare','{"mozarela","gorgonzola","cedar","parmezan","sos"}',FALSE);
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Carbonara', 'pizza cu sos carbonara','carbonara.jpg','comanda speciala','vatra',26.50,440,'2021-01-01','mare','{"mozarela","smantana lichida","bacon","sunca"}',FALSE);
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Quattro Capriciosa', 'pizza cu masline','capriciosa.jpg','comuna','cuptor',27.50,580,'2021-01-01','mare','{"masline","ardei","cascaval","sunca"}',FALSE)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Quattro Formaggi Mica', 'pizza cu 4 tipuri de branza','qf.jpg','comanda speciala','vatra',19.50,480,'2021-01-01','mica','{"mozarela","gorgonzola","cedar","parmezan","sos"}',FALSE)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Carbonara Mica', 'pizza cu sos carbonara','carbonara.jpg','comanda speciala','vatra',18.50,280,'2021-01-01','mica','{"mozarela","smantana lichida","bacon","sunca"}',FALSE);
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Quattro Capriciosa', 'pizza cu masline','capriciosa.jpg','comuna','cuptor',27.50,580,'2021-01-01','mare','{"masline","ardei","cascaval","sunca"}',FALSE)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Capriciosa Mica', 'pizza cu masline','capriciosa.jpg','comuna','cuptor',18.50,580,'2021-01-01','mica','{"masline","ardei","cascaval","sunca"}',FALSE)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Vegetariana', 'pizza fara carne','vegetariana.jpg','aniversara','cuptor',20.50,580,'2021-01-01','mare','{"masline","ardei","rosii","oregano"}',True)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Vegetariana Mica', 'pizza fara carne','vegetariana.jpg','aniversara','cuptor',10.50,380,'2021-01-03 15:15:38','mica','{"masline","ardei","rosii","oregano"}',True)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Quattro Stagioni', 'pizza cu ardei si sunca','qs.jpg','editie limitata','cuptor',21.50,580,'2020-01-03 14:15:38','mare','{"masline","ardei","sunca","mozarela","cabanos"}',True)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Taraneasca', 'pizza cu ceapa','taraneasca.jpg','editie limitata','vatra',21.50,560,'2019-01-03 14:15:38','mare','{"masline","ceapa","sunca","mozarela","cabanos"}',False)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Diavola', 'pizza cu salam iute','diavola.jpg','editie limitata','vatra',22.50,560,'2019-06-06 14:15:38','mare','{"salam picant","mozarela"}',False)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Rustica', 'pizza cu de toate','rustica.jpg','pentru copii','vatra',22.20,460,'2016-06-06 17:15:38','mica','{"cabanos","ceapa","mozarela","sunca"}',False)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Margherita', 'pizza simpla','margherita.jpg','pentru copii','vatra',18.20,460,'2016-09-11 17:15:38','mica','{"busuioc","mozarela","sos"}',False)
insert into pizza (nume,descriere,imagine,categorie,coacere,pret,gramaj,introducere,dimensiune,ingrediente,post) values
('Pizza Hawaiana', 'pizza cu ananas','hawaiana.jpg','editie limitata','vatra',24.20,460,'2019-10-10 19:05:58','mica','{"ananas","mozarela","sos","sunca"}',False)











































