//const { builtinModules } = require("node:module");

window.onload = function() {
    var rng = document.getElementById("inp-pret");
    rng.parentNode.insertBefore(document.createTextNode(rng.min), rng);
    rng.parentNode.appendChild(document.createTextNode(rng.max));
    let spval = document.createElement("span");
    rng.parentNode.appendChild(spval)
    rng.value = 20;
    spval.innerHTML = " (" + rng.value + ")";
    rng.onchange = function() {
        rng.nextSibling.nextSibling.innerHTML = " (" + this.value + ")";
    }
    let nr_produse = 0;

    let btn = document.getElementById("filtrare");
    btn.onclick = function() {
        inp = document.getElementById("inp-pret");
        let maxPret = inp.value

        let sel = document.getElementById("inp-categorie");
        let categorieSel = sel.value

        let postInput = true;
        if (document.getElementById("nu").checked) {
            postInput = "nu";
        }
        if (document.getElementById("da").checked) {
            postInput = "da";
        }

        let coacereVatra = "vatra";
        let coacereCuptor = "cuptor";
        if (document.getElementById("vatra").checked) {
            coacereCuptor = "";
        }
        if (document.getElementById("cuptor").checked) {
            coacereVatra = "";
        }
        if (document.getElementById("vatra").checked && document.getElementById("cuptor").checked) {
            coacereVatra = "vatra";
            coacereCuptor = "cuptor";
        }

        let ingr = document.getElementById("inp-ingrediente").value;

        var produse = document.getElementsByClassName("produse");

        for (let prod of produse) {
            prod.style.display = "none";

            let post = prod.getElementsByClassName("val-post")[0].innerHTML;
            post = post.trim()
            let conditie1 = (post == postInput || postInput == true);

            let pret = parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
            let conditie2 = pret <= maxPret

            let categorieArt = prod.getElementsByClassName("val-categorie")[0].innerHTML;

            let conditie3 = (categorieArt == categorieSel || categorieSel == "toate");

            let coacere = prod.getElementsByClassName("val-coacere")[0].innerHTML;
            let conditie4 = (coacere == coacereVatra || coacere == coacereCuptor);

            let ingredientePizza = prod.getElementsByClassName("val-ingrediente")[0].innerHTML;
            let conditie5 = true;

            if (ingr != "") {
                conditie5 = (ingredientePizza.search(ingr));
            }
            if (conditie5 == -1) {
                conditie5 = false;
            } else {
                conditite5 = true;
            }

            let conditie6 = true;
            let select = document.getElementById("ingr-nedorite");
            for (var i = 0, l = select.options.length, o; i < l; i++) {
                o = select.options[i];
                if (o.selected == true) {
                    let ingredient = ingredientePizza.search(o.value.toLowerCase());
                    if (ingredient != -1) {
                        conditie6 = false;
                    }
                }
            }
            console.log(conditie6);

            let conditieFinala = conditie1 && conditie2 && conditie3 && conditie4 && conditie5 && conditie6;
            if (conditieFinala) {
                prod.style.display = "flex";
                nr_produse += 1;
            }

        }
        let gasireIngr = document.getElementById("gasire-ingr");
        if (nr_produse == 0) {
            gasireIngr.style.display = "block";
        } else {
            gasireIngr.style.display = "none";
        }
        nr_produse = 0;
    }


    function sortArticole(factor) {

        var produse = document.getElementsByClassName("produse");
        let arrayProduse = Array.from(produse);
        arrayProduse.sort(function(art1, art2) {
            let nume1 = art1.getElementsByClassName("val-nume")[0].innerHTML;
            let nume2 = art2.getElementsByClassName("val-nume")[0].innerHTML;
            let pret1 = art1.getElementsByClassName("val-pret")[0].innerHTML;
            let pret2 = art2.getElementsByClassName("val-pret")[0].innerHTML;
            let rez = factor * nume1.localeCompare(nume2)
            if (rez == 0)
                return factor * (pret1 - pret2)
            return rez;
        });
        console.log(arrayProduse);
        for (let prod of arrayProduse) {
            prod.parentNode.appendChild(prod);
        }
    }

    btn = document.getElementById("sortCrescNume");
    btn.onclick = function() {
        sortArticole(1);
    }
    btn = document.getElementById("sortDescrescNume");
    btn.onclick = function() {
        sortArticole(-1);
    }

    btn = document.getElementById("resetare");
    btn.onclick = function() {

        var produse = document.getElementsByClassName("produse");
        let ingrediente = document.getElementById("inp-ingrediente");
        ingrediente.value = "";

        let pret = document.getElementById("inp-pret");
        pret.value = 20;

        let postDa = document.getElementById("da");
        let postNu = document.getElementById("nu");
        postDa.checked = false;
        postNu.checked = false;

        let coacereVatra = document.getElementById("vatra");
        let coacereCuptor = document.getElementById("cuptor");
        coacereCuptor.checked = false;
        coacereVatra.checked = false;

        let categorie = document.getElementById("inp-categorie");
        categorie.value = "toate";

        for (let prod of produse) {
            prod.style.display = "flex";
        }
    }

    btn = document.getElementById("medie");
    btn.onclick = function() {
        var produse = document.getElementsByClassName("produse");
        let arrayProduse = Array.from(produse);
        let suma = 0;
        let nr = 0;
        arrayProduse.forEach(element => {
            let price = parseInt(element.getElementsByClassName("val-pret")[0].innerHTML);
            suma += price;
            nr++;
        });
        let medie = suma / nr;
        medie = Math.round(medie * 100) / 100;

        let mediaProd = document.getElementById("mediaProd");
        mediaProd.style.display = "block";
        mediaProd.innerHTML = `Media preturilor este: ${medie}`;
        setTimeout(function() {
            mediaProd.style.display = "none";
        }, 2000);
        return;
    }
}