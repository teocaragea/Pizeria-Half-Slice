const express = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pg = require('pg');
const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'theodor',
    password: 'theodor',
    database: 'postgres',
    port: 5432
});

client.connect();








var app = express(); //am creat serverul, obiectul server

//app.set('views', __dirname + '/views/pagini');
app.set("view engine", "ejs");
app.set('trust proxy', true);
console.log("Proiectul se afla la ", __dirname);
app.use("/resurse", express.static(__dirname + "/resurse"));


function verificaImagini() {
    var textFisier = fs.readFileSync("resurse/json/galerie.json");
    var jsi = JSON.parse(textFisier);
    var caleGalerie = jsi.cale_galerie;
    let vectorImagini = [];
    for (let im of jsi.imagini) {
        var imVeche = path.join(caleGalerie, im.cale_relativa);
        var ext = path.extname(im.cale_relativa);
        var numeFisier = path.basename(im.cale_relativa, ext);
        let imNoua = path.join(caleGalerie + "/mic/", numeFisier + "-mic" + ".webp");
        vectorImagini.push({ mare: imVeche, mic: imNoua, descriere: im.descriere, nume: im.nume, timp: im.timp });
        if (!fs.existsSync(imNoua))
            sharp(imVeche)
            .resize(150)
            .toFile(imNoua, function(err) {
                console.log("eroare conversie", imVeche, "->", imNoua, err);
            });
    }
    return vectorImagini;
}

function verificaTimp(img) {
    var today = new Date();
    var time = today.getHours();
    if (time >= 5 && time < 12) {
        if (img.timp == "dimineata") {
            return true;
        }
        return false;
    } else if (time >= 12 && time < 20) {
        if (img.timp == "zi") {
            return true;
        }
        return false;
    } else {
        if (img.timp == "seara") {
            return true;
        }
        return false;
    }
}

let vectorCai = verificaImagini().filter(verificaTimp);
while (vectorCai.length % 3 != 0) {
    vectorCai.pop();
}

app.get("/produse", function(req, res) {
    const rezultat = client.query("select * from pizza", function(err, rez) {
        console.log(err, rez.rows);
        client.query("select unnest(enum_range( null::categ_prod)) as categ", function(err, rezCateg) { //selectez toate valorile posibile din enum-ul categ_prajitura
            res.render("pagini/produse", { produse: rez.rows, categorii: rezCateg.rows }); //obiectul {a:10,b:20} poarta numele locals in ejs  (locals["a"] sau locals.a)
        });
    });
});

app.get("/produs/:id", function(req, res) {
    const rezultat = client.query("select * from pizza where id=" + req.params.id, function(err, rez) {
        console.log(err, rez.rows);
        res.render("pagini/prod", { prod: rez.rows[0] });
    });
});
app.get("/post", function(req, res) {
    const rezultat = client.query("select * from pizza where post=TRUE", function(err, rez) {
        console.log(err, rez.rows);
        res.render("pagini/produse", { produse: rez.rows });
    });
});

app.get("/limitata", function(req, res) {
    const rezultat = client.query("select * from pizza where categorie='editie limitata'", function(err, rez) {
        console.log(err, rez.rows);
        res.render("pagini/produse", { produse: rez.rows });
    });
});





app.get("/index", function(req, res) {
    res.render("pagini/index", { ip: req.ip, imagini: vectorCai });
});

app.get("/", function(req, res) {
    res.render("pagini/index", { ip: req.ip, imagini: vectorCai });
});

app.get("/meniu", function(req, res) {
    let vectorImagini = verificaImagini();
    let offset = Math.floor(Math.random() * 7);
    for (let i = 0; i < offset; i++) {
        vectorImagini.shift();
    }
    while (vectorImagini.length % 3 != 0 || vectorImagini.length > 16) {
        vectorImagini.pop();
    }
    res.render("pagini/meniu", { imagini: vectorCai, galerieAnimata: vectorImagini });
});

app.get("/despre", function(req, res) {
    res.render("pagini/despre");
});

app.get("/galerie.json", function(req, res) {
    res.status(403).render("pagini/403");
});

app.get("/*", function(req, res) {
    res.render("pagini" + req.url, function(err, rezultatRender) {
        if (err) {
            if (err.message.includes("Failed to lookup view")) {
                res.status(404).render("pagini/error");
            } else {
                throw err;
            }
        } else {
            res.send();
        }

    });
});


console.log("altceva");
app.listen(8080);
console.log("Serverul a pornit!");
verificaImagini();